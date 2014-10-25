angular.module('app').directive('search', function () {
    return {
        controller: 'init',
        restrict: 'E',
        templateUrl: 'views/search.tpl.html'
    };
});