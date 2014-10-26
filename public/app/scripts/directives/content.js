angular.module('app').directive('content', function () {
    return {
        controller: 'content',
        restrict: 'E',
        templateUrl: 'views/content.tpl.html'
    };
});