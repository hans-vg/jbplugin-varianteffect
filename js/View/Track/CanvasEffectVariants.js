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
            var value = feature.get('ANN');
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



