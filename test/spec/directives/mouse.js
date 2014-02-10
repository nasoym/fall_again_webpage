'use strict';

describe('Directive: mouse', function () {

  // load the directive's module
  beforeEach(module('FallAgainApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mouse></mouse>');
    element = $compile(element)(scope);
  }));
});
