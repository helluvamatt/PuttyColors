var module = angular.module('puttycolors-alerts', ['ngAnimate']);

var AlertEvents = {
	ShowAlert: "AlertEvents.ShowAlert",
};

function AlertService($rootScope) {
	var that = this;
	$rootScope.$on(AlertEvents.ShowAlert, function (event, alert) {
		that.currentAlerts.push(alert);
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