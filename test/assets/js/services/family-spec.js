/**
 * Created by rjbordon on 30/06/15.
 */

describe('family service', function () {
  var target,
    httpBackend;

  beforeEach(function () {
    module('techo.services');

    inject(function ($httpBackend, _familyService_) {
      target = _familyService_;
      httpBackend = $httpBackend;
    });
  });

  describe('get all', function () {
    it('should get all families', function () {
      // prepare
      var expected = [
          {
            status: 0
          }
        ],
        successCallback = sinon.spy(),
        errorCallback = sinon.spy();

      httpBackend.expectGET('/api/family').respond(expected);

      // execute
      target.getAll(successCallback, errorCallback);
      httpBackend.flush();

      // attest
      expect(successCallback.calledOnce).to.equal(true);
      expect(errorCallback.calledOnce).to.equal(false);
      expect(successCallback.args[0].length).to.equal(1);
      expect(successCallback.args[0][0].length).to.equal(expected.length);
      expect(successCallback.args[0][0][0].status).to.equal(expected[0].status);
    });
  });
});
