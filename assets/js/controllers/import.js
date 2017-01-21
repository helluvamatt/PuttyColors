angular.module('puttycolors.controllers.import', ['puttycolors.svc.profiles', 'puttycolors.svc.import'])

.controller('importController', ['$scope', 'profileService', 'importService', function ($scope, profileService, importService) {

	$scope.parsers = importService.getParsers();
	if ($scope.parsers.length > 0) $scope.selectedParser = $scope.parsers[0];
	$scope.importData = '';

	$scope.import = function () {
		try {
			var profile = importService.parse($scope.selectedParser.name, $scope.importData);
			if (profile) {
				profileService.saveProfile(profile);
			}
			$scope.$close(true);
		}
		catch (e) {
			$scope.error = e;
		}
	};
}]);