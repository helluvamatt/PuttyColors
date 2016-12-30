var profilesModule = angular.module('puttycolors-profiles', []);

var ProfileType = {
	Preset: "PRESET",
	User: "USER"
};

var ProfileDataKeys = [
	"colour0",
	"colour1",
	"colour2",
	"colour3",
	"colour4",
	"colour5",
	"colour6",
	"colour7",
	"colour8",
	"colour9",
	"colour10",
	"colour11",
	"colour12",
	"colour13",
	"colour14",
	"colour15",
	"colour16",
	"colour17",
	"colour18",
	"colour19",
	"colour20",
	"colour21",
];

// Color names as they appear in PuTTY (with British English spellings)
var ProfileColorNames = [
	"Default Foreground",
	"Default Bold Foreground",
	"Default Background",
	"Default Bold Background",
	"Cursor Text",
	"Cursor Color",
	"ANSI Black",
	"ANSI Black Bold",
	"ANSI Red",
	"ANSI Red Bold",
	"ANSI Green",
	"ANSI Green Bold",
	"ANSI Yellow",
	"ANSI Yellow Bold",
	"ANSI Blue",
	"ANSI Blue Bold",
	"ANSI Magenta",
	"ANSI Magenta Bold",
	"ANSI Cyan",
	"ANSI Cyan Bold",
	"ANSI White",
	"ANSI White Bold",
];

function Profile() {
	this.data = {
		colour0: "rgb(184,184,184)",
		colour1: "rgb(255,255,255)",
		colour2: "rgb(0,0,0)",
		colour3: "rgb(0,0,0)",
		colour4: "rgb(0,0,0)",
		colour5: "rgb(0,255,0)",
		colour6: "rgb(0,0,0)",
		colour7: "rgb(63,63,63)",
		colour8: "rgb(184,0,0)",
		colour9: "rgb(255,0,0)",
		colour10: "rgb(0,184,0)",
		colour11: "rgb(0,255,0)",
		colour12: "rgb(184,184,0)",
		colour13: "rgb(255,255,0)",
		colour14: "rgb(0,0,184)",
		colour15: "rgb(0,0,255)",
		colour16: "rgb(184,0,184)",
		colour17: "rgb(255,0,255)",
		colour18: "rgb(0,184,184)",
		colour19: "rgb(0,255,255)",
		colour20: "rgb(184,184,184)",
		colour21: "rgb(255,255,255)",
	};
}
Profile.prototype.name = "Default";
Profile.prototype.sessionName = "Default Session";
Profile.prototype.author = "Simon Tatham";
Profile.prototype.url = "http://www.chiark.greenend.org.uk/~sgtatham/putty/";
Profile.prototype.type = ProfileType.User;
Profile.prototype.data = {};

function ProfileService($http) {
	// TODO Persistence for profiles
	// TODO This is a singleton, so until we add a real persistence database, there will only be one exposed "profile": the currently editing one	

	this.getPresets = function () {
		return $http.get('assets/data/presets.json').then(function (response) {
			var presets = [];
			angular.forEach(response.data, function (preset) {
				presets.push(angular.extend(new Profile(), preset));
			});
			return presets;
		});
	};
}
ProfileService.prototype.currentProfile = new Profile();

profilesModule.service('profileService', ['$http', ProfileService]);