var mod = angular.module('puttycolors-exports', ['puttycolors-profiles', 'puttycolors.exports.windows_registry', 'puttycolors.exports.preview_style']);

mod.factory('exportService', ['$interpolate', '$rootScope', function ($interpolate, $rootScope) {

	var templates = {};

	var register = function (name, title, template, hidden) {
		templates[name] = { name: name, title: title, template: template, hidden: !!hidden };
	};

	var render = function(templateName, profile) {
		if (templates[templateName]) {
			var scope = angular.extend({}, profile, {
				getColor: function (propName) {
					return tinycolor(profile.data[propName]);
				}
			});
			return $interpolate(templates[templateName].template)(scope);
		}
	}

	var getExportList = function() {
		var exportTemplates = [];
		angular.forEach(templates, function (tpl) {
			if (!tpl.hidden)
				exportTemplates.push({name: tpl.name, title: tpl.title});
		});

		return exportTemplates;
	};

	return {
		register: register,
		render: render,
		getExportList: getExportList
	};

}]);

mod.controller('exportController', ['$scope', 'profileService', 'exportService', function ($scope, profileService, exportService) {

	$scope.profileName = profileService.currentProfile.name;
	$scope.authorName = profileService.currentProfile.author;
	$scope.authorUrl = profileService.currentProfile.url;

	$scope.$watch('selectedTemplate', function () {
		if ($scope.selectedTemplate)
			$scope.code = exportService.render($scope.selectedTemplate.name, profileService.currentProfile);
	});

	$scope.templates = exportService.getExportList();
	if ($scope.templates.length > 0)
		$scope.selectedTemplate = $scope.templates[0];

}]);