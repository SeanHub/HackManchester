angular.module('app').controller('content', function ($scope, $modal) {
	if (!localStorage.getItem('username')) {
		var modalInstance = $modal.open({
			controller: 'user',
			templateUrl: 'views/modals/user.tpl.html',
			size: 'sm'
		});
	}
	
	$scope.username = localStorage.getItem('username');
});