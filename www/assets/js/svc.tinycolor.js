(function (angular, tinycolor) {
	var modes = {
		"hue": {
			method: "toHsv",
			objProp: "h",
			range: [0, 360],
			step: 1
		},
		"saturation": {
			method: "toHsv",
			objProp: "s",
			range: [0, 1],
			step: 0.01
		},
		"value": {
			method: "toHsv",
			objProp: "v",
			range: [0, 1],
			step: 0.01
		},
		"lightness": {
			method: "toHsl",
			objProp: "l",
			range: [0, 1],
			step: 0.01
		},
		"red": {
			method: "toRgb",
			objProp: "r",
			range: [0, 255],
			step: 1
		},
		"green": {
			method: "toRgb",
			objProp: "g",
			range: [0, 255],
			step: 1
		},
		"blue": {
			method: "toRgb",
			objProp: "b",
			range: [0, 255],
			step: 1
		},
		"rgb": {
			method: "toRgbString"
		},
		"hex": {
			method: "toHexString"
		},
		"hex8": {
			method: "toHex8String"
		}
	};

	function clamp(newVal, min, max) {
		if (newVal < min) return min;
		if (newVal > max) return max;
		return newVal;
	}

	var module = angular.module('puttycolors.svc.tinycolor', ['puttycolors.svc.tinycolor.tpls']);

	module.directive('colorValue', [function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, modelCtrl) {

				var modeName = attrs['colorValue'] || "rgb";
				var mode = modes[modeName];

				if (!angular.isDefined(mode)) return;

				modelCtrl.$formatters.push(function (modelValue) {
					var result = modelValue[mode.method]();
					if (angular.isDefined(mode.objProp) && angular.isDefined(result[mode.objProp])) {
						result = result[mode.objProp];
					}
					return result;
				});

				modelCtrl.$parsers.push(function (viewValue) {
					if (angular.isDefined(mode.objProp)) {
						var result = modelCtrl.$modelValue[mode.method]();
						result[mode.objProp] = parseFloat(viewValue);
						viewValue = result;
					}
					var newColor = tinycolor(viewValue);
					if (newColor.isValid()) return newColor;
					return modelCtrl.$modelValue;
				});
			}
		};
	}]);

	module.directive("colorComponentSpinner", [function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			templateUrl: 'views/color-component-spinner.html',
			scope: {
				fieldId: "@"
			},
			link: function (scope, element, attrs, modelCtrl) {
				var modeName = attrs["colorComponentSpinner"];
				if (!angular.isDefined(modeName)) return;
				var mode = modes[modeName];
				if (!angular.isDefined(mode)) return;
				if (!angular.isDefined(mode.objProp) || !angular.isDefined(mode.range) || !angular.isDefined(mode.step)) return;

				scope.readOnly = 'readOnly' in attrs;

				modelCtrl.$render = function () {
					scope.value = modelCtrl.$viewValue;
				};
				scope.$watch('value', function (newValue) {
					modelCtrl.$setViewValue(newValue);
				});

				scope.increase = function () {
					scope.value = clamp(scope.value + mode.step, mode.range[0], mode.range[1]);
				};

				scope.decrease = function () {
					scope.value = clamp(scope.value - mode.step, mode.range[0], mode.range[1]);
				};

				scope.keyDown = function ($event) {
					if ($event.keyCode == 38 || $event.keyCode == 39) scope.increase();
					else if ($event.keyCode == 37 || $event.keyCode == 40) scope.decrease();
				};
			}
		}
	}]);

	angular.module('puttycolors.svc.tinycolor.tpls', []).run(['$templateCache', function ($templateCache) {

		$templateCache.put('views/color-component-spinner.html',
			'<div class="input-group">' +
			'  <span class="input-group-btn">' +
			'    <button class="btn btn-default" type="button" aria-label="Decrease" ng-click="decrease()">' +
			'      <i class="fa fa-minus" aria-hidden="true"></i>' +
			'    </button>' +
			'  </span>' +
			'  <input ng-attr-id="{{fieldId}}" type="text" class="form-control center" ng-model="value" ng-readonly="readOnly" ng-keydown="keyDown($event)" />' +
			'  <span class="input-group-btn">' +
			'    <button class="btn btn-default" type="button" aria-label="Increase" ng-click="increase()">' +
			'      <i class="fa fa-plus" aria-hidden="true"></i>' +
			'    </button>' +
			'  </span>' +
			'</div>');
	}]);


})(window.angular, window.tinycolor);