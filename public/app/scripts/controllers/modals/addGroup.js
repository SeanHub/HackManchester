angular.module('app').controller('addGroup', function ($scope, $modalInstance, events, geolocation) {
	$scope.addGroup = function () {
		geolocation.getLocation(function (data) {
			var event = {
				name: $scope.groupName,
				users: [],
				tags: ['lala'],
				lat: data.coords.latitude,
				lon: data.coords.longitude
			};
			events.setEvent(event);
			events.addEvent(event);
		});
		$modalInstance.close();
	};
});