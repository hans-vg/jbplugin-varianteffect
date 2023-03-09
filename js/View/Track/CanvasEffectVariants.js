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
                let all_ann = data.join(',');
                if (/stop_gained|splice_donor_variant|splice_acceptor_variant|frameshift_variant/.test(all_ann)) {
                    return '#FF0000'; // red color
                } else if (all_ann.includes("deleterious")){
                    return "#ff9a00"; // orange for deleterious missense_variant if using VEP annotated vcf with SIFT score
                } else if (all_ann.includes("missense_variant")){
                    return 'purple';
                } else if (all_ann.includes("synonymous_variant")){
                    return '#00FF2F'; // green for synonymous variant
                } else {
                    return 'blue';
                }
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



