var module = angular.module('puttycolors-alerts', ['ngAnimate']);

var AlertEvents = {
	ShowAlert: "AlertEvents.ShowAlert",
	FatalException: "AlertEvents.FatalException"
};

var AlertTypes = {
	Info: "info",
	Warn: "warning",
	Success: "success",
	Error: "danger"
};

function Alert(message, title, type, closeHandler, acceptHandler, declineHandler) {
	if (message) this.message = message;
	if (title) this.title = title;
	if (type) this.type = type;
	if (closeHandler) this.closeHandler = closeHandler;
	if (acceptHandler) this.acceptHandler = acceptHandler;
	if (declineHandler) this.declineHandler = declineHandler;
}
Alert.prototype.message = "";
Alert.prototype.title = "";
Alert.prototype.type = AlertTypes.Info;
Alert.prototype.closeHandler = null;
Alert.prototype.acceptHandler = null;
Alert.prototype.declineHandler = null;

function AlertService($rootScope) {
	var that = this;
	$rootScope.$on(AlertEvents.ShowAlert, function (event, alert) {
		that.currentAlerts.push(alert);
	});
	$rootScope.$on(AlertEvents.FatalException, function (event, exception, cause) {
		that.currentAlerts.push(new Alert(exception, "Fatal Error Occurred", AlertTypes.Error));
	});
	$rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
		that.currentAlerts.push(new Alert(rejection, "Error", AlertTypes.Error));
	});
};
AlertService.prototype.currentAlerts = [];
AlertService.prototype.closeAlert = function close(index) {
	var alert = this.currentAlerts[index];
	if (alert) {
		if (alert.closeHandler) alert.closeHandler();
		this.currentAlerts.splice(index, 1);
	}
};

AlertService.prototype.accept = function accept(index) {
	var alert = this.currentAlerts[index];
	if (alert && alert.acceptHandler) alert.acceptHandler();
	this.closeAlert(index);
};

AlertService.prototype.decline = function decline(index) {
	var alert = this.currentAlerts[index];
	if (alert && alert.declineHandler) alert.declineHandler();
	this.closeAlert(index);
};

module.service('alertService', ['$rootScope', AlertService]);

module.controller('alertController', ['$scope', 'alertService', function ($scope, alertService) {
	$scope.getCurrentAlerts = function () {
		return alertService.currentAlerts;
	};

	$scope.close = function (index) {
		alertService.closeAlert(index);
	};

	$scope.accept = function (index) {
		alertService.accept(index);
	};

	$scope.decline = function (index) {
		alertService.decline(index);
	};
}]);

module.directive('alertContainer', [function () {
	return {
		restrict: "A",
		templateUrl: 'views/alerts.html',
		controller: 'alertController',
	};
}]);