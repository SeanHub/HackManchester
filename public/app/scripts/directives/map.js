angular.module('app').directive('map', function () {
    return {
        controller: 'map',
        restrict: 'E',
        templateUrl: 'views/map.tpl.html'
    };
});