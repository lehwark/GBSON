
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
	features?: Feature[],
	allele?: string,
	altitude?: string,
	anticodon?: string,
	artificial_location?: string,
	bio_material?: string,
	bound_moiety?: string,
	cell_line?: string,
	cell_type?: string,
	chromosome?: string,
	citation?: string,
	clone?: string,
	clone_lib?: string,
	codon_start?: string,
	collected_by?: string,
	collection_date?: string,
	compare?: string,
	country?: string,
	cultivar?: string,
	culture_collection?: string,
	db_xref?: string,
	dev_stage?: string,
	direction?: string,
	EC_number?: string,
	ecotype?: string,
	estimated_length?: string,
	evidence?: string,
	exception?: string,
	experiment?: string,
	frequency?: string,
	function?: string,
	gap_type?: string,
	gene_synonym?: string,
	haplogroup?: string,
	haplotype?: string,
	host?: string,
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
	metagenome_source?: string,
	mobile_element_type?: string,
	mod_base?: string,
	mol_type?: string,
	ncRNA_class?: string,
	note?: string,
	number?: string,
	old_locus_tag?: string,
	operon?: string,
	organelle?: string,
	organism?: string,
	PCR_conditions?: string,
	PCR_primers?: string,
	phenotype?: string,
	plasmid?: string,
	pop_variant?: string,
	product?: string,
	protein_id?: string,
	pseudogene?: string,
	recombination_class?: string,
	regulatory_class?: string,
	replace?: string,
	rpt_family?: string,
	rpt_type?: string,
	rpt_unit_range?: string,
	rpt_unit_seq?: string,
	satellite?: string,
	segment?: string,
	serotype?: string,
	serovar?: string,
	sex?: string,
	specimen_voucher?: string,
	standard_name?: string,
	strain?: string,
	sub_clone?: string,
	sub_species?: string,
	sub_strain?: string,
	submitter_seqid?: string,
	tag_peptide?: string,
	tissue_lib?: string,
	tissue_type?: string,
	transl_except?: string,
	transl_table?: string,
	translation?: string,
	type_material?: string,
	variety?: string
}

export type FeatureType = "assembly_gap" | "C_region" | "CDS" | "centromere" | "D-loop" | "D_segment" | "exon" | "gap" | "gene" | 
	"iDNA" | "intron" | "J_segment" | "mat_peptide" | "misc_binding" | "misc_difference" | "misc_feature" | "misc_recomb" | "misc_RNA" | "misc_structure" | 
	"mobile_element" | "modified_base" | "mRNA" | "ncRNA" | "N_region" | "old_sequence" | "operon" | "oriT" | "polyA_site" | "precursor_RNA" | 
	"prim_transcript" | "primer_bind" | "propeptide" | "protein_bind" | "regulatory" | "repeat_region" | "rep_origin" | "rRNA" | "S_region" | "sig_peptide" | 
	"source" | "stem_loop" | "STS" | "telomere" | "tmRNA" | "transit_peptide" | "tRNA" | "unsure" | "V_region" | "V_segment" | 
	"variation" | "3'UTR" | "5'UTR" ;