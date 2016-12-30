var module = angular.module('puttycolors-editor', ['puttycolors-profiles', 'puttycolors-tinycolor', 'minicolors']);

module.controller('editorController', ['$scope', 'profileService', function ($scope, profileService) {

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

}]);