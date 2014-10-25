angular.module('app').controller('init', function ($scope, data) {
    $scope.searchTerm = "";
    $scope.groupTerm = "Group";
    $scope.groupTags = "Group Tags";
    $scope.usersName = "Username";
    $scope.userGroups = [];
    $scope.groups = [
    	{ groupName: "test 1", groupTags: "tags"}, 
    	{ groupName: "test2", groupTags: "tags"},
    	{ groupName: "test3", groupTags: "tags"}
	]

	
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
		$scope.userGroups.length === 0 ? $scope.userGroups.push(group) : null;
		
	};

	$scope.removeUserGroups = function() {
		$scope.userGroups = [];
	};
});