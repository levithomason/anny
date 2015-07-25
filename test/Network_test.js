var Network = require('../lib/Network');

describe('Network', function() {
  describe('activate', function() {
    it('is a function', function() {
      Network.activate.should.be.a(Function);
    });
  });
});
