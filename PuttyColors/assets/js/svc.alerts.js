var AlertTypes = {
	Info: "info",
	Warn: "warning",
	Success: "success",
	Error: "danger"
};

function Alert(message, type, title, timeout) {
	if (message) this.message = message;
	if (type) this.type = type;
	if (title) this.title = title;
	if (timeout) this.timeout = timeout;
}
Alert.prototype.message = "";
Alert.prototype.title = "";
Alert.prototype.type = AlertTypes.Warn;
Alert.prototype.timeout = null;

function AlertService($rootScope) {
	var that = this;
	$rootScope.$on("appFatalException", function (event, exception, cause) {
		that.alert(new Alert(exception, AlertTypes.Error, "Fatal Error Occurred"));
	});
	$rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
		that.alert(new Alert(rejection, AlertTypes.Error, "Error"));
	});
};
AlertService.prototype.currentAlerts = [];
AlertService.prototype.closeAlert = function close(index) {
	if (index > -1 && index < this.currentAlerts.length)
		this.currentAlerts.splice(index, 1);
};

AlertService.prototype.alert = function alert(alert) {
	this.currentAlerts.push(alert);
};

angular
	.module('puttycolors.svc.alerts', ['ui.bootstrap'])
	.service('alertService', ['$rootScope', AlertService]);
