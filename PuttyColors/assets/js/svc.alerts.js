var AlertTypes = {
	Info: "info",
	Warn: "warning",
	Success: "success",
	Error: "danger"
};

function Alert(message, type, title, timeout, clearOnStateChange) {
	if (message) this.message = message;
	if (type) this.type = type;
	if (title) this.title = title;
	if (timeout) this.timeout = timeout;
	if (clearOnStateChange) this.clearOnStateChange = true;
}
Alert.prototype.message = "";
Alert.prototype.title = "";
Alert.prototype.type = AlertTypes.Warn;
Alert.prototype.timeout = null;
Alert.prototype.clearOnStateChange = false;

function AlertService($rootScope) {
	var that = this;
	$rootScope.$on('$stateChangeStart', function () {
		var index = that.currentAlerts.length;
		while (index--) {
			if (that.currentAlerts[index].clearOnStateChange) that.closeAlert(index);
		}
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
