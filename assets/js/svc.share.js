function ShareService($http, jsonValidator) {

	var endpoint = 'https://api.myjson.com/bins';

	this.shareProfile = function (profile) {
		return $http({
			method: 'POST',
			url: endpoint,
			data: profile
		}).then(function (response) {
			return String.prototype.substr.call(response.data.uri, endpoint.length + 1);
		});
	};

	this.getSharedProfile = function (id) {
		return $http({
			method: 'GET',
			url: endpoint + '/' + id,
		}).then(function (response) {
			return jsonValidator.validateJson(response.data, 'schemas/Profile.json');
		}).then(function (validatedData) {
			return angular.extend(new Profile(), validatedData);
		});
	};
}

function PublishService($http) {
	this.publish = function(profile, parentId) {
		// parentId is optional
		if (angular.isDefined(parentId)) profile.parentId = parentId;
		return $http({
			method: 'POST',
			url: 'api/publish',
			data: profile
		}).then(function(response) {
			profile.publishId = response.data.id;
		});
	};

	this.getPublishedProfile = function(id) {
		return $http({
			method: 'GET',
			url: 'api/publish/' + id
		}).then(function(response) {
			return angular.extend(new Profile(), response.data);
		});
	};

	this.getForks = function(id) {
		return $http({
			method: 'GET',
			url: 'api/forks/' + id
		}).then(function(response) {
			var retVal = [];
			angular.forEach(response.data, function(value) {
				retVal.push(angular.extend(new Profile(), value));
			});
			return retVal;
		});
	};
}

angular.module('puttycolors.svc.share', ['bt.jsonValidator'])
	.service('shareService', ['$http', 'jsonValidator', ShareService])
	.service('publishService', ['$http', PublishService])
	.run(['jsonSchemaCache', function (jsonSchemaCache) {
		jsonSchemaCache.put('schemas/Profile.json', '{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{"name":{"type":"string"},"sessionName":{"type":"string"},"author":{"type":"string"},"url":{"type":"string"},"type":{"type":"string"},"data":{"type":"object","properties":{"colour0":{"type":"string"},"colour1":{"type":"string"},"colour2":{"type":"string"},"colour3":{"type":"string"},"colour4":{"type":"string"},"colour5":{"type":"string"},"colour6":{"type":"string"},"colour7":{"type":"string"},"colour8":{"type":"string"},"colour9":{"type":"string"},"colour10":{"type":"string"},"colour11":{"type":"string"},"colour12":{"type":"string"},"colour13":{"type":"string"},"colour14":{"type":"string"},"colour15":{"type":"string"},"colour16":{"type":"string"},"colour17":{"type":"string"},"colour18":{"type":"string"},"colour19":{"type":"string"},"colour20":{"type":"string"},"colour21":{"type":"string"}},"required":["colour0","colour1","colour2","colour3","colour4","colour5","colour6","colour7","colour8","colour9","colour10","colour11","colour12","colour13","colour14","colour15","colour16","colour17","colour18","colour19","colour20","colour21"]}},"required":["name","sessionName","author","url","type","data"]}');
	}]);