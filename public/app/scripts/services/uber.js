angular.module('app').factory('uber', function ($http) {

	console.log("test");

	var uber = {};

	uber.getTime = function(callback) {
		$http.defaults.headers.common.Authorization = "Token x8yQCeBVqYLqtvBw4EmdlXYTrjyCvFJRIpMQtVwC";

		navigator.geolocation.getCurrentPosition(function (data) {
			console.log("MY POSITION");
			console.log(data);
			$http.get('https://api.uber.com/v1/estimates/time?start_latitude=' + data.coords.latitude + '&start_longitude=' + data.coords.longitude + '').success(function (d) {
				console.log("DATTTTTA");console.log(d);
				var times = d.times;
				callback(times);
			});
		});

		
	};

	uber.getPrice = function(latitude, longitude, callback){
		$http.defaults.headers.common.Authorization = "Token gSXzeOOffHJuXrh3S22-G4ebQoeEO7RKJjJ16gDS";

		navigator.geolocation.getCurrentPosition(function (data) {
			$http.get('https://api.uber.com/v1/estimates/price?start_latitude=' 
				+ data.coords.latitude + '&start_longitude=' 
				+ data.coords.longitude + '&end_latitude='
				+ longitude + '&end_longitude='
				+ latitude + '').success(function (d) {
				console.log(d);
				callback(d);
			});
		});
	};

	

	return uber;
});