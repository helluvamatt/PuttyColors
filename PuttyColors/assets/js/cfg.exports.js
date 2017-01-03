angular.module("puttycolors.cfg.exports", ['puttycolors.svc.export']).run(["exportService", function (exportService) {
	// Windows Registry
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

	// JSON
	exportService.register("views/exports/export.json", "JSON", "{{this|json:4}}");

	// Preview Style
	exportService.register("views/exports/preview_style.css", "Preview CSS",
	".preview-content\n" +
	"{" +
	"	color: {{getColor('colour0').toHexString()}};\n" +
	"	background-color: {{getColor('colour2').toHexString()}};\n" +
	"}\n" +
	".preview-content .bold\n" +
	"{\n" +
	"	color: {{getColor('colour1').toHexString()}};\n" +
	"	background-color: {{getColor('colour3').toHexString()}};\n" +
	"}\n" +
	".preview-content .cursor\n" +
	"{\n" +
	"	color: {{getColor('colour4').toHexString()}};\n" +
	"	background-color: {{getColor('colour5').toHexString()}};\n" +
	"}\n" +
	".preview-content .fg-black { color: {{getColor('colour6').toHexString()}}; }\n" +
	".preview-content .bg-black { background-color: {{getColor('colour6').toHexString()}}; }\n" +
	".preview-content .fg-black.bold { color: {{getColor('colour7').toHexString()}}; }\n" +
	".preview-content .fg-red { color: {{getColor('colour8').toHexString()}}; }\n" +
	".preview-content .bg-red { background-color: {{getColor('colour8').toHexString()}}; }\n" +
	".preview-content .fg-red.bold { color: {{getColor('colour9').toHexString()}}; }\n" +
	".preview-content .fg-green { color: {{getColor('colour10').toHexString()}}; }\n" +
	".preview-content .bg-green { background-color: {{getColor('colour10').toHexString()}}; }\n" +
	".preview-content .fg-green.bold { color: {{getColor('colour11').toHexString()}}; }\n" +
	".preview-content .fg-yellow { color: {{getColor('colour12').toHexString()}}; }\n" +
	".preview-content .bg-yellow { background-color: {{getColor('colour12').toHexString()}}; }\n" +
	".preview-content .fg-yellow.bold { color: {{getColor('colour13').toHexString()}}; }\n" +
	".preview-content .fg-blue { color: {{getColor('colour14').toHexString()}}; }\n" +
	".preview-content .bg-blue { background-color: {{getColor('colour14').toHexString()}}; }\n" +
	".preview-content .fg-blue.bold { color: {{getColor('colour15').toHexString()}}; }\n" +
	".preview-content .fg-magenta { color: {{getColor('colour16').toHexString()}}; }\n" +
	".preview-content .bg-magenta { background-color: {{getColor('colour16').toHexString()}}; }\n" +
	".preview-content .fg-magenta.bold { color: {{getColor('colour17').toHexString()}}; }\n" +
	".preview-content .fg-cyan { color: {{getColor('colour18').toHexString()}}; }\n" +
	".preview-content .bg-cyan { background-color: {{getColor('colour18').toHexString()}}; }\n" +
	".preview-content .fg-cyan.bold { color: {{getColor('colour19').toHexString()}}; }\n" +
	".preview-content .fg-white { color: {{getColor('colour20').toHexString()}}; }\n" +
	".preview-content .bg-white { background-color: {{getColor('colour20').toHexString()}}; }\n" +
	".preview-content .fg-white.bold { color: {{getColor('colour21').toHexString()}}; }\n" +
"", true);
}]);