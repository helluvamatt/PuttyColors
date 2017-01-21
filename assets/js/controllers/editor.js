angular.module('puttycolors.controllers.editor', ['ui.bootstrap', 'minicolors', 'ngclipboard', 'puttycolors.svc.tinycolor', 'puttycolors.svc.profiles', 'puttycolors.svc.export'])

.controller('editorController', ['$scope', '$state', '$uibModal', 'profileService', 'exportService', 'sharedProfile', function ($scope, $state, $uibModal, profileService, exportService, sharedProfile) {

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

	$scope.saveProfile = function() {
		$scope.shareError = null;
		profileService.saveProfile($scope.currentProfile).catch(function (rejection) {
			$scope.shareError = rejection;
		});
	};

	$scope.exportProfile = function () {
		$uibModal.open({
			controller: 'exportController',
			templateUrl: 'views/modal-export.html',
			size: 'lg',
			resolve: {
				currentProfile: function() {
					return $scope.currentProfile;
				}
			}
		});
	};

	$scope.shareUrl = function() {
		if ($scope.currentProfile.id)
			return $state.href('editor', { id: $scope.currentProfile.id }, { absolute: true });
		else
			return "Not Shared";
	};

	$scope.copiedSuccess = function(e) {
		$scope.copiedTooltipOpen = true;
		$scope.copiedTooltipText = "Copied!";
	};
	
	$scope.copiedError = function(e) {
		$scope.copiedTooltipOpen = true;
		$scope.copiedTooltipText = "Not supported. Use native copy function.";
	};

	var markDirty = function(newVal, oldVal) {
		if (newVal === oldVal) return; // Skip on initialization
		if ($scope.currentProfile.id) {
			$scope.currentProfile.parentId = $scope.currentProfile.id;
			$scope.currentProfile.id = null;
		}
		$scope.$emit('profileChanged', $scope.currentProfile);
	};

	if (sharedProfile) {
		$scope.currentProfile = sharedProfile;
	}
	else {
		$scope.currentProfile = new Profile();
	}
	
	$scope.editorProfile = [];
	angular.forEach(ProfileDataKeys, function (propName, index) {
		$scope.editorProfile.push({ name: propName, label: ProfileColorNames[index], index: index, color: tinycolor($scope.currentProfile.data[propName]) });
	});
	$scope.currentColor = $scope.editorProfile[0];

	// Selected color within profile changed
	$scope.$watch("currentColor.color", function () {
		$scope.currentProfile.data[$scope.currentColor.name] = $scope.currentColor.color.toRgbString();
	});
	$scope.$watch("currentProfile", markDirty, true);

}]);
