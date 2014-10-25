angular.module('app').controller('init', function ($scope, data) {
    $scope.searchTerm = "Template";
    $scope.groupTerm = "Group";
    $scope.groupTags = "Group Tags";
    $scope.usersName = "Username";
	
	$scope.search = function (term) {
		alert(data.get(term));
	};

	$scope.group = function(term) {
		alert(data.get(term));
	};

	$scope.username = function(term){
		alert(data.get(term));
	};
});