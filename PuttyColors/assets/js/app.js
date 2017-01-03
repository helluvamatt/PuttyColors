angular.module('puttycolors.app', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'puttycolors.svc.alerts', 'puttycolors.svc.profiles', 'puttycolors.svc.export', 'puttycolors.controllers', 'puttycolors.directives', 'puttycolors.cfg.exports'])

.factory('$exceptionHandler', ['$injector', function ($injector) {
	return function (exception, cause) {
		var $rootScope = $injector.get('$rootScope');
		var $log = $injector.get("$log");
		$log.error(exception, cause);
		$rootScope.$broadcast("appFatalException", exception, cause);
	};
}])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider.when("/profiles", {
		templateUrl: 'views/profiles.html',
		controller: 'profilesController',
		active: 'profiles',
		resolve: {
			profileService: "profileService",
			presets: function (profileService) { return profileService.getPresets(); }
		}
	});
	$routeProvider.when("/about", {
		templateUrl: 'views/about.html',
		active: 'about',
	});
	// TODO Share routes
	$routeProvider.when("/", {
		templateUrl: 'views/editor.html',
		controller: 'editorController',
		active: 'editor'
	});
	$routeProvider.otherwise("/"); // redirectTo
}])

.controller('mainController', ['$scope', '$route', 'profileService', 'alertService', function ($scope, $route, profileService, alertService) {
	$scope.isActive = function (navItem) {
		return $route.current && $route.current.active == navItem;
	};

	$scope.getCurrentAlerts = function () {
		return alertService.currentAlerts;
	};

	$scope.closeAlert = function (index) {
		alertService.closeAlert(index);
	};

	$scope.isMainNavCollapsed = true;
	$scope.currentProfile = profileService.currentProfile;
	$scope.$watch(function () { return profileService.currentProfile }, function () { $scope.currentProfile = profileService.currentProfile; });
}]);
