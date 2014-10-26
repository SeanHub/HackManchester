angular.module('app').controller('viewEvent', function ($scope, $rootScope, $modalInstance, events, geolocation) {
	$scope.selectedEvent = $rootScope.selectedEvent;
	$scope.viewedEvent = $rootScope.viewedEvent;
	
	$scope.joinEvent = function (event) {
		$rootScope.selectedEvent = event;
		$modalInstance.close();
	};
});