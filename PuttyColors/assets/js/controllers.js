angular.module('puttycolors.controllers', ['ui.bootstrap', 'minicolors', 'puttycolors.svc.tinycolor', 'puttycolors.svc.alerts', 'puttycolors.svc.profiles', 'puttycolors.svc.export', 'puttycolors.svc.import'])

.controller('editorController', ['$scope', '$location', '$uibModal', 'profileService', 'exportService', function ($scope, $location, $uibModal, profileService, exportService) {

	$scope.previewCells = [
		"default",
		"black  ",
		"red    ",
		"green  ",
		"yellow ",
		"blue   ",
		"magenta",
		"cyan   ",
		"white  "
	];

	$scope.themes = [
		{
			label: "Ten",
			name: "theme-ten"
		},
		{
			label: "Metro Red",
			name: "theme-metro-red"
		},
		{
			label: "Luna Blue",
			name: "theme-luna-blue"
		},
		{
			label: "Luna Silver",
			name: "theme-luna-silver"
		},
		{
			label: "Classic",
			name: "theme-classic"
		}
	];
	$scope.theme = $scope.themes[0];

	$scope.getClassesForCell = function (fgColorName, bgColorName, isBold) {
		return ["bg-" + angular.element.trim(bgColorName), "fg-" + angular.element.trim(fgColorName), { "bold": isBold }];
	};

	$scope.navColor = function ($event) {
		if ($event.keyCode == 39) {
			// right (+1)
			var index = $scope.currentColor.index + 1;
			if (index < $scope.editorProfile.length) {
				$scope.currentColor = $scope.editorProfile[index];
			}
		} else if ($event.keyCode == 37) {
			// left (-1)
			var index = $scope.currentColor.index - 1;
			if (index > -1) {
				$scope.currentColor = $scope.editorProfile[index];
			}
		}
	};

	$scope.saveProfile = function () {
		profileService.saveCustomProfile();
	};

	$scope.exportProfile = function () {
		$uibModal.open({
			controller: 'exportController',
			templateUrl: 'views/modal-export.html',
			size: 'lg'
		});
	};

	var buildEditorProfile = function () {
		var editorProfile = [];
		angular.forEach(ProfileDataKeys, function (propName, index) {
			editorProfile.push({ name: propName, label: ProfileColorNames[index], index: index, color: tinycolor(profileService.currentProfile.data[propName]) });
		});
		$scope.editorProfile = editorProfile;
		$scope.currentColor = $scope.editorProfile[0];
		$scope.profileName = profileService.currentProfile.name;
		$scope.sessionName = profileService.currentProfile.sessionName;
		$scope.authorName = profileService.currentProfile.author;
		$scope.authorUrl = profileService.currentProfile.url;
	};

	// Entire profile changed
	$scope.$watch(function () { return profileService.currentProfile }, buildEditorProfile);

	// Selected color within profile changed
	$scope.$watch("currentColor.color", function () {
		profileService.currentProfile.data[$scope.currentColor.name] = $scope.currentColor.color.toRgbString();
	});

	// Other fields changed
	$scope.$watch("profileName", function () { profileService.currentProfile.name = $scope.profileName; });
	$scope.$watch("sessionName", function () { profileService.currentProfile.sessionName = $scope.sessionName; });
	$scope.$watch("authorName", function () { profileService.currentProfile.author = $scope.authorName; });
	$scope.$watch("authorUrl", function () { profileService.currentProfile.url = $scope.authorUrl; });

	if (!profileService.currentProfile) profileService.currentProfile = new Profile();
	else buildEditorProfile();

}])

.controller('profilesController', ['$scope', '$location', '$uibModal', 'profileService', 'presets', function ($scope, $location, $uibModal, profileService, presets) {
	$scope.presets = presets;
	$scope.profileDataKeys = ProfileDataKeys;
	$scope.profileColorNames = ProfileColorNames;

	$scope.loadPreset = function (index) {
		profileService.currentProfile = $scope.presets[index];
		$location.path("/");
	};

	$scope.exportPreset = function (index) {
		profileService.currentProfile = $scope.presets[index];
		$uibModal.open({
			controller: 'exportController',
			templateUrl: 'views/modal-export.html',
			size: 'lg'
		});
	};

	$scope.newProfile = function () {
		var newProfile = new Profile();
		newProfile.name = "New Profile";
		newProfile.type = ProfileType.User;
		profileService.currentProfile = newProfile;
		$location.path("/");
	};

	$scope.importProfile = function () {
		$uibModal.open({
			controller: 'importController',
			templateUrl: 'views/modal-import.html',
			size: 'lg'
		});
	};

	$scope.loadCustomProfile = function (index) {
		profileService.currentProfile = $scope.customProfiles[index];
		$location.path("/");
	};

	$scope.exportCustomProfile = function (index) {
		profileService.currentProfile = $scope.customProfiles[index];
		$uibModal.open({
			controller: 'exportController',
			templateUrl: 'views/modal-export.html',
			size: 'lg'
		});
	};

	$scope.deleteCustomProfile = function (index) {
		var profile = $scope.customProfiles[index];
		$uibModal.open({
			templateUrl: "views/modal-confirm.html",
			scope: angular.extend($scope.$root.$new(), {
				message: 'Are you sure you want to delete this profile?',
				modalContext: 'danger'
			}),
		}).result.then(function(result) {
			if (result) profileService.deleteCustomProfile(profile.name);
		});
		
	};

	var buildCustomProfileList = function () {
		var profiles = [];
		angular.forEach(profileService.customProfiles, function (profile, name) {
			profiles.push(profile);
		});
		$scope.customProfiles = profiles;
	};

	$scope.$watch(function () { return profileService.customProfiles }, buildCustomProfileList, true);
	buildCustomProfileList();

}])

.controller('exportController', ['$scope', 'profileService', 'exportService', function ($scope, profileService, exportService) {

	$scope.profileName = profileService.currentProfile.name;
	$scope.authorName = profileService.currentProfile.author;
	$scope.authorUrl = profileService.currentProfile.url;

	$scope.$watch('selectedTemplate', function () {
		if ($scope.selectedTemplate)
			$scope.code = exportService.render($scope.selectedTemplate.name, profileService.currentProfile);
	});

	$scope.templates = exportService.getExportList();
	if ($scope.templates.length > 0)
		$scope.selectedTemplate = $scope.templates[0];

}])

.controller('importController', ['$scope', 'profileService', 'importService', function ($scope, profileService, importService) {

	$scope.parsers = importService.getParsers();
	if ($scope.parsers.length > 0) $scope.selectedParser = $scope.parsers[0];
	$scope.importData = '';

	$scope.import = function () {
		try {
			var profile = importService.parse($scope.selectedParser.name, $scope.importData);
			if (profile) {
				profileService.saveCustomProfile(profile);
			}
			$scope.$close(true);
		}
		catch (e) {
			$scope.error = e;
		}
	};
}]);