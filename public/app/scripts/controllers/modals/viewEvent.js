angular.module('app').controller('viewEvent', function ($scope, $rootScope, $modalInstance, events, geolocation, uber) {
	$scope.selectedEvent = $rootScope.selectedEvent;
	$scope.viewedEvent = $rootScope.viewedEvent;

	$scope.prices = {};
	$scope.pricesToLocation = {};
	
	$scope.joinEvent = function (event) {
		$rootScope.selectedEvent = event;
		$modalInstance.close();
	};


	$scope.getTimes = function() {
		//console.log(uber.getTime());
		$scope.prices = uber.getTime(function(data){
			$scope.prices = data;

			console.log($scope.prices);
			console.log("TEST");
		});
	};

	$scope.getPrices = function() {
		console.log("get prices event");
		console.log($rootScope.selectedEvent);
		console.log($scope.selectedEvent);
		console.log($scope.viewedEvent.marker.coords.latitude);
		console.log($scope.viewedEvent.marker.coords.longitude);
		console.log("end get prices");
		$scope.pricesToLocation = uber.getPrice($scope.viewedEvent.marker.coords.latitude,
			$scope.viewedEvent.marker.coords.longitude,
			function(data){
			$scope.pricesToLocation = data.prices;

			console.log($scope.pricesToLocation);

		});
	};
});