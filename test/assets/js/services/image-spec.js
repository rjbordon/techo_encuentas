/**
 * Created by rjbordon on 30/06/15.
 */

describe('image service', function () {
  var target;

  beforeEach(function () {
    module('techo.services');

    inject(function (_imageService_) {
      target = _imageService_;
    });
  });

  describe('get all', function () {
    it('it should get predefined images', function () {
      var SizeMock = function () {
        },
        PointMock = function () {
        },
        images = target.getAll(SizeMock, PointMock);

      expect(images.length).to.equal(5);
    });
  });
});
