'use strict';

describe('Directive: googleplaces', function () {

  // load the directive's module
  beforeEach(module('bookmycabFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<googleplaces></googleplaces>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the googleplaces directive');
  }));
});
