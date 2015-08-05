'use strict';

describe('Service: pollFactory', function () {

  // load the service's module
  beforeEach(module('votingAppApp'));

  // instantiate service
  var pollFactory;
  beforeEach(inject(function (_pollFactory_) {
    pollFactory = _pollFactory_;
  }));

  it('should do something', function () {
    expect(!!pollFactory).toBe(true);
  });

});
