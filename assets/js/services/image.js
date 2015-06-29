/**
 * Created by rjbordon on 28/06/15.
 */

(function () {
  'use strict';

  angular
    .module('techo.services')
    .factory('imageService', imageService);

  function imageService() {
    return {
      getAll: function(Size, Point) {
        return [
          {
            url: 'images/pinYellow.png',
            size: new Size(22, 40),
            origin: new Point(0, 0),
            anchor: new Point(11, 40)
          },
          {
            url: 'images/pinGreen.png',
            size: new Size(22, 40),
            origin: new Point(0, 0),
            anchor: new Point(11, 40)
          },
          {
            url: 'images/pinRed.png',
            size: new Size(22, 40),
            origin: new Point(0, 0),
            anchor: new Point(11, 40)
          },
          {
            url: 'images/pinGrey.png',
            size: new Size(22, 40),
            origin: new Point(0, 0),
            anchor: new Point(11, 40)
          },
          {
            url: 'images/pinBlue.png',
            size: new Size(22, 40),
            origin: new Point(0, 0),
            anchor: new Point(11, 40)
          }
        ];
      }
    };
  }
})();
