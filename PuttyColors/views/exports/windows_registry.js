angular.module("puttycolors.exports.windows_registry", ['puttycolors-exports']).run(["exportService", function (exportService) {
	exportService.register("views/exports/windows_registry.reg", "Windows Registry",
	  "Windows Registry Editor Version 5.00\n\n" +
	  "[HKEY_CURRENT_USER\\Software\\SimonTatham\\PuTTY\\Sessions\\{{sessionName}}]\n" +
	  "colour0 = \"{{getColor('colour0').toRgb().r}},{{getColor('colour0').toRgb().g}},{{getColor('colour0' ).toRgb().b}}\"\n" +
	  "colour1 = \"{{getColor('colour1').toRgb().r}},{{getColor('colour1').toRgb().g}},{{getColor('colour1' ).toRgb().b}}\"\n" +
	  "colour2 = \"{{getColor('colour2').toRgb().r}},{{getColor('colour2').toRgb().g}},{{getColor('colour2' ).toRgb().b}}\"\n" +
	  "colour3 = \"{{getColor('colour3').toRgb().r}},{{getColor('colour3').toRgb().g}},{{getColor('colour3' ).toRgb().b}}\"\n" +
	  "colour4 = \"{{getColor('colour4').toRgb().r}},{{getColor('colour4').toRgb().g}},{{getColor('colour4' ).toRgb().b}}\"\n" +
	  "colour5 = \"{{getColor('colour5').toRgb().r}},{{getColor('colour5').toRgb().g}},{{getColor('colour5' ).toRgb().b}}\"\n" +
	  "colour6 = \"{{getColor('colour6').toRgb().r}},{{getColor('colour6').toRgb().g}},{{getColor('colour6' ).toRgb().b}}\"\n" +
	  "colour7 = \"{{getColor('colour7').toRgb().r}},{{getColor('colour7').toRgb().g}},{{getColor('colour7' ).toRgb().b}}\"\n" +
	  "colour8 = \"{{getColor('colour8').toRgb().r}},{{getColor('colour8').toRgb().g}},{{getColor('colour8' ).toRgb().b}}\"\n" +
	  "colour9 = \"{{getColor('colour9').toRgb().r}},{{getColor('colour9').toRgb().g}},{{getColor('colour9' ).toRgb().b}}\"\n" +
	  "colour10 = \"{{getColor('colour10').toRgb().r}},{{getColor('colour10').toRgb().g}},{{getColor('colour10').toRgb().b}}\"\n" +
	  "colour11 = \"{{getColor('colour11').toRgb().r}},{{getColor('colour11').toRgb().g}},{{getColor('colour11').toRgb().b}}\"\n" +
	  "colour12 = \"{{getColor('colour12').toRgb().r}},{{getColor('colour12').toRgb().g}},{{getColor('colour12').toRgb().b}}\"\n" +
	  "colour13 = \"{{getColor('colour13').toRgb().r}},{{getColor('colour13').toRgb().g}},{{getColor('colour13').toRgb().b}}\"\n" +
	  "colour14 = \"{{getColor('colour14').toRgb().r}},{{getColor('colour14').toRgb().g}},{{getColor('colour14').toRgb().b}}\"\n" +
	  "colour15 = \"{{getColor('colour15').toRgb().r}},{{getColor('colour15').toRgb().g}},{{getColor('colour15').toRgb().b}}\"\n" +
	  "colour16 = \"{{getColor('colour16').toRgb().r}},{{getColor('colour16').toRgb().g}},{{getColor('colour16').toRgb().b}}\"\n" +
	  "colour17 = \"{{getColor('colour17').toRgb().r}},{{getColor('colour17').toRgb().g}},{{getColor('colour17').toRgb().b}}\"\n" +
	  "colour18 = \"{{getColor('colour18').toRgb().r}},{{getColor('colour18').toRgb().g}},{{getColor('colour18').toRgb().b}}\"\n" +
	  "colour19 = \"{{getColor('colour19').toRgb().r}},{{getColor('colour19').toRgb().g}},{{getColor('colour19').toRgb().b}}\"\n" +
	  "colour20 = \"{{getColor('colour20').toRgb().r}},{{getColor('colour20').toRgb().g}},{{getColor('colour20').toRgb().b}}\"\n" +
	  "colour21 = \"{{getColor('colour21').toRgb().r}},{{getColor('colour21').toRgb().g}},{{getColor('colour21').toRgb().b}}\"\n" +
	  "");
}]);