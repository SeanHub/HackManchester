angular.module('app').controller('init', function ($scope, data) {
    $scope.searchTerm = "Template";
    $scope.groupTerm = "Group";
    $scope.groupTags = "Group Tags";
    $scope.usersName = "Username";
    $scope.userGroups = [{ groupName: "test", groupTags: "tags"}];
    
	
	$scope.search = function (term) {
		alert(data.get(term));
	};

	$scope.group = function(term) {
		alert(data.get(term));
	};

	$scope.username = function(term){
		alert(data.get(term));
	};

	$scope.createGroup = function(){
		console.log("HERE");
		console.log($scope.groups);
		var group = { groupName: $scope.groupTerm, groupTags: $scope.groupTags };
		$scope.userGroups.push(group);
	};
});