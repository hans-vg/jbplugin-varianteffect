define([
    'dojo/_base/declare',
    'JBrowse/Plugin'
],
function(
   declare,
   JBrowsePlugin
) {
    return declare(JBrowsePlugin, {
        constructor: function(args) {
            var browser = args.browser;

            console.log('VariantEffectPlugin plugin starting');
            browser.registerTrackType({
				label: 'CanvasEffectVariants',
                type: 'VariantEffectPlugin/View/Track/CanvasEffectVariant'
            });
        }
    });
});
