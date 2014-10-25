angular.module('app').factory('data', function () {
	var data = {};
	
	data.get = function (term) {
		return term;
	};
	
	return data;
});