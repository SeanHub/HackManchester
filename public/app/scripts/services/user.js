angular.module('app').factory('user', function ($rootScope, $http) {
	var userService = {};


	userService.createUser = function(){
		$http.get('/api/getEvents').success(function (data) {
			data.forEach(function (i) {
				fEvent.addEvent({name: i.name, lat: i.coordinates.lat, lon: i.coordinates.lon});
			});
		});
	};

	userService.getUser = function() {
		$http.get('/api/getUser/').success(function (data) {
			data.forEach(function (i) {
				fEvent.addEvent({name: i.name, lat: i.coordinates.lat, lon: i.coordinates.lon});
			});
		});
	};

	

	

	return userService;
});