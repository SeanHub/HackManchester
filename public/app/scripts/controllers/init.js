angular.module('app').controller('init', function ($scope, data) {
    $scope.searchTerm = "Template";
	
	$scope.search = function (term) {
		alert(data.get(term));
	};
});