angular.module('app').controller('map', ['$scope', '$http', 'geolocation', 'GoogleMapApi'.ns(),
	function ($scope, $http, geolocation, GoogleMapApi) {
		$scope.events = [];

		$scope.map = {
			center: {
				latitude: null,
				longitude: null
			},
			zoom: 12
		};

		geolocation.getLocation(function (data) {
			$scope.map.center.latitude = data.coords.latitude;
			$scope.map.center.longitude = data.coords.longitude;
		});

		$scope.createGroupEvent = function() {
			geolocation.getLocation(function(data) {
				addEvent(data.coords.latitude, data.coords.longitude);
			});
		};

		$scope.addEvent = function (lat, lon) {
			$scope.createEvent(lat, lon);
		};

		$scope.createEvent = function (lat, lon) {
			$scope.events.push({
				marker: {
					coords: {
						latitude: lat,
						longitude: lon
					},
					id: $scope.events.length
				},
				circle: {
					center: {
						latitude: lat,
						longitude: lon
					},
					radius: 700,
					stroke: {
						color: '#b20808',
						weight: 2,
						opacity: 0.5
					},
					fill: {
						color: '#f22828',
						opacity: 0.3
					},
					id: $scope.events.length
				}
			});
		};

		$http.get('/api/getEvents').success(function (data) {
			data.forEach(function (i) {
				$scope.addEvent(i.coordinates.lat, i.coordinates.lon);
			});
		});
}]);