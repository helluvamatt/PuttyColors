(function (angular) {
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

	var module = angular.module('puttycolors-tinycolor', []);
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
})(window.angular);