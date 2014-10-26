angular.module('app').controller('user', function ($scope, $modalInstance, $http, events) {
	$scope.addUser = function () {
		$http.post('api/addUser', { name: $scope.username }).success(function (data) {
			localStorage.setItem('username', $scope.username);
			localStorage.setItem('user_id', data.id);
			$modalInstance.close();
		});
	};
});