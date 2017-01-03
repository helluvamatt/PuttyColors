angular.module('puttycolors.directives', [])

.directive('dateNow', ['$filter', function ($filter) {
	return function (scope, element, attrs) {
		element.text($filter('date')(new Date(), attrs.dateNow));
	};
}])

.directive('resolveLoader', ['$rootScope', '$timeout', '$log', function ($rootScope, $timeout, $log) {
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
			$rootScope.$on("appFatalException", hideLoader);
		}
	};
}])

.directive('previewStyle', ['profileService', 'exportService', function (profileService, exportService) {

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