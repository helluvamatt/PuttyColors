angular.module('puttycolors.cfg.imports', ['puttycolors.svc.import']).run(['importService', function (importService) {

	// TODO Import defs (Windows Registry)
	var registryImportRegex = /^([ -~]+?)\s*\=\s*\"(\d{1,3})\,(\d{1,3})\,(\d{1,3})\"$/gm;

	importService.register('json', "JSON", function (data) {
		// TODO Validate against schema
		return angular.extend(new Profile(), angular.fromJson(data));
	});

}]);