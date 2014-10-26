angular.module('app').directive('menu', function () {
    return {
        controller: 'menu',
        restrict: 'A',
        templateUrl: 'views/menu.tpl.html'
    };
});