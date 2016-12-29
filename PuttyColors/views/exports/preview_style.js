angular.module("puttycolors.exports.preview_style", ['puttycolors-exports']).run(["exportService", function (exportService) {
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