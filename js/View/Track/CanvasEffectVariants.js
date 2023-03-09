define([
        'dojo/_base/declare',
        'dojo/promise/all',
        'JBrowse/Util',
        'JBrowse/View/Track/CanvasVariants',
        'VariantEffectPlugin/View/Track/_VariantDetailMixin'
    ],

    function(
        declare,
        all,
        Util,
        CanvasVariants,
        VariantDetailsMixin
    ) {
        var variantColorCoding = function(feature) {
            /* console.log(feature); */
            var value = feature.get('ANN')||feature.get('CSQ');
            if (typeof value !== 'undefined') {
                var data = value.values;
                for (var i = 0, len = data.length; i < len; i++) {
                    counter = i + 1;
                    /* console.log(value[i]); */
                    var dataSplit = data[i].split("|");
                    var eff_type = dataSplit[1];
                    if (eff_type === "stop_gained") {
                        return '#FF0000';
                    } else if (eff_type.indexOf("splice_donor_variant") !== -1) {
                        return '#FF0000';
                    } else if (eff_type.indexOf("splice_acceptor_variant") !== -1) {
                        return '#FF0000';
                    } else if (eff_type.indexOf("frameshift_variant") !== -1) {
                        return '#FF0000';
                    } else if (eff_type === "missense_variant") {
                        if (dataSplit.length > 16){ // default CSQ tag from VEP
                            // "Allele|Consequence|IMPACT|SYMBOL|Gene|Feature_type|Feature|BIOTYPE|EXON|INTRON|HGVSc|HGVSp|cDNA_position|CDS_position|Protein_position|Amino_acids|Codons|Existing_variation|DISTANCE|STRAND|FLAGS|SYMBOL_SOURCE|HGNC_ID|SIFT"
                            // ;CSQ=T|missense_variant|MODERATE||TraesCS1A02G001800|Transcript|TraesCS1A02G001800.1|protein_coding|1/2||||192|56|19|A/V|gCc/gTc|||1||||tolerated_low_confidence(0.29)
                            // get the sift score
                            // let regExp = /\(([^)]+)\)/; // get the string in parentheses
                            // let sift = regExp.exec(dataSplit[dataSplit.length - 1])[1];
                            // if (sift < 0.05) {return "#d30085"}
                            let sift = dataSplit[dataSplit.length - 1];
                            if (sift.includes("deleterious")) {return "#ff9a00"}
                            
                        }
                        return 'purple';
                    } else if (eff_type === "synonymous_variant") {
                        return '#00FF2F';
                    }
                }
                return 'blue'
            } else {
                return 'blue'
            }
        }



        return declare([CanvasVariants, VariantDetailsMixin], {

            _defaultConfig: function() {
                return Util.deepUpdate(
                    dojo.clone(this.inherited(arguments)), {
                        style: {
                            text2Color: variantColorCoding,
                            color: variantColorCoding
                        }
                    });
            },

        });
    });



