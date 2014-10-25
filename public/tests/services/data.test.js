describe('factory data', function () {
	beforeEach(module('app'));
	
	beforeEach(inject(function ($controller, $rootScope, data) {
		scope = $rootScope.$new();
		dataFactory = data;
		$controller('init', {
			$scope: scope,
			data: dataFactory
		});
	}));

	describe('data.get', function () {
		it('should return the term its given', function () {
			expect(dataFactory.get('term')).toBe('term');
		});
	});
});