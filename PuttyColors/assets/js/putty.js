var app = angular.module('puttycolorsApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'puttycolors-alerts', 'puttycolors-profiles', 'puttycolors-editor', 'puttycolors-exports']);

app.directive('dateNow', ['$filter', function ($filter) {
	return function (scope, element, attrs) {
        element.text($filter('date')(new Date(), attrs.dateNow));
	};
}]);

app.directive('action', ['$location', function ($location) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.on('click', function () {
				window.location.hash = "#!" + attrs.action;
			});
		}

	};
}]);

app.directive('resolveLoader', ['$rootScope', '$timeout', '$log', function ($rootScope, $timeout, $log) {
	return {
		restrict: 'A',
		link: function (scope, element) {

			var timeout;

			$rootScope.$on('$routeChangeStart', function (event, currentRoute, previousRoute) {
				if (!timeout) {
					timeout = $timeout(function () {
						element.removeClass('ng-hide');
					}, 200);
				}
			});

			$rootScope.$on('$routeChangeSuccess', function () {
				if (timeout) $timeout.cancel(timeout);
				element.addClass('ng-hide');
			});

			$rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
				if (timeout) $timeout.cancel(timeout);
				element.addClass('ng-hide');
				$log.error("routeChangeError: %O", rejection);
				$rootScope.$broadcast(AlertEvents.ShowAlert, { title: "Error", message: "An error occurred during the request.", type: "danger" });
			});
		}
	};
}]);

app.directive('previewStyle', ['profileService', 'exportService', function (profileService, exportService) {

	return {
		restrict: 'A',
		link: function (scope, element) {
			scope.$watch(function() { return profileService.currentProfile; }, function() { 
				var code = exportService.render('views/exports/preview_style.css', profileService.currentProfile);
				element.html(code);
			}, true);	
		}
	}
}]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
		templateUrl: 'views/modal-import.html',
		controller: 'importController',
		active: 'import'
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

app.controller('importController', ['$scope', function ($scope) {
	$scope.$root.$broadcast(AlertEvents.ShowAlert, { title: "Error", message: "This is not implemented.", type: "danger" });
	// TODO Import controller
}]);

app.controller('mainController', ['$scope', '$route', function ($scope, $route) {

	$scope.isActive = function (navItem) {
		return $route.current && $route.current.active == navItem;
	};

	// TODO Main controller
}]);
