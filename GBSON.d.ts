
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
		source: SourceDefinition,
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

export type Range = [number, number] | { complement: Range } | { joined: Range[] };

export interface SourceDefinition {
	range: Range,
	organism: string,
	mol_type: MolType,
	bio_material?: string,
	cell_line?: string,
	cell_type?: string,
	chromosome?: string,
	citation?: string,
	clone?: string,
	clone_lib?: string,
	collected_by?: string,
	collection_date?: string,
	country?: string,
	cultivar?: string,
	culture_collection?: string,
	db_xref?: string,
	dev_stage?: string,
	ecotype?: string,
	environmental_sample?: string,
	focus?: string,
	germline?: string,
	haplogroup?: string,
	haplotype?: string,
	host?: string,
	identified_by?: string,
	isolate?: string,
	isolation_source?: string,
	lab_host?: string,
	lat_lon?: string,
	macronuclear?: string,
	map?: string,
	mating_type?: string,
	metagenome_source?: string,
	note?: string,
	organelle?: string,
	PCR_primers?: string,
	plasmid?: string,
	pop_variant?: string,
	proviral?: string,
	rearranged?: string,
	segment?: string,
	serotype?: string,
	serovar?: string,
	sex?: string,
	specimen_voucher?: string,
	strain?: string,
	sub_clone?: string,
	submitter_seqid?: string,
	sub_species?: string,
	sub_strain?: string,
	tissue_lib?: string,
	tissue_type?: string,
	transgenic?: string,
	type_material?: string,
	variety?: string
}

export type MolType = "genomic DNA" | "genomic RNA" | "mRNA" | "tRNA" | "rRNA" | "other RNA" | "other DNA" | "transcribed RNA" | "viral cRNA" | "unassigned DNA" | "unassigned RNA";


// features and qualifiers according to http://www.insdc.org/documents/feature_table.html#7.2
export type Feature = Feature_assemblygap | Feature_Cregion | Feature_CDS | Feature_centromere
	| Feature_Dloop | Feature_Dsegment | Feature_exon | Feature_gap | Feature_gene | Feature_iDNA
	| Feature_intron | Feature_Jsegment | Feature_matpeptide | Feature_miscbinding | Feature_miscdifference
	| Feature_miscfeature | Feature_miscrecomb | Feature_miscRNA | Feature_miscstructure | Feature_mobileelement
	| Feature_modifiedbase | Feature_mRNA | Feature_ncRNA | Feature_Nregion | Feature_oldsequence
	| Feature_operon | Feature_oriT | Feature_polyAsite | Feature_precursorRNA | Feature_primtranscript
	| Feature_primerbind | Feature_propeptide | Feature_proteinbind | Feature_regulatory
	| Feature_repeatregion | Feature_reporigin | Feature_rRNA | Feature_Sregion | Feature_sigpeptide | Feature_source
	| Feature_stemloop | Feature_STS | Feature_telomere | Feature_tmRNA | Feature_transitpeptide
	| Feature_tRNA | Feature_unsure | Feature_Vregion | Feature_Vsegment | Feature_variation | Feature_3UTR
	| Feature_5UTR;

export interface BaseFeature {
	id: string,
	type: string,
	range: Range,
	features?: Feature[],
}

export interface Feature_assemblygap extends BaseFeature {
	type: "assembly_gap",
	estimated_length?: string,
	gap_type?: string,
	linkage_evidence?: string
}

export interface Feature_Cregion extends BaseFeature {
	type: "C_region",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_CDS extends BaseFeature {
	type: "CDS",
	allele?: string,
	artificial_location?: string,
	citation?: string,
	codon_start?: string,
	db_xref?: string,
	EC_number?: string,
	exception?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	number?: string,
	old_locus_tag?: string,
	operon?: string,
	product?: string,
	protein_id?: string,
	pseudogene?: string,
	standard_name?: string,
	transl_except?: string,
	transl_table?: string,
	translation?: string
}

export interface Feature_centromere extends BaseFeature {
	type: "centromere",
	citation?: string,
	db_xref?: string,
	experiment?: string,
	inference?: string,
	note?: string,
	standard_name?: string
}

export interface Feature_Dloop extends BaseFeature {
	type: "D-loop",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string
}

export interface Feature_Dsegment extends BaseFeature {
	type: "D_segment",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_exon extends BaseFeature {
	type: "exon",
	allele?: string,
	citation?: string,
	db_xref?: string,
	EC_number?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	number?: string,
	old_locus_tag?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_gap extends BaseFeature {
	type: "gap",
	estimated_length?: string,
	experiment?: string,
	inference?: string,
	map?: string,
	note?: string
}

export interface Feature_gene extends BaseFeature {
	type: "gene",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	operon?: string,
	phenotype?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_iDNA extends BaseFeature {
	type: "iDNA",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	number?: string,
	old_locus_tag?: string,
	standard_name?: string
}

export interface Feature_intron extends BaseFeature {
	type: "intron",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	number?: string,
	old_locus_tag?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_Jsegment extends BaseFeature {
	type: "J_segment",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_matpeptide extends BaseFeature {
	type: "mat_peptide",
	allele?: string,
	citation?: string,
	db_xref?: string,
	EC_number?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_miscbinding extends BaseFeature {
	type: "misc_binding",
	allele?: string,
	bound_moiety?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	regulatory_class?: string
}

export interface Feature_miscdifference extends BaseFeature {
	type: "misc_difference",
	allele?: string,
	citation?: string,
	clone?: string,
	compare?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	phenotype?: string,
	replace?: string,
	standard_name?: string
}

export interface Feature_miscfeature extends BaseFeature {
	type: "misc_feature",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	number?: string,
	old_locus_tag?: string,
	phenotype?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_miscrecomb extends BaseFeature {
	type: "misc_recomb",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	recombination_class?: string,
	standard_name?: string
}

export interface Feature_miscRNA extends BaseFeature {
	type: "misc_RNA",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	operon?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_miscstructure extends BaseFeature {
	type: "misc_structure",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	standard_name?: string
}

export interface Feature_mobileelement extends BaseFeature {
	type: "mobile_element",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	mobile_element_type?: string,
	note?: string,
	old_locus_tag?: string,
	rpt_family?: string,
	rpt_type?: string,
	standard_name?: string
}

export interface Feature_modifiedbase extends BaseFeature {
	type: "modified_base",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	frequency?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	mod_base?: string,
	note?: string,
	old_locus_tag?: string
}

export interface Feature_mRNA extends BaseFeature {
	type: "mRNA",
	allele?: string,
	artificial_location?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	operon?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_ncRNA extends BaseFeature {
	type: "ncRNA",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	ncRNA_class?: string,
	note?: string,
	old_locus_tag?: string,
	operon?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_Nregion extends BaseFeature {
	type: "N_region",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_oldsequence extends BaseFeature {
	type: "old_sequence",
	allele?: string,
	citation?: string,
	compare?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	replace?: string
}

export interface Feature_operon extends BaseFeature {
	type: "operon",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	inference?: string,
	map?: string,
	note?: string,
	operon?: string,
	phenotype?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_oriT extends BaseFeature {
	type: "oriT",
	allele?: string,
	bound_moiety?: string,
	citation?: string,
	db_xref?: string,
	direction?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	rpt_family?: string,
	rpt_type?: string,
	rpt_unit_range?: string,
	rpt_unit_seq?: string,
	standard_name?: string
}

export interface Feature_polyAsite extends BaseFeature {
	type: "polyA_site",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string
}

export interface Feature_precursorRNA extends BaseFeature {
	type: "precursor_RNA",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	operon?: string,
	product?: string,
	standard_name?: string
}

export interface Feature_primtranscript extends BaseFeature {
	type: "prim_transcript",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	operon?: string,
	standard_name?: string
}

export interface Feature_primerbind extends BaseFeature {
	type: "primer_bind",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	PCR_conditions?: string,
	standard_name?: string
}

export interface Feature_propeptide extends BaseFeature {
	type: "propeptide",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_proteinbind extends BaseFeature {
	type: "protein_bind",
	allele?: string,
	bound_moiety?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	operon?: string,
	regulatory_class?: string,
	standard_name?: string
}

export interface Feature_regulatory extends BaseFeature {
	type: "regulatory",
	allele?: string,
	bound_moiety?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	operon?: string,
	phenotype?: string,
	pseudogene?: string,
	regulatory_class?: string,
	standard_name?: string
}

export interface Feature_repeatregion extends BaseFeature {
	type: "repeat_region",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	rpt_family?: string,
	rpt_type?: string,
	rpt_unit_range?: string,
	rpt_unit_seq?: string,
	satellite?: string,
	standard_name?: string
}

export interface Feature_reporigin extends BaseFeature {
	type: "rep_origin",
	allele?: string,
	citation?: string,
	db_xref?: string,
	direction?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	standard_name?: string
}

export interface Feature_rRNA extends BaseFeature {
	type: "rRNA",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	operon?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_Sregion extends BaseFeature {
	type: "S_region",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_sigpeptide extends BaseFeature {
	type: "sig_peptide",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_source extends BaseFeature {
	type: "source",
	altitude?: string,
	bio_material?: string,
	cell_line?: string,
	cell_type?: string,
	chromosome?: string,
	citation?: string,
	clone?: string,
	clone_lib?: string,
	collected_by?: string,
	collection_date?: string,
	country?: string,
	cultivar?: string,
	culture_collection?: string,
	db_xref?: string,
	dev_stage?: string,
	ecotype?: string,
	haplogroup?: string,
	haplotype?: string,
	host?: string,
	identified_by?: string,
	isolate?: string,
	isolation_source?: string,
	lab_host?: string,
	lat_lon?: string,
	map?: string,
	mating_type?: string,
	metagenome_source?: string,
	mol_type?: MolType,
	note?: string,
	organelle?: string,
	organism?: string,
	PCR_primers?: string,
	plasmid?: string,
	pop_variant?: string,
	segment?: string,
	serotype?: string,
	serovar?: string,
	sex?: string,
	specimen_voucher?: string,
	strain?: string,
	sub_clone?: string,
	sub_species?: string,
	sub_strain?: string,
	submitter_seqid?: string,
	tissue_lib?: string,
	tissue_type?: string,
	type_material?: string,
	variety?: string
}

export interface Feature_stemloop extends BaseFeature {
	type: "stem_loop",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	operon?: string,
	standard_name?: string
}

export interface Feature_STS extends BaseFeature {
	type: "STS",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	standard_name?: string
}

export interface Feature_telomere extends BaseFeature {
	type: "telomere",
	citation?: string,
	db_xref?: string,
	experiment?: string,
	inference?: string,
	note?: string,
	rpt_type?: string,
	rpt_unit_range?: string,
	rpt_unit_seq?: string,
	standard_name?: string
}

export interface Feature_tmRNA extends BaseFeature {
	type: "tmRNA",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string,
	tag_peptide?: string
}

export interface Feature_transitpeptide extends BaseFeature {
	type: "transit_peptide",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_tRNA extends BaseFeature {
	type: "tRNA",
	allele?: string,
	anticodon?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	operon?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_unsure extends BaseFeature {
	type: "unsure",
	allele?: string,
	citation?: string,
	compare?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	replace?: string
}

export interface Feature_Vregion extends BaseFeature {
	type: "V_region",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_Vsegment extends BaseFeature {
	type: "V_segment",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	product?: string,
	pseudogene?: string,
	standard_name?: string
}

export interface Feature_variation extends BaseFeature {
	type: "variation",
	allele?: string,
	citation?: string,
	compare?: string,
	db_xref?: string,
	experiment?: string,
	frequency?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	phenotype?: string,
	product?: string,
	replace?: string,
	standard_name?: string
}

export interface Feature_3UTR extends BaseFeature {
	type: "3'UTR",
	allele?: string,
	citation?: string,
	db_xref?: string,
	experiment?: string,
	function?: string,
	gene?: string,
	gene_synonym?: string,
	inference?: string,
	locus_tag?: string,
	map?: string,
	note?: string,
	old_locus_tag?: string,
	standard_name?: string
}

export interface Feature_5UTR extends BaseFeature {
	type: "5'UTR",
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
	gene?: string,
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
	mol_type?: MolType,
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
