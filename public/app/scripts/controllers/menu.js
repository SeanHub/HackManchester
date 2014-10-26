angular.module('app').controller('menu', function ($scope, $rootScope, $modal, events) {
	$scope.events = events.events;

	$scope.selectedEvent = $rootScope.selectedEvent;

	$scope.open = function () {
		var modalInstance = $modal.open({
			controller: 'addGroup',
			templateUrl: 'views/modals/addGroup.tpl.html',
			size: 'sm'
		});
	};

	$scope.remove = function () {
		$scope.selectedEvent = null;
	};
	
	$scope.viewEvent = function (event) {
		$scope.viewedEvent = event;
		var modalInstance = $modal.open({
			controller: 'viewEvent',
			templateUrl: 'views/modals/viewEvent.tpl.html',
			size: 'sm'
		});
	};
});