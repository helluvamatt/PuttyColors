function ImportService() {
	var parsers = {};

	this.register = function (name, title, parserCallback, hidden) {
		parsers[name] = { name: name, title: title, parserCallback: parserCallback, hidden: !!hidden };
	};

	this.getParsers = function () {
		var parserDesc = [];
		angular.forEach(parsers, function (parser) {
			if (!parser.hidden)
				parserDesc.push({ name: parser.name, title: parser.title });
		});
		return parserDesc;
	};

	this.parse = function (parserName, data) {
		if (parserName in parsers) {
			return parsers[parserName].parserCallback(data);
		}
	};
}

angular.module('puttycolors.svc.import', []).service('importService', [ImportService]);