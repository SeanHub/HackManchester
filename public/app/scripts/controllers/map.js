angular.module('app').controller('map', ['$scope', '$http', 'events', 'geolocation', 'GoogleMapApi'.ns(),
	function ($scope, $http, events, geolocation, GoogleMapApi) {
		$scope.eventList = events.events;

		$scope.map = {
			center: {
				latitude: null,
				longitude: null
			},
			control: {},
			events: {
				idle: function (map) {
					
				}
			},
			options: {
				streetViewControl: false
			},
			zoom: 12
		};

		$scope.createGroupEvent = function () {
			geolocation.getLocation(function (data) {
				addEvent(data.coords.latitude, data.coords.longitude);
			});
		};

		geolocation.getLocation(function (data) {
			$scope.map.center.latitude = data.coords.latitude;
			$scope.map.center.longitude = data.coords.longitude;
		});

		//$scope.map.control.refresh();
		/*$scope.map.control.getGMap().addListener('idle', function () {
			$scope.map.control.refresh();
		});*/
}]);