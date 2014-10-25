describe('directive search', function () {
	beforeEach(module('app'));
	
	it('should compile', function () {
		module('views/search.tpl.html');
		inject(function ($compile, $rootScope) {
			scope = $rootScope;
			element = $compile('<search></search>')(scope);
			elementScope = element.scope();
			scope.$apply();
		});
		expect(element.html()).toContain('<input');
	});
});