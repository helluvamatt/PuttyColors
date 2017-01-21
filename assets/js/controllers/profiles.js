angular.module('puttycolors.controllers.profiles', ['ui.bootstrap', 'puttycolors.svc.profiles'])

.controller('profilesController', ['$scope', '$state', '$uibModal', 'profiles', 'profilesCount', function ($scope, $state, $uibModal, profiles, profilesCount) {
	$scope.profiles = profiles;
	$scope.profilesCount = profilesCount;
	$scope.profileDataKeys = ProfileDataKeys;
	$scope.profileColorNames = ProfileColorNames;
	$scope.page = 1;
	$scope.pageSize = 10;

	$scope.newProfile = function () {
		$state.go('editor');
	};

	$scope.importProfile = function () {
		$uibModal.open({
			controller: 'importController',
			templateUrl: 'views/modal-import.html',
			size: 'lg'
		});
	};

	$scope.$watch('page', function() {
		$scope.loading = true;
		$scope.loadProfiles($scope.page, $scope.pageSize).then(function(result) {
			$scope.profiles = result;
		}, function(rejection) {
			$scope.error = rejection;
		}).finally(function() {
			$scope.loading = false;
		});
	});

	$scope.exportProfile = function (index) {
		$uibModal.open({
			controller: 'exportController',
			templateUrl: 'views/modal-export.html',
			size: 'lg',
			resolve: {
				currentProfile: $scope.profiles[index]
			}
		});
	};

	$scope.loadProfile = function (index) {
		$state.go('editor', {id: $scope.profiles[index].id});
	};

	$scope.deleteProfile = function (index) {
		if (!$scope.canDelete) return;
		var profile = $scope.profiles[index];
		$uibModal.open({
			templateUrl: "views/modal-confirm.html",
			scope: angular.extend($scope.$root.$new(), {
				message: 'Are you sure you want to delete this profile?',
				modalContext: 'danger'
			}),
		}).result.then(function (result) {
			if (result) profileService.deleteProfile(profile.name);
		});

	};
}]);
