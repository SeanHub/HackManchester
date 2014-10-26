angular.module('app').controller('viewEvent', function ($scope, $rootScope, $modalInstance, $http, events, geolocation, uber) {
	$scope.selectedEvent = $rootScope.selectedEvent;
	$scope.viewedEvent = $rootScope.viewedEvent;

	$scope.prices = {};
	$scope.pricesToLocation = {};

	$scope.joinEvent = function (event) {
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