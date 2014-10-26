angular.module('app').controller('makeUser', function ($scope, $modalInstance, events) {

	$scope.userName;

	$scope.makeUser = function () {
		var user = {
			name: $scope.userName,
		};
	});

	$modalInstance.close();

});