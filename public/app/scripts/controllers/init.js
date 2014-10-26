angular.module('app').controller('init', function ($scope, data, geolocation, events, $http) {
    $scope.searchTerm = "Template";
    $scope.groupTerm = "Group";
    $scope.groupTags = "Group Tags";
    $scope.usersName = "Username";
    $scope.userGroups = [{ groupName: "test", groupTags: "tags"}];
    $scope.groups = [
    	{ groupName: "test 1", groupTags: "tags"}, 
    	{ groupName: "test2", groupTags: "tags"},
    	{ groupName: "test3", groupTags: "tags"}
	]

	 $scope.clickToOpen = function (data) {
	 		console.log("CLICK" + data);
	 		window.displayDialog(data);
    };
	
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
		var group = { groupName: $scope.groupTerm, groupTags: $scope.groupTags };
		$scope.userGroups.push(group);

		geolocation.getLocation(function(data){
			console.log("get location got");
			console.log(data);
			var event = {lat: data.coords.latitude, lon: data.coords.longitude};
			events.addEvent(event);
		});

		// send group.
		// $http.post('/api/postGroup',
		// 	{name: 'testgroup',
		// 	lat: 'lat',
		// 	lon: 'lon'}).
		// success(function(data,status,headers,config){
			//events.addEvent(event);
		// }).
		// error(function(data,status,headers,config){
			//let user know of error
		// });
	};
});


//add user
// $http.post('/api/postUser', {name: 'test'}).
// success(function(data,status,headers,config){

// }).
// error(function(data,status,headers,config){

// });

//remove user
// $http.post('/api/postRemoveUser', {name: 'test'}).
// success(function(data,status,headers,config){

// }).
// error(function(data,status,headers,config){

// });