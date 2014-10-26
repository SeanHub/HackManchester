angular.module('app').controller('viewEvent', function ($scope, $rootScope, $modalInstance, $http, events, geolocation, uber) {
	$scope.selectedEvent = $rootScope.selectedEvent;
	$scope.viewedEvent = $rootScope.viewedEvent;
	console.log($scope.viewedEvent);

	$scope.prices = {};
	$scope.pricesToLocation = {};

	$scope.joinEvent = function (event) {
		$http.post('api/addUserToEvent', {
			userID: localStorage.getItem('user_id'),
			eventID: event.event_id
		}).success(function (data) {
			
		});
		$rootScope.selectedEvent = event;
		$modalInstance.close();
	};

	$scope.getTimes = function () {
		$scope.prices = uber.getTime(function (data) {
			$scope.prices = data;
		});
	};

	$scope.getPrices = function () {
		$scope.pricesToLocation = uber.getPrice($scope.viewedEvent.marker.coords.latitude,
			$scope.viewedEvent.marker.coords.longitude,
			function (data) {
				$scope.pricesToLocation = data.prices;
			});
	};
	
	$scope.getUserImage = function () {
		$http.get('http://api.randomuser.me').success(function (data) {
			$scope.userImage = data.results[0].user.picture.medium;
		});
	};
	
	$scope.getUserImage();
});