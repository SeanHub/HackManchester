angular.module('app').directive('group', function () {
    return {
        controller: 'init',
        restrict: 'E',
        templateUrl: 'views/group.tpl.html'
    };
});