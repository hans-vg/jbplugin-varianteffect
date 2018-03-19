# Variant Effect Plugin
Parses the ANN field from a VCF file that has been ran through Ensembl's [VEP tool](https://www.ensembl.org/vep) or another tool [SNPEff](http://snpeff.sourceforge.net/). This plugin will format the ANN field to a human readable field in the Primary Data popup info window and will color code Variants based on mutation type. Green - Synonymous, Purple - NonSynonymous, Red - Truncation/Stop gained, or Blue - Intron/other


## Install

For JBrowse 1.11.6+ in the _JBrowse/plugins_ folder, type:  
``git clone https://github.com/hans-vg/jbplugin-varianteffect.git VariantEffectPlugin``


## Activate
Add this to _jbrowse.conf_ under `[GENERAL]`:

[ plugins.VariantEffectPlugin ]
location = plugins/VariantEffectPlugin

Then, in your track configuration, use the following example block:

[ tracks.MyTrack ]
storeClass     = JBrowse/Store/SeqFeature/VCFTabix
type = VariantEffectPlugin/View/Track/CanvasEffectVariants
urlTemplate    = vcf_files/mysample.vcf.gz
tbiUrlTemplate = vcf_files/mysample.vcf.gz.tbi
maxHeight = 1000
category = Varietal SNPs 
key  = MyTrackName

                
## Usage

Place holder. Need a demo image
![demo image](img/demo_image.png)
