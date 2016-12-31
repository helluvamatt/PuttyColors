var app = angular.module('puttycolorsApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'puttycolors-alerts', 'puttycolors-profiles', 'puttycolors-editor', 'puttycolors-exports']);

app.factory('$exceptionHandler', ['$injector', function ($injector) {
	return function (exception, cause) {
		var $rootScope = $injector.get('$rootScope');
		var $log = $injector.get("$log");
		$log.error(exception, cause);
		$rootScope.$broadcast(AlertEvents.FatalException, exception, cause);
	};
}]);

app.directive('dateNow', ['$filter', function ($filter) {
	return function (scope, element, attrs) {
        element.text($filter('date')(new Date(), attrs.dateNow));
	};
}]);

app.directive('navAction', ['$location', function ($location) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.on('click', function () {
				scope.$apply(function () {
					$location.path(attrs.navAction);
				});
			});
		}
	};
}]);

app.directive('resolveLoader', ['$rootScope', '$timeout', '$log', function ($rootScope, $timeout, $log) {
	return {
		restrict: 'A',
		link: function (scope, element) {

			var timeout;

			var hideLoader = function () {
				if (timeout) $timeout.cancel(timeout);
				element.addClass('ng-hide');
			};

			$rootScope.$on('$routeChangeStart', function (event, currentRoute, previousRoute) {
				if (!timeout) {
					timeout = $timeout(function () {
						element.removeClass('ng-hide');
					}, 200);
				}
			});

			$rootScope.$on('$routeChangeSuccess', hideLoader);
			$rootScope.$on('$routeChangeError', hideLoader);
			$rootScope.$on(AlertEvents.FatalException, hideLoader);
		}
	};
}]);

app.directive('previewStyle', ['profileService', 'exportService', function (profileService, exportService) {

	return {
		restrict: 'A',
		link: function (scope, element) {
			scope.$watch(function () { return profileService.currentProfile; }, function () {
				var code = exportService.render('views/exports/preview_style.css', profileService.currentProfile);
				element.html(code);
			}, true);	
		}
	}
}]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider.when("/presets", {
		templateUrl: 'views/presets.html',
		controller: 'presetsController',
		active: 'presets',
		resolve: {
			profileService: "profileService",
			presets: function (profileService) { return profileService.getPresets(); }
		}
	});
	$routeProvider.when("/import", {
		//templateUrl: 'views/modal-import.html',
		template: '',
		controller: 'importController',
		active: 'import',
	});
	$routeProvider.when("/export", {
		templateUrl: 'views/modal-export.html',
		controller: 'exportController',
		active: 'export'
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
}]);

app.controller('presetsController', ['$scope', '$location', 'profileService', 'presets', function ($scope, $location, profileService, presets) {
	$scope.presets = presets;
	$scope.profileDataKeys = ProfileDataKeys;
	$scope.profileColorNames = ProfileColorNames;

	$scope.loadPreset = function (index) {
		profileService.currentProfile = $scope.presets[index];
		$location.path("/");
	};
}]);

app.controller('importController', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
	$scope.$root.$broadcast(AlertEvents.ShowAlert, new Alert("This is not implemented", "Error", AlertTypes.Error));
	$timeout(function () {
		$location.path("/");
	}, 10);

	// TODO Import controller
	var registryImportRegex = /^([ -~]+?)\s*\=\s*\"(\d{1,3})\,(\d{1,3})\,(\d{1,3})\"$/gm;
}]);

app.controller('mainController', ['$scope', '$route', function ($scope, $route) {
	$scope.isActive = function (navItem) {
		return $route.current && $route.current.active == navItem;
	};

	$scope.isMainNavCollapsed = true;
}]);
