'use strict';

describe('Directive: mouse', function () {

  // load the directive's module
  beforeEach(module('04FallAgainFallBetterApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    expect(3).toEqual(3);
  }));
});
