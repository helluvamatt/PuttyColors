angular.module('puttycolors.app', ['ngAnimate', 'ui.bootstrap', 'ui.router', 'puttycolors.svc.alerts', 'puttycolors.svc.profiles', 'puttycolors.svc.export', 'puttycolors.controllers', 'puttycolors.directives', 'puttycolors.cfg.exports', 'puttycolors.cfg.imports'])

.factory('$exceptionHandler', ['$injector', function ($injector) {
	return function (exception, cause) {
		var $rootScope = $injector.get('$rootScope');
		var $log = $injector.get("$log");
		$log.error(exception, cause);
		$rootScope.$broadcast("appFatalException", exception, cause);
	};
}])

.config(['$stateProvider', '$locationProvider', '$qProvider', '$uibTooltipProvider', function ($stateProvider, $locationProvider, $qProvider, $uibTooltipProvider) {

	// Important: Work around "Possibly unhandled rejection" in ui-router for resolves
	$qProvider.errorOnUnhandledRejections(false);

	$locationProvider.html5Mode(true);

	$stateProvider.state('browse', {
		url: '/browse',
		templateUrl: 'views/profiles.html',
		controller: 'browseController',
		resolve: {
			profileService: "profileService",
			profiles: function (profileService) { return profileService.getPublicProfiles(1); },
			profilesCount: function(profileService) { return profileService.getCountPublicProfiles(); },
		}
	});
	$stateProvider.state('myprofiles', {
		url: '/myprofiles',
		tempalteUrl: 'views/profiles.html',
		controller: 'myProfilesController',
		resolve: {
			profileService: "profileService",
			profiles: function (profileService) { return profileService.getMyProfiles(1); },
			profilesCount: function(profileService) { return profileService.getCountMyProfiles(); }
		}
	});
	$stateProvider.state('about', {
		url: '/about',
		templateUrl: 'views/about.html'
	});
	$stateProvider.state('editor', {
		url: '/:id',
		templateUrl: 'views/editor.html',
		controller: 'editorController',
		resolve: {
			sharedProfile: ['$stateParams', 'profileService', function ($stateParams, profileService) {
				if ($stateParams.id) {
					return profileService.getProfile($stateParams.id).catch(function () {
						throw "Invalid shared profile.";
					});
				}
			}]
		}
	});
	
	$uibTooltipProvider.options({appendToBody: true});
}])

.controller('mainController', ['$scope', 'alertService', function ($scope, alertService) {
	$scope.getCurrentAlerts = function () {
		return alertService.currentAlerts;
	};

	$scope.closeAlert = function (index) {
		alertService.closeAlert(index);
	};

	$scope.isMainNavCollapsed = true;
}])

.run(['$rootScope', 'alertService', function ($rootScope, alertService) {
	$rootScope.$on("appFatalException", function (event, exception, cause) {
		alertService.alert(new Alert(exception, AlertTypes.Error, "Fatal Error Occurred"));
	});
	$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
		alertService.alert(new Alert(error, AlertTypes.Error, "Error", 0, true));
	});
}]);
