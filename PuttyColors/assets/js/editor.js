var module = angular.module('puttycolors-editor', ['puttycolors-profiles', 'angularSpectrumColorpicker']);

module.controller('editorController', ['$scope', 'profileService', function ($scope, profileService) {

	$scope.colors = [
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

	$scope.getClassesForCell = function (fgColorName, bgColorName, isBold) {
		return ["bg-" + angular.element.trim(bgColorName), "fg-" + angular.element.trim(fgColorName), { "bold": isBold }];
	};

	$scope.buildeditorProfile = function () {
		var editorProfile = [];
		angular.forEach(ProfileDataKeys, function (propName, index) {
			editorProfile.push({ name: propName, label: ProfileColorNames[index], color: tinycolor(profileService.currentProfile.data[propName]) });
		});
		$scope.editorProfile = editorProfile;
		$scope.currentColor = $scope.editorProfile[0];
		$scope.profileName = profileService.currentProfile.name;
		$scope.sessionName = profileService.currentProfile.sessionName;
		$scope.authorName = profileService.currentProfile.author;
		$scope.authorUrl = profileService.currentProfile.url;
	};

	var setColorFields = function () {
		$scope.currentColorHex = $scope.currentColor.color.toHexString();
		$scope.currentColorRgb = $scope.currentColor.color.toRgb();
	};

	// Entire profile changed
	$scope.$watch(function () { return profileService.currentProfile }, $scope.buildEditorProfile);

	// Selected color within profile changed
	$scope.$watch("currentColor", function () {
		setColorFields();
	});
	$scope.$watch("currentColor.color", function () {
		setColorFields();
		profileService.currentProfile.data[$scope.currentColor.name] = $scope.currentColor.color.toRgbString();
	});

	// Hex changed
	$scope.$watch("currentColorHex", function () {
		// Only set the new color in the model if it is actually a new color
		var newColor = tinycolor($scope.currentColorHex);
		if ($scope.currentColor.color.toRgbString() != newColor.toRgbString())
			$scope.currentColor.color = newColor;
	});

	// RGB changed
	$scope.$watch("currentColorRgb", function () {
		// Only set the new color in the model if it is actually a new color
		var newColor = tinycolor($scope.currentColorRgb);
		if ($scope.currentColor.color.toRgbString() != newColor.toRgbString())
			$scope.currentColor.color = newColor;
	}, true);

	// Other fields changed
	$scope.$watch("profileName", function () { profileService.currentProfile.name = $scope.profileName; });
	$scope.$watch("sessionName", function () { profileService.currentProfile.sessionName = $scope.sessionName; });
	$scope.$watch("authorName", function () { profileService.currentProfile.author = $scope.authorName; });
	$scope.$watch("authorUrl", function () { profileService.currentProfile.url = $scope.authorUrl; });

	if (!profileService.currentProfile) profileService.currentProfile = new Profile();
	else $scope.buildeditorProfile();

}]);