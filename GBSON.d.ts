
export type GBSON = {
	meta: {
		format: {
			name: "GBSON",
			version: string,
			url: "https://github.com/lehwark/GBSON/blob/master/GBSON.d.ts"
		},
		circular: boolean,
		locus: string,
		length: number,
		datetime: string, // ISO_8601 
		references?: Reference[],
		definition?: string,
		accession?: string,
		version?: string,
		keywords?: string,
		source?: string,
		organism?: string,
		dblink?: string
	},
	features: Feature[],
	origin: string
}


export type Reference = {
	title: string,
	index?: number,
	range?: Range,
	journal?: string,
	pubmed?: string,
	remark?: string,
	consrtm?: string,
	authors?: string
}

export type Range = [number, number] | { complement: Range } | { join: Range[] };

export type Feature = {
	id: string,
	type: FeatureType,
	range: Range,
	gene?: string,
	translation?: string,
	features?: Feature[],
	acronym?: string,
	allele?: string,
	altitude?: string,
	anticodon?: string,
	authority?: string,
	bio_material?: string,
	biotype?: string,
	breed?: string,
	cell_line?: string,
	cell_type?: string,
	chromosome?: string,
	citation?: string,
	clone?: string,
	clone_lib?: string,
	codon_recognized?: string,
	codon_start?: string,
	collected_by?: string,
	collection_date?: string,
	common?: string,
	country?: string,
	cultivar?: string,
	culture_collection?: string,
	db_xref?: string,
	dev_stage?: string,
	direction?: string,
	ec_number?: string,
	ecotype?: string,
	estimated_length?: string,
	exception?: string,
	experiment?: string,
	function?: string,
	gap_type?: string,
	gene_synonym?: string,
	genotype?: string,
	group?: string,
	haplogroup?: string,
	haplotype?: string,
	host?: string,
	host$?: string,
	identified_by?: string,
	inference?: string,
	isolate?: string,
	isolation_source?: string,
	lab_host?: string,
	lat_lon?: string,
	linkage_evidence?: string,
	locus_tag?: string,
	map?: string,
	mating_type?: string,
	mobile_element_type?: string,
	mol_type?: string,
	ncrna_class?: string,
	no_qualifier?: string,
	nomenclature?: string,
	not_allowed?: string,
	note?: string,
	number?: string,
	operon?: string,
	organelle?: string,
	organism?: string,
	pcr_primers?: string,
	plastid?: string,
	pop_variant?: string,
	product?: string,
	protein_id?: string,
	pseudo?: string,
	pseudogene?: string,
	regulatory_class?: string,
	replace?: string,
	ribosomal_slippage?: string,
	rpt_family?: string,
	rpt_type?: string,
	rpt_unit_range?: string,
	rpt_unit_seq?: string,
	satellite?: string,
	specimen_voucher?: string,
	standard_name?: string,
	strain?: string,
	sub_species?: string,
	sub_strain?: string,
	synonym?: string,
	tag_peptide?: string,
	tissue_lib?: string,
	tissue_type?: string,
	trans_splicing?: string,
	transcript_id?: string,
	transl_except?: string,
	transl_table?: string,
	translationinput?: string,
	variety?: string
}

export type FeatureType = "3'utr" | "5'utr" | "assembly_gap" | "cds" | "conflict" | "d-loop" | "exon" | "gap" | "gene"
	| "intron" | "misc_difference" | "misc_feature" | "misc_rna" | "misc_structure" | "mobile_element" | "mrna"
	| "ncrna" | "no_feature" | "non_sense" | "operon" | "orna" | "prim_transcript" | "regulatory" | "rep_origin"
	| "repeat_region" | "rrna" | "stem_loop" | "sts" | "telomere" | "tmrna" | "trna" | "variation";


