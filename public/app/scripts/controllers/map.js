angular.module('app').controller('map', ['$scope', '$http', 'events', 'geolocation', 'GoogleMapApi'.ns(),
	function ($scope, $http, events, geolocation, GoogleMapApi) {
		$scope.eventList = events.events;
		
		$scope.map = {
			center: {
				latitude: null,
				longitude: null
			},
			zoom: 12
		};
		
		$scope.addEvent = function (lat, lon) {
			events.addEvent({lat: lat, lon: lon});
		};

		geolocation.getLocation(function (data) {
			$scope.map.center.latitude = data.coords.latitude;
			$scope.map.center.longitude = data.coords.longitude;
		});
}]);