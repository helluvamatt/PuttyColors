function ExportService($interpolate, $rootScope) {

	var templates = {};

	this.register = function (name, title, template, hidden) {
		templates[name] = { name: name, title: title, template: template, hidden: !!hidden };
	};

	this.render = function(templateName, profile) {
		if (templates[templateName]) {
			var scope = angular.extend({}, Profile.prototype, profile, {
				getColor: function (propName) {
					return tinycolor(profile.data[propName]);
				}
			});
			return $interpolate(templates[templateName].template)(scope);
		}
	};

	this.getExportList = function () {
		var exportTemplates = [];
		angular.forEach(templates, function (tpl) {
			if (!tpl.hidden)
				exportTemplates.push({ name: tpl.name, title: tpl.title });
		});

		return exportTemplates;
	};
}

angular.module('puttycolors.svc.export', []).service('exportService', ['$interpolate', '$rootScope', ExportService]);
