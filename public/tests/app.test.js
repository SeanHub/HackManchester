describe('application', function () {
    beforeEach(module('app'));

    it('should be defined', function () {
        expect(angular.module('app')).toBeDefined();
    });
});