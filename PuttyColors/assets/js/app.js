angular.module('puttycolors.app', ['ngAnimate', 'ui.bootstrap', 'ui.router', 'puttycolors.svc.alerts', 'puttycolors.svc.profiles', 'puttycolors.svc.export', 'puttycolors.controllers', 'puttycolors.directives', 'puttycolors.cfg.exports', 'puttycolors.cfg.imports'])

.factory('$exceptionHandler', ['$injector', function ($injector) {
	return function (exception, cause) {
		var $rootScope = $injector.get('$rootScope');
		var $log = $injector.get("$log");
		$log.error(exception, cause);
		$rootScope.$broadcast("appFatalException", exception, cause);
	};
}])

.config(['$stateProvider', '$locationProvider', '$qProvider', function ($stateProvider, $locationProvider, $qProvider) {

	// Important: Work around "Possibly unhandled rejection" in ui-router for resolves
	$qProvider.errorOnUnhandledRejections(false);

	$locationProvider.html5Mode(true);

	$stateProvider.state('profiles', {
		url: '/profiles',
		templateUrl: 'views/profiles.html',
		controller: 'profilesController',
		resolve: {
			profileService: "profileService",
			presets: function (profileService) { return profileService.getPresets(); }
		}
	});
	$stateProvider.state('about', {
		url: '/about',
		templateUrl: 'views/about.html',
		active: 'about',
	});
	$stateProvider.state('editor', {
		url: '/:id',
		templateUrl: 'views/editor.html',
		controller: 'editorController',
		active: 'editor',
		resolve: {
			sharedProfile: ['$stateParams', 'shareService', function ($stateParams, shareService) {
				if ($stateParams.id)
					return shareService.getSharedProfile($stateParams.id).catch(function () {
						throw "Invalid shared profile.";
					});
			}]
		}
	});
}])

.controller('mainController', ['$scope', 'profileService', 'alertService', function ($scope, profileService, alertService) {
	$scope.getCurrentAlerts = function () {
		return alertService.currentAlerts;
	};

	$scope.closeAlert = function (index) {
		alertService.closeAlert(index);
	};

	$scope.isMainNavCollapsed = true;
	$scope.currentProfile = profileService.currentProfile;
	$scope.$watch(function () { return profileService.currentProfile }, function () { $scope.currentProfile = profileService.currentProfile; });
}])

.run(['$rootScope', 'alertService', function ($rootScope, alertService) {
	$rootScope.$on("appFatalException", function (event, exception, cause) {
		alertService.alert(new Alert(exception, AlertTypes.Error, "Fatal Error Occurred"));
	});
	$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
		alertService.alert(new Alert(error, AlertTypes.Error, "Error", 0, true));
	});
}]);
