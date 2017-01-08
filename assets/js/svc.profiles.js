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
Profile.prototype.type = ProfileType.Preset;
Profile.prototype.data = {};

function ProfileService($http, $window, alertService) {

	this.getPresets = function () {
		return $http.get('data/presets.json').then(function (response) {
			var presets = [];
			angular.forEach(response.data, function (preset) {
				presets.push(angular.extend(new Profile(), preset));
			});
			return presets;
		});
	};

	var that = this;

	var persistCustomProfiles = function () {
		try {
			$window.localStorage.setItem("customProfiles", angular.toJson(that.customProfiles));
		} catch (e) {
			console.error(e);
			alertService.alert(new Alert(e, AlertTypes.Error, "Error Saving Custom Profiles"));
		}
	};

	this.saveCustomProfile = function (profile) {
		if (!profile) profile = this.currentProfile;
		if (profile.type == ProfileType.Preset)
			profile.type = ProfileType.User;
		this.customProfiles[profile.name] = profile;
		persistCustomProfiles();
		alertService.alert(new Alert("Successfully saved profile.", AlertTypes.Success, null, 3000));
	};

	this.deleteCustomProfile = function (name) {
		if (name in this.customProfiles) {
			delete this.customProfiles[name];
			persistCustomProfiles();
			alertService.alert(new Alert("Successfully deleted profile.", AlertTypes.Success, null, 3000));
		}
		else {
			alertService.alert(new Alert("Profile \"" + name + "\" does not exist.", AlertTypes.Warn, "Cannot Delete"));
		}
	};

	// Load custom profiles
	(function (that) {
		var data;
		try {
			data = $window.localStorage.getItem("customProfiles");
			if (data)
				that.customProfiles = angular.fromJson(data);
		} catch (e) {
			console.error(e);
			console.debug("Persisted data: %O", data);
			alertService.alert(new Alert(e, AlertTypes.Error, "Error Loading Custom Profiles"));
		}
	})(this);
}
ProfileService.prototype.currentProfile = new Profile();
ProfileService.prototype.customProfiles = {};

angular.module('puttycolors.svc.profiles', ['puttycolors.svc.alerts']).service('profileService', ['$http', '$window', 'alertService', ProfileService]);
