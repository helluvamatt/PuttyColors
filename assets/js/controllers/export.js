angular.module('puttycolors.controllers.export', ['puttycolors.svc.export'])

.controller('exportController', ['$scope', 'exportService', 'currentProfile', function ($scope, exportService, currentProfile) {

	$scope.currentProfile = currentProfile;

	$scope.$watch('selectedTemplate', function () {
		if ($scope.selectedTemplate)
			$scope.code = exportService.render($scope.selectedTemplate.name, $scope.currentProfile);
	});

	$scope.templates = exportService.getExportList();
	if ($scope.templates.length > 0)
		$scope.selectedTemplate = $scope.templates[0];

}]);