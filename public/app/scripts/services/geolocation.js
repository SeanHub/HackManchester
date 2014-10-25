angular.module('app').factory('geolocation', function () {
	var location = {};
	
	location.getLocation = function (callback) {
		navigator.geolocation.getCurrentPosition(function (data) {
			callback(data);
		});
	};
	
	location.watchLocation = function () {
		return false;
	};
	
	return location;
});