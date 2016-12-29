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

function Profile(obj) {}
Profile.prototype.name = "Default";
Profile.prototype.sessionName = "Default Session";
Profile.prototype.author = "Simon Tatham";
Profile.prototype.url = "http://www.chiark.greenend.org.uk/~sgtatham/putty/";
Profile.prototype.type = ProfileType.User;
Profile.prototype.data = {};
Profile.prototype.data.colour0 ="rgb(184,184,184)";
Profile.prototype.data.colour1 = "rgb(255,255,255)";
Profile.prototype.data.colour2 = "rgb(0,0,0)";
Profile.prototype.data.colour3 = "rgb(0,0,0)";
Profile.prototype.data.colour4 = "rgb(0,0,0)";
Profile.prototype.data.colour5 = "rgb(0,255,0)";
Profile.prototype.data.colour6 = "rgb(0,0,0)";
Profile.prototype.data.colour7 = "rgb(63,63,63)";
Profile.prototype.data.colour8 = "rgb(184,0,0)";
Profile.prototype.data.colour9 = "rgb(255,0,0)";
Profile.prototype.data.colour10 = "rgb(0,184,0)";
Profile.prototype.data.colour11 = "rgb(0,255,0)";
Profile.prototype.data.colour12 = "rgb(184,184,0)";
Profile.prototype.data.colour13 = "rgb(255,255,0)";
Profile.prototype.data.colour14 = "rgb(0,0,184)";
Profile.prototype.data.colour15 = "rgb(0,0,255)";
Profile.prototype.data.colour16 = "rgb(184,0,184)";
Profile.prototype.data.colour17 = "rgb(255,0,255)";
Profile.prototype.data.colour18 = "rgb(0,184,184)";
Profile.prototype.data.colour19 = "rgb(0,255,255)";
Profile.prototype.data.colour20 = "rgb(184,184,184)";
Profile.prototype.data.colour21 = "rgb(255,255,255)";

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