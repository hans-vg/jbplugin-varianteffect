/**
 * Mixin with methods for parsing making default feature detail dialogs.
 */
define([
        'dojo/_base/declare',
        'JBrowse/Util',
        'JBrowse/View/Track/_FeatureDetailMixin'
    ],
    function(
        declare,
        Util,
        FeatureDetailMixin
    ) {

        return declare(FeatureDetailMixin, {
            _renderCoreDetails: function(track, f, featDiv, container) {
                var coreDetails = dojo.create('div', {
                    className: 'core'
                }, container);
                var fmt = dojo.hitch(this, 'renderDetailField', coreDetails);
                coreDetails.innerHTML += '<h2 class="sectiontitle">Primary Data</h2>';

                fmt('Name', this.getFeatureLabel(f), f);
                fmt('Type', f.get('type'), f);
                fmt('Score', f.get('score'), f);
                fmt('Description', this.getFeatureDescription(f), f);
                fmt(
                    'Position',
                    Util.assembleLocString({
                        start: f.get('start'),
                        end: f.get('end'),
                        ref: this.refSeq.name,
                        strand: f.get('strand')
                    }), f
                );
                fmt('Length', Util.addCommas(f.get('end') - f.get('start')) + ' bp', f);
                var ann = (f.get('ANN')||f.get('CSQ')||{}).values;
                var annText = "";
                for (var i = 0, len = ann.length; i < len; i++) {
                    counter = i + 1;

                    var dataSplit = ann[i].split("|");
                    var eff_type = dataSplit[1];
                    var severity = dataSplit[2];
                    var transcript_name = dataSplit[6];
                    var aa_change = dataSplit[10]; // this is from snpEff vcf
                    var sift = ""; // SIFT score
                    if (dataSplit.length > 16) {
                        aa_change = dataSplit[15].replace('/', dataSplit[14]); // CSQ default from VEP
                        sift = dataSplit[dataSplit.length - 1];
                    }
                    annText += "<b>SnpEffect_" + counter + ":</b><br>Mutation Effect = " + eff_type;
                    if (transcript_name != "") {
                        annText += "<br>Transcript = " + transcript_name;
                    }
                    if (severity != "") {
                        annText += "<br>Severity = " + severity;
                    }
                    if (aa_change != "") {
                        annText += "<br>Amino acid change = " + aa_change;
                    }
                    if (sift != "") {
                        annText += "<br>SIFT score = " + sift;
                    }
                    annText += "<br>";

                }
                fmt('Effect Annotation', annText, f);
            }

        });
    });


