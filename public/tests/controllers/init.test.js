describe('controller init', function () {
	beforeEach(module('app'));
	
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		$controller('init', {
			$scope: scope
		});
	}));

	describe('$scope searchTerm', function () {
		it('should be set to \'Template\'', function () {
			expect(scope.searchTerm).toBe('Template');
		});
	});
});