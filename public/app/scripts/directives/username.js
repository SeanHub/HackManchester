angular.module('app').directive('username', function () {
    return {
        controller: 'init',
        restrict: 'E',
        templateUrl: 'views/username.tpl.html'
    };
});