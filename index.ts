import { Range, GBSON, Reference, Feature, SourceDefinition } from "./GBSON";


class Params {

	public cmd: string;
	public params: { [key: string]: string | number | boolean }

	constructor(cmd?: string) {
		this.cmd = (typeof cmd !== "undefined") ? cmd : null;
		this.params = {}
	}

	hasKey(key: string) {
		return this.params && (typeof this.params[key] !== "undefined");
	}

	set(key: string, val: string) {
		this.params[key] = val;
	}

	getString(key: string): string | null {
		return this.hasKey(key) ? this.params[key] as string : null;
	}

	getCommand(): string {
		return this.cmd;
	}
}

export interface OpenStruct { [key: string]: string | number | boolean | string[] | number[] | OpenStruct[] | OpenStruct };

export function loadGenBank(_gb: string): GBSON | null {
	let gbsonresult = getEmptyGBSON();
	const gb = preLoadGenBank(_gb);
	if (!gb)
		return null;

	// ObjectMapper mapper = new ObjectMapper();
	// const result = {};

	gbsonresult.meta.format = {
		name: "GBSON",
		version: "1.0.6",
		url: "https://github.com/lehwark/GBSON/blob/master/GBSON.d.ts"
	};
	gbsonresult.meta.circular = gb.isCircular;
	gbsonresult.meta.locus = gb.locus;
	gbsonresult.meta.length = gb.seq.length;
	gbsonresult.meta.datetime = new Date().toISOString();
	const references = parseReferences(gb.head);
	if (references != null)
		gbsonresult.meta.references = references;

	const allheadkev = parseAllHeadKV(gb.head);
	const ignored_headkeys = "locus,reference,authors,title,journal,pubmed,remark,consrtm".split(",");

	// for (let hkey in allheadkev) {
	for (let [hkey, hval] of Object.entries(allheadkev)) {

		// const hval = allheadkev[hkey];
		if (!ignored_headkeys.includes(hkey))
			gbsonresult.meta[hkey as ("definition" | "accession" | "version" | "keywords" | "organism" | "dblink")] = hval;
	}

	const allowedFeatureKeys = ("acronym,allele,altitude,anticodon,authority,bio_material,biotype,breed,cell_line,cell_type,chromosome,citation,clone,clone_lib,codon_recognized,codon_start,collected_by,"
		+ "collection_date,common,country,cultivar,culture_collection,db_xref,dev_stage,direction,ec_number,ecotype,estimated_length,exception,experiment,function,gap_type,gene,gene_synonym,genotype,"
		+ "group,haplogroup,haplotype,host,host$,identified_by,inference,info,isolate,isolation_source,lab_host,lat_lon,linkage_evidence,locus_tag,map,mating_type,mobile_element_type,mol_type,ncrna_class,"
		+ "no_qualifier,nomenclature,not_allowed,note,number,operon,organelle,organism,pcr_primers,plastid,pop_variant,product,protein_id,pseudo,pseudogene,regulatory_class,replace,"
		+ "ribosomal_slippage,rpt_family,rpt_type,rpt_unit_range,rpt_unit_seq,satellite,specimen_voucher,standard_name,strain,sub_species,sub_strain,synonym,tag_peptide,tissue_lib,tissue_type,trans_splicing,"
		+ "transcript_id,transl_except,transl_table,translation,translationinput,translation_input,type,variety,annotator,translation_input").split(",");


	// let sourcefeat: { [key: string]: string } = null;
	let sourcefeat: { [key: string]: string } = null;

	const v_features: OpenStruct[] = [];

	// gb.snips;

	for (let [snipkey, p] of Object.entries(gb.snips)) {

		// if (!p.getCommand().toLowerCase().trim().equals("source")) {
		// const feature:{ [key: string]: string } = {};
		const feature: { [key: string]: string } = {};
		const id = "i" + snipkey;
		const parentid: string = null;//p.getString("_gff_parent");

		feature.id = id;


		feature.parent = parentid;
		feature.type = p.getCommand().trim();
		feature.range = JSON.parse(rangeToJSONString(p.getString("range")));
		for (let key in p.params) {
			key = key.toLowerCase().trim();
			if (allowedFeatureKeys.includes(key))
				feature[key] = p.params[key] as "string" | "number" | "boolean";
		}

		if (feature.type === "source") {
			sourcefeat = feature;
		} else
			v_features.push(feature);

	}

	if (sourcefeat != null) {
		delete sourcefeat.id;
		delete sourcefeat.parent;
		delete sourcefeat.type;
		gbsonresult.meta.source = sourcefeat as unknown as SourceDefinition;
	}

	let b = true;
	const features: OpenStruct[] = [];
	const usedIDs: string[] = [];

	while (b && v_features.length > 0) {
		b = false;
		for (const feature of v_features)
			if (!usedIDs.includes(feature.id as string)) {
				if (!feature.parent) {
					usedIDs.push(feature.id as string);
					b = true;
					features.push(feature);
					delete feature.parent;
				} else
					for (const pfeat of features) {
						if (pfeat.id === feature.parent) {
							if (!pfeat.features)
								pfeat.features = [];
							const subfeatures = pfeat.features;
							(subfeatures as OpenStruct[]).push(feature);
							usedIDs.push(feature.id as string);
							delete feature.parent;
							b = true;
							break;
						}
					}
			}
	}
	gbsonresult.features = features as unknown as Feature[];
	gbsonresult.origin = gb.seq;
	// const result:GBSON={
	// 	meta,features,origin
	// };
	// result.meta= meta;
	// result.put("features", features);
	// result.put("origin", gin.seq);
	// String jsonText = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(result);// out.toString();

	// return jsonText;




	return gbsonresult;
}


function rangeToJSONString(range: string): string {
	range = range.replace(new RegExp(">", "g"), "").replace(new RegExp("<", "g"), "").replace(new RegExp("\\^", "g"), "..").replace(new RegExp("\n", "g"), "")
		.replace(new RegExp("\r", "g"), "").replace(new RegExp(" ", "g"), "");

	// if (range.matches("-?\\d+"))
	if (/-?\\d+/.test(range)) {
		return "[" + range + "," + range + "]";
	}

	range = range.replace(new RegExp("complement\\(([0-9]+)\\.\\.([0-9]+)\\)", "g"), "{complement[$1,$2]}");
	range = range.replace(new RegExp("([0-9]+)\\.\\.([0-9]+)", "g"), "[$1,$2]");
	range = range.replace(new RegExp("order", "g"), "join");
	const stack: boolean[] = [];
	for (let n = 0; n < range.length; n++) {
		if (range.charAt(n) === '(') {
			if (n >= 4 && range.substring(n - 4, n) === "join") {
				range = range.substring(0, n) + '[' + range.substring(n + 1);
				stack.push(true);
			} else {
				stack.push(false);

			}
		} else if (range.charAt(n) === ')') {
			const b = stack.pop();
			if (b) {
				range = range.substring(0, n) + ']' + range.substring(n + 1);
			}
		}
	}
	let result = range.replace(new RegExp("join", "g"), "\"joined\":");
	result = result.replace(new RegExp("complement", "g"), "\"complement\":");
	result = result.replace(new RegExp("\\(", "g"), "{");
	result = result.replace(new RegExp("\\)", "g"), "}");
	if ((result.indexOf("joined") !== -1 || result.indexOf("complement") !== -1) && !result.startsWith("{"))
		result = "{" + result + "}";
	return result;
}

function parseAllHeadKV(head: string): { [key: string]: string } {
	const result: { [key: string]: string } = {};
	let currentkey: string = null;
	let currentvalue = "";
	for (const line of head.split("\n"))
		if (line.length > 12) {
			if (!line.startsWith("            ")) {
				if (currentkey != null && currentvalue.trim().length > 0)
					result[removeLineBReaksAndRedundantWhiteSpace(currentkey).toLowerCase()] =
						removeLineBReaksAndRedundantWhiteSpace(currentvalue);
				currentkey = line.substring(0, 12);
				currentvalue = "";
			}
			currentvalue += line.substring(12) + " ";
		}
	return result;
}

function parseReferences(head: string): Reference[] {
	const result: Reference[] = [];
	let lastidx = 0;
	const refs = parseAll(head, "EFERENCE (.*?)(?:$|\\n\\S)");
	if (refs.length == 0)
		return null;
	for (const ref of refs) {
		const ref_kv: Reference = {
			title: ""
		};
		const title = removeLineBReaksAndRedundantWhiteSpace(parseOne(ref, "TITLE (.*?)(?:$|\\n\\s\\s\\S)"));
		if (title != null && title.length > 0) {
			ref_kv.title = title;

			let str_idx = parseOne(ref, "\\s+([0-9]+)\\s+");
			let idx = str_idx != null ? parseInt(str_idx) : lastidx + 1;
			lastidx = idx;
			ref_kv.index = idx;

			const str_range = parseOne(ref, "\\(bases ([0-9]+ to [0-9]+)\\)");
			if (str_range != null) {
				const tmp = str_range.split(" to ");
				ref_kv.range = [parseInt(tmp[0]), parseInt(tmp[1])];
			}
			const authors = removeLineBReaksAndRedundantWhiteSpace(parseOne(ref, "AUTHORS (.*?)(?:$|\\n\\s\\s\\S)"));
			if (authors != null && authors.length > 0)
				ref_kv.authors = authors;

			let journal = removeLineBReaksAndRedundantWhiteSpace(parseOne(ref, "JOURNAL (.*?)(?:$|\\n\\s\\s\\S)"));
			if (journal != null && journal.length > 0) {
				const idx2 = journal.indexOf("PUBMED");
				if (idx2 != -1)
					journal = journal.substring(0, idx2 - 1).trim();
				ref_kv.journal = journal;
			}
			const pubmed = removeLineBReaksAndRedundantWhiteSpace(parseOne(ref, "PUBMED (.*?)(?:$|\\n\\s\\s\\S)"));
			if (pubmed != null && pubmed.length > 0)
				ref_kv.pubmed = pubmed;

			const remark = removeLineBReaksAndRedundantWhiteSpace(parseOne(ref, "REMARK (.*?)(?:$|\\n\\s\\s\\S)"));
			if (remark != null && remark.length > 0)
				ref_kv.remark = remark;

			const consrtm = removeLineBReaksAndRedundantWhiteSpace(parseOne(ref, "CONSRTM (.*?)(?:$|\\n\\s\\s\\S)"));
			if (consrtm != null && consrtm.length > 0)
				ref_kv.consrtm = consrtm;
			result.push(ref_kv);
		}
	}
	return result;
}


function preLoadGenBank(gb: string): {
	head: string,
	snips: { [key: number]: Params },
	seq: string,
	isCircular: boolean,
	locus: string
} {
	const snips: { [key: number]: Params } = {};

	gb = gb.replace(/\r/g, "\n").replace(/\n\s*\n/g, '\n');

	let _maxid = 1;
	const head = parseOne(gb, "(.*?)\nFEATURES     ");
	const version = parseOne(head, "VERSION     (.*?)\n");
	let trivialname = parseOneNoDotall(head, "SOURCE.*?\\((.*?)\\)\n");
	if (trivialname == null || trivialname.indexOf("\n") !== -1)
		trivialname = "";
	let mid = parseOneSensitive(gb, "\nFEATURES(.*?)\nORIGIN     ");

	if (mid === null)
		mid = parseOneSensitive(gb, "\nFEATURES(.*?)\nORIGIN");
	if (mid !== null)
		mid += "\n                     ";
	const _seq = parseOneSensitive(gb, "\nORIGIN(.*?)$");
	let b = "";

	let p = new Params();

	const lines = mid.split("\n");
	for (let n = 0; n < lines.length; n++) {
		let line = lines[n];
		line = line.replace(new RegExp("     /", "g"), "     ///");
		if (line.startsWith("          ") && n < lines.length - 1) {
			b = b + line.trim() + "\n";
		} else {
			const x = b.split("///");
			const j = x.length;
			for (let i = 0; i < j; i++) {
				const tmp = x[i];
				const idx = tmp.indexOf("=");
				if (idx > 0) {
					let key = tmp.substring(0, idx).trim();
					let val = tmp.substring(idx + 1).trim();
					if ((val.startsWith("\"")) && (val.endsWith("\"")))
						val = val.substring(1, val.length - 1).trim();
					key = key.replace(new RegExp("\n", "g"), "").trim();
					val = val.replace(new RegExp("\n", "g"), key !== "translation" ? " " : "").trim();
					while (p.hasKey(key))
						key += "$";
					p.set(key, val);
				} else {
					let key = tmp.trim();// q[0].trim();
					if (key.length > 0) {
						let val = "";
						key = key.replace(new RegExp("\n", "g"), "").trim();
						val = val.replace(new RegExp("\n", "g"), key !== "translation" ? " " : "").trim();
						while (p.hasKey(key))
							key += "$";
						p.set(key, val);
					}
				}
			}

			if (p.getCommand() != null) {
				if (p.getString("range") != null && p.getString("range").indexOf(":") == -1)
					snips[_maxid++] = p;
			}
			b = "";

			const cmd = parseOne(line, "^     (.*?) ");
			if (cmd != null) {
				while (line.trim().endsWith(",")) {
					line = line + lines[(++n)].replace(new RegExp("\n", "g"), "");
				}
				const range = line.substring(20).trim();
				p = new Params(cmd.trim());
				p.set("range", range);
			} else if (!line.startsWith("BASE COUNT")) {
				console.error("could not parse cmd from genbank line '" + line + "'");
			}
		}
	}
	const seq = _seq.replace(new RegExp("[0|1|2|3|4|5|6|7|8|9| |/|\n|\r]", "g"), "").trim();

	let isCircular = false;
	if (head != null) {
		const locus = parseOne(head, "LOCUS(.*?)\n");
		if (locus != null && parseOne(locus, ".*? (circular) .*?") != null)
			isCircular = true;
	}
	let locus = null;
	if (head != null)
		locus = parseOne(head, "LOCUS       (.*?) ");

	return { head, snips, seq, isCircular, locus };
}

function parseOneSensitive(text: string, pattern: string): string | null {
	if (text == null || pattern == null)
		return null;
	try {
		const reg = new RegExp(pattern, 's');
		const regResult = text.match(reg);
		if (regResult && regResult.length > 1)
			return regResult[1];
	} catch (e) { console.error(e); }
	return null;
}


function parseOneNoDotall(text: string, pattern: string): string | null {
	if (text == null || pattern == null)
		return null;
	try {
		const reg = new RegExp(pattern, 'i');
		const regResult = text.match(reg);
		if (regResult && regResult.length > 1)
			return regResult[1];
	} catch (e) { console.error(e); }
	return null;
}

function parseAll(text: string, pattern: string): string[] {
	const result: string[] = [];
	if (text == null || pattern == null)
		return result;
	try {
		const reg = new RegExp(pattern, 'sig');
		var matches = [];
		while ((matches = reg.exec(text)) != null) {
			result.push(matches[1]);
		}
	} catch (e) { console.error(e); }
	return result;
}

function parseOne(text: string, pattern: string): string | null {
	if (text == null || pattern == null)
		return null;
	try {
		const reg = new RegExp(pattern, 'si');
		const regResult = text.match(reg);
		if (regResult && regResult.length > 1)
			return regResult[1];
	} catch (e) { console.error(e); }
	return null;
}

function removeLineBReaksAndRedundantWhiteSpace(s: string) {
	return s == null ? null : s.replace(new RegExp("\r\n", "g"), " ").replace(new RegExp("\n", "g"), " ").replace(new RegExp("\r", "g"), " ").replace(new RegExp("\\s+", "g"), " ").trim();
}


function getEmptyGBSON(): GBSON {
	return {
		meta: {
			format: {
				name: "GBSON",
				version: "1.0.7",
				url: "https://github.com/lehwark/GBSON/blob/master/GBSON.d.ts"
			},
			circular: false,
			locus: "",
			length: 0,
			datetime: "", // ISO_8601 
			source: {
				range: [0, 0],
				organism: "",
				mol_type: "genomic DNA",
			}
		},
		features: [],
		origin: ""
	};
}
