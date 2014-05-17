/**
 * PuTTY Colors
 */

// Spectrum - Don't shim HTML5
$.fn.spectrum.load = false;

// Color names as they appear in PuTTY (with British English spellings)
var color_setting_names = {
	'colour0': "Default Foreground",
	'colour1': "Default Bold Foreground",
	'colour2': "Default Background",
	'colour3': "Default Bold Background",
	'colour4': "Cursor Text",
	'colour5': "Cursor Color",
	'colour6': "ANSI Black",
	'colour7': "ANSI Black Bold",
	'colour8': "ANSI Red",
	'colour9': "ANSI Red Bold",
	'colour10': "ANSI Green",
	'colour11': "ANSI Green Bold",
	'colour12': "ANSI Yellow",
	'colour13': "ANSI Yellow Bold",
	'colour14': "ANSI Blue",
	'colour15': "ANSI Blue Bold",
	'colour16': "ANSI Magenta",
	'colour17': "ANSI Magenta Bold",
	'colour18': "ANSI Cyan",
	'colour19': "ANSI Cyan Bold",
	'colour20': "ANSI White",
	'colour21': "ANSI White Bold",
};

// Current colors
var current_colors = {};

/* Class names */
var colors = [
		"default", "black  ", "red    ", "green  ", "yellow ", "blue   ", "magenta", "cyan   ", "white  "
];

var preview = function()
{
	// Update stylesheet
	var preview_style = "";

	// 'colour0' : "Default Foreground"
	preview_style += '#preview_content { color: ' + current_colors['colour0'] + ' }' + "\n";

	// 'colour1' : "Default Bold Foreground"
	preview_style += '#preview_content .bold { color: ' + current_colors['colour1'] + ' }' + "\n";

	// 'colour2' : "Default Background"
	preview_style += '#preview_content { background-color: ' + current_colors['colour2'] + ' }' + "\n";

	// 'colour3' : "Default Bold Background"
	preview_style += '#preview_content .bold { background-color: ' + current_colors['colour3'] + ' }' + "\n";

	// 'colour4' : "Cursor Text"
	preview_style += '#preview_content .cursor { color: ' + current_colors['colour4'] + ' }' + "\n";

	// 'colour5' : "Cursor Color"
	preview_style += '#preview_content .cursor { background-color: ' + current_colors['colour5'] + ' }' + "\n";

	// 'colour6' : "ANSI Black"
	preview_style += '#preview_content .fg-black { color: ' + current_colors['colour6'] + ' }' + "\n";
	preview_style += '#preview_content .bg-block { background-color: ' + current_colors['colour6'] + ' }' + "\n";

	// 'colour7' : "ANSI Black Bold"
	preview_style += '#preview_content .fg-black.bold { color: ' + current_colors['colour7'] + ' }' + "\n";

	// 'colour8' : "ANSI Red"
	preview_style += '#preview_content .fg-red { color: ' + current_colors['colour8'] + ' }' + "\n";
	preview_style += '#preview_content .bg-red { background-color: ' + current_colors['colour8'] + ' }' + "\n";

	// 'colour9' : "ANSI Red Bold"
	preview_style += '#preview_content .fg-red.bold { color: ' + current_colors['colour9'] + ' }' + "\n";

	// 'colour10' : "ANSI Green"
	preview_style += '#preview_content .fg-green { color: ' + current_colors['colour10'] + ' }' + "\n";
	preview_style += '#preview_content .bg-green { background-color: ' + current_colors['colour10'] + ' }' + "\n";

	// 'colour11' : "ANSI Green Bold"
	preview_style += '#preview_content .fg-green.bold { color: ' + current_colors['colour11'] + ' }' + "\n";

	// 'colour12' : "ANSI Yellow"
	preview_style += '#preview_content .fg-yellow { color: ' + current_colors['colour12'] + ' }' + "\n";
	preview_style += '#preview_content .bg-yellow { background-color: ' + current_colors['colour12'] + ' }' + "\n";

	// 'colour13' : "ANSI Yellow Bold"
	preview_style += '#preview_content .fg-yellow.bold { color: ' + current_colors['colour13'] + ' }' + "\n";

	// 'colour14' : "ANSI Blue"
	preview_style += '#preview_content .fg-blue { color: ' + current_colors['colour14'] + ' }' + "\n";
	preview_style += '#preview_content .bg-blue { background-color: ' + current_colors['colour14'] + ' }' + "\n";

	// 'colour15' : "ANSI Blue Bold"
	preview_style += '#preview_content .fg-blue.bold { color: ' + current_colors['colour15'] + ' }' + "\n";

	// 'colour16' : "ANSI Magenta"
	preview_style += '#preview_content .fg-magenta { color: ' + current_colors['colour16'] + ' }' + "\n";
	preview_style += '#preview_content .bg-magenta { background-color: ' + current_colors['colour16'] + ' }' + "\n";

	// 'colour17' : "ANSI Magenta Bold"
	preview_style += '#preview_content .fg-magenta.bold { color: ' + current_colors['colour17'] + ' }' + "\n";

	// 'colour18' : "ANSI Cyan"
	preview_style += '#preview_content .fg-cyan { color: ' + current_colors['colour18'] + ' }' + "\n";
	preview_style += '#preview_content .bg-cyan { background-color: ' + current_colors['colour18'] + ' }' + "\n";

	// 'colour19' : "ANSI Cyan Bold"
	preview_style += '#preview_content .fg-cyan.bold { color: ' + current_colors['colour19'] + ' }' + "\n";

	// 'colour20' : "ANSI White"
	preview_style += '#preview_content .fg-white { color: ' + current_colors['colour20'] + ' }' + "\n";
	preview_style += '#preview_content .bg-white { background-color: ' + current_colors['colour20'] + ' }' + "\n";

	// 'colour21' : "ANSI White Bold"
	preview_style += '#preview_content .fg-white.bold { color: ' + current_colors['colour21'] + ' }' + "\n";

	$('#preview_style').html(preview_style);

};

var updateCodeBlocks = function()
{
	var rgbRegExp = /rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/;
	var sessionName = $('#field_preset_name').val();
	if (sessionName == '')
		sessionName = "Default Settings";

	// Update Windows Registry Block
	var registryCode = "Windows Registry Editor Version 5.00\n\n";
	registryCode += "[HKEY_CURRENT_USER\\Software\\SimonTatham\\PuTTY\\Sessions\\" + encodeURIComponent(sessionName) + "]\n";
	for ( var colour in current_colors)
	{
		var c = current_colors[colour].replace(rgbRegExp, "$1,$2,$3");
		registryCode += "\"" + colour + "\"=\"" + c + "\"\n";
	}
	$('#code_reg').val(registryCode);

};

var parseRegistryEntries = function(regData)
{
	var registryRegExp = /^\"([ -~]+?)\"\=\"(\d{1,3})\,(\d{1,3})\,(\d{1,3})\"$/mg;
	var matches;
	var colors = {};
	while ((matches = registryRegExp.exec(regData)) !== null)
	{
		var colour = matches[1].toLowerCase();
		var r = matches[2];
		var g = matches[3];
		var b = matches[4];
		colors[colour] = 'rgb(' + r + ',' + g + ',' + b + ')';
	}
	return colors;
};

$(document).ready(function()
{

	// Change title of window when Session Name changes
	var $field_preset_name = $("#field_preset_name");
	var changeTitle = function()
	{
		var session_name = $(this).val();
		if (session_name == '')
			session_name = "Default Session";
		$('#preview_title').text("PuTTY - " + session_name);
		updateCodeBlocks();
	};
	$field_preset_name.on('change', changeTitle);
	$field_preset_name.on('keyup', changeTitle);
	changeTitle.call($field_preset_name[0]);

	// render preview HTML
	var $preview = $("#preview_content");
	$('<p><span class="fg-green bold">putty</span>@<span class="fg-blue bold">server</span> ~ $ colors.sh</p>').appendTo($preview);
	$('<p>             default  black    red    green   yellow  blue   magenta  cyan    white  </p>').appendTo($preview);
	for ( var y in colors)
	{
		var fgClassName = "fg-" + $.trim(colors[y]);
		var $row_normal = $('<p>' + colors[y] + '      </p>');
		var $row_bold = $('<p>' + colors[y] + ' bold </p>');
		for ( var x in colors)
		{
			var bgClassName = "bg-" + $.trim(colors[x]);
			$('<span class="' + fgClassName + ' ' + bgClassName + '">  gYw   </span> ').appendTo($row_normal);
			$('<span class="' + fgClassName + ' bold ' + bgClassName + '">  gYw   </span> ').appendTo($row_bold);
		}
		$($row_normal).appendTo($preview);
		$($row_bold).appendTo($preview);
	}
	$('<p><span class="fg-green bold">putty</span>@<span class="fg-blue bold">server</span> ~ $ l<span class="cursor">s</span></p>').appendTo($preview);

	// color selection dialog
	var $colour_selector = $('#color_selection');
	var $colour_picker = $("#color_picker");
	var $field_cp_red = $('#field_cp_red');
	var $field_cp_green = $('#field_cp_green');
	var $field_cp_blue = $('#field_cp_blue');
	var $field_cp_hex = $('#field_cp_hex');
	$colour_selector.html('');
	for ( var colour in color_setting_names)
	{
		$('<option value="' + colour + '">' + color_setting_names[colour] + '</option>').appendTo($colour_selector);
	}
	var setRGB = function(c)
	{
		var color = c.toRgb();
		$field_cp_red.val(color.r);
		$field_cp_green.val(color.g);
		$field_cp_blue.val(color.b);
	};
	var setHex = function(c)
	{
		var color = c.toHexString();
		$field_cp_hex.val(color);
	};
	var setColorPicker = function(colorStr)
	{
		$colour_picker.spectrum('set', colorStr);
		return $colour_picker.spectrum('get');
	};
	var setPreview = function(c)
	{
		var color = c.toRgbString();
		var colour = $colour_selector.val();
		current_colors[colour] = color;
		preview();
		updateCodeBlocks();
	};
	$colour_picker.spectrum({
		flat: true,
		showButtons: false,
		preferredFormat: "rgb",
		move: function(color)
		{
			setRGB(color);
			setHex(color);
		},
	});
	$colour_picker.on("dragstop.spectrum", function(e, color)
	{
		setPreview(color);
	});
	var changeSelection = function()
	{
		var colour = $(this).val();
		var color = current_colors[colour];
		var c = setColorPicker(color);
		setRGB(c);
		setHex(c);
	};
	$colour_selector.on('change', changeSelection);
	var changeRgb = function()
	{
		var r = parseInt($field_cp_red.val());
		var g = parseInt($field_cp_green.val());
		var b = parseInt($field_cp_blue.val());
		var color = "rgb(" + r + "," + g + "," + b + ")";
		var c = setColorPicker(color);
		setHex(c);
		setPreview(c);
	};
	$field_cp_red.on('keyup', changeRgb);
	$field_cp_green.on('keyup', changeRgb);
	$field_cp_blue.on('keyup', changeRgb);
	$field_cp_hex.on('keyup', function()
	{
		var c = setColorPicker($(this).val());
		setRGB(c);
		setPreview(c);
	});

	// importing from registry
	var $import_modal = $('#modal_import');
	var $import_reg = $('#import_reg');
	var $action_import = $('#action_import');
	$action_import.on('click', function()
	{
		// parse the registry and replace the current
		var imported = parseRegistryEntries($import_reg.val());
		current_colors = $.extend({}, current_colors, imported);
		preview();
		updateCodeBlocks();
		
		// update pickers for currently selected colour
		changeSelection.call($colour_selector[0]);

		// close modal
		$import_modal.modal('hide');
	});

	// load the presets
	var $preset_menu = $('#preset_menu');
	var $preset_credits = $('#preset_credits');
	$preset_menu.on('click', '.preset-entry', function()
	{
		var $this = $(this);
		
		var preset_name = $this.text();
		$field_preset_name.val(preset_name);
		changeTitle.call($field_preset_name[0]);
		
		var preset_data = JSON.parse(decodeURIComponent($this.data('preset')));
		current_colors = $.extend({}, current_colors, preset_data);
		preview();
		updateCodeBlocks();
		changeSelection.call($colour_selector[0]);
	});

	var processPresetResponse = function(data)
	{
		for ( var i in data)
		{
			var preset = data[i];
			if (preset.type == 'PRESET')
			{
				if (preset.name == 'Default')
				{
					// initial update
					current_colors = preset.data;
					preview();
					updateCodeBlocks();
					changeSelection.call($colour_selector[0]);
				}
				$('<li><a href="Javascript:;" class="preset-entry" data-preset="' + encodeURIComponent(JSON.stringify(preset.data)) + '">' + preset.name + '</a></li>').appendTo($preset_menu);
				$('<li><a href="' + preset.url + '">' + preset.name + '</a> - <em>' + preset.author + '</em>').appendTo($preset_credits);
			}
			else if (preset.type == 'DIVIDER')
			{
				$('<li class="divider"></li>').appendTo($preset_menu);
			}
		}
	};

	// for when are on a real webserver:
	/*
	$.ajax({
		dataType: "json",
		url: "presets.json",
		success: processPresetResponse
	});
	*/
	// for now:
	var presetData = [
			{
				"type": "PRESET",
				"name": "Default",
				"author": "Simon Tatham",
				"url": "http://www.chiark.greenend.org.uk/~sgtatham/putty/",
				"data": {
					"colour0": "rgb(184,184,184)",
					"colour1": "rgb(255,255,255)",
					"colour2": "rgb(0,0,0)",
					"colour3": "rgb(0,0,0)",
					"colour4": "rgb(0,0,0)",
					"colour5": "rgb(0,255,0)",
					"colour6": "rgb(0,0,0)",
					"colour7": "rgb(63,63,63)",
					"colour8": "rgb(184,0,0)",
					"colour9": "rgb(255,0,0)",
					"colour10": "rgb(0,184,0)",
					"colour11": "rgb(0,255,0)",
					"colour12": "rgb(184,184,0)",
					"colour13": "rgb(255,255,0)",
					"colour14": "rgb(0,0,184)",
					"colour15": "rgb(0,0,255)",
					"colour16": "rgb(184,0,184)",
					"colour17": "rgb(255,0,255)",
					"colour18": "rgb(0,184,184)",
					"colour19": "rgb(0,255,255)",
					"colour20": "rgb(184,184,184)",
					"colour21": "rgb(255,255,255)"
				}
			}, {
				"type": "DIVIDER"
			}, {
				"type": "PRESET",
				"name": "Solarized Dark",
				"author": "Ethan Schoonover",
				"url": "https://github.com/altercation/solarized/tree/master/putty-colors-solarized",
				"data": {
					"colour0": "rgb(131,148,150)",
					"colour1": "rgb(147,161,161)",
					"colour2": "rgb(0,43,54)",
					"colour3": "rgb(7,54,66)",
					"colour4": "rgb(0,43,54)",
					"colour5": "rgb(238,232,213)",
					"colour6": "rgb(7,54,66)",
					"colour7": "rgb(0,43,56)",
					"colour8": "rgb(220,50,47)",
					"colour9": "rgb(203,75,22)",
					"colour10": "rgb(133,153,0)",
					"colour11": "rgb(88,110,117)",
					"colour12": "rgb(181,137,0)",
					"colour13": "rgb(101,123,131)",
					"colour14": "rgb(38,139,210)",
					"colour15": "rgb(131,148,150)",
					"colour16": "rgb(211,54,130)",
					"colour17": "rgb(108,113,196)",
					"colour18": "rgb(42,161,152)",
					"colour19": "rgb(147,161,161)",
					"colour20": "rgb(238,232,213)",
					"colour21": "rgb(253,246,227)"
				}
			}, {
				"type": "PRESET",
				"name": "Solarized Light",
				"author": "Ethan Schoonover",
				"url": "https://github.com/altercation/solarized/tree/master/putty-colors-solarized",
				"data": {
					"colour0": "rgb(101,123,131)",
					"colour1": "rgb(88,110,117)",
					"colour2": "rgb(253,246,227)",
					"colour3": "rgb(238,232,213)",
					"colour4": "rgb(238,232,213)",
					"colour5": "rgb(101,123,131)",
					"colour6": "rgb(7,54,66)",
					"colour7": "rgb(0,43,54)",
					"colour8": "rgb(220,50,47)",
					"colour9": "rgb(203,75,22)",
					"colour10": "rgb(133,153,0)",
					"colour11": "rgb(88,110,117)",
					"colour12": "rgb(181,137,0)",
					"colour13": "rgb(101,123,131)",
					"colour14": "rgb(38,139,210)",
					"colour15": "rgb(131,148,150)",
					"colour16": "rgb(211,54,130)",
					"colour17": "rgb(108,113,196)",
					"colour18": "rgb(42,161,152)",
					"colour19": "rgb(147,161,161)",
					"colour20": "rgb(238,232,213)",
					"colour21": "rgb(253,246,227)"
				}
			}
	];
	processPresetResponse(presetData);

});
