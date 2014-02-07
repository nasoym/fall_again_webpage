'use strict';

describe('Directive: Test', function () {

  // load the directive's module
  beforeEach(module('FallAgainApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<test></test>');
    element = $compile(element)(scope);
  }));
});
