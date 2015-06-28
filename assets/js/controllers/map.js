/**
 * Created by martin on 06/06/15.
 */

(function () {
  'use strict';

  angular
    .module('techoControllers')
    .controller('MapCtrl', MapCtrl);

  MapCtrl.$inject = [
    '$scope',
    '$modal',
    '$compile',
    'familyService',
    'imageService'
  ];

  function MapCtrl($scope, $modal, $compile, familyService, imageService) {
    $scope.family = [];
    $scope.map = null;
    $scope.selected = null;
    var images = imageService.getAll(google.maps.Size, google.maps.Point);
    var shape = {
      coords: [1, 1, 1, 20, 30, 20, 30, 1],
      type: 'poly'
    };

    // Ventana para edicion del marker
    $scope.infowindow = new google.maps.InfoWindow({});

    google.maps.event.addDomListener(window, 'load', initialize);

    function initialize() {
      // Inicializo el mapa

      $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {});

      familyService.getAll(function success(data) {
        // Obtengo todas las familias en data
        $scope.family = data;

        // Agrego el marker

        // por cada familia creo un marker

        $scope.family.forEach(function (fam) {
          // Creo el marker
          fam.marker = new google.maps.Marker({
            position: new google.maps.LatLng(fam.lat, fam.lng),
            map: $scope.map,
            icon: images[fam.status],
            shape: shape,
            title: fam.bossLastName,
            draggable: true,
            animation: google.maps.Animation.DROP
          });

          // Agrego evento click al marker
          google.maps.event.addListener(fam.marker, 'click', function () {
            $scope.infowindow.setContent('<div id="btnEdit">Familia: <b>' +
            fam.bossLastName +
            '</b><br><button ng-click="openCreateFamilyPopup()" class="button">Editar</button></div>');
            $scope.infowindow.open($scope.map, fam.marker);
            $scope.selected = fam;
            var el = document.getElementById('btnEdit');
            $compile(el)($scope);
          });

          google.maps.event.addListener(fam.marker, "dragend", function () {
            if (confirm("Desea guardar las nuevas coordenadas?")) {
              upsertFamily(fam);
            }
          });
        });
        $scope.center();
      }, function error(err) {
        console.error('error when getting families: ' + err);
      });
    }

    $scope.center = function () {
      var latlngbounds = new google.maps.LatLngBounds();

      $scope.family.forEach(function (fam) {
        latlngbounds.extend(fam.marker.position);
      });


      $scope.map.setCenter(latlngbounds.getCenter());
      $scope.map.fitBounds(latlngbounds);
    };

    var upsertFamily = function (selectedItem) {
      selectedItem.lat = selectedItem.marker.getPosition().lat();
      selectedItem.lng = selectedItem.marker.getPosition().lng();
      selectedItem.status = 0; // this must be done on backend

      selectedItem.marker.setIcon(images[0]);
      delete selectedItem.marker;

      $scope.selected = selectedItem;

      familyService.upsert(selectedItem, function success() {
        console.log('family information properly saved.');
      }, function error(err) {
        console.error('error when saving family: ' + err);
      });
    };

    $scope.openCreateFamilyPopup = function (size) {

      var modalInstance = $modal.open({
        //animation: $scope.animationsEnabled,
        templateUrl: 'templates/formFamilia.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          selectedFamily: function () {
            return $scope.selected;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        upsertFamily(selectedItem);

      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.$on('newMarker', function (event, args) {
      var coord = $scope.map.getCenter();
      var fami = args;

      if (fami.lat === 0) fami.lat = coord.lat();
      if (fami.lng === 0) fami.lng = coord.lng();

      // Creo el marker
      fami.marker = new google.maps.Marker({
        position: new google.maps.LatLng(fami.lat, fami.lng),
        map: $scope.map,
        icon: images[fami.status],   //TODO cambiar icono
        shape: shape,
        title: fami.bossLastName,
        draggable: true,
        animation: google.maps.Animation.DROP
      });

      // Agrego evento click al marker
      google.maps.event.addListener(fami.marker, 'click', function () {
        $scope.infowindow.setContent('<div id="btnEdit">Familia: <b>' +
        fami.bossLastName +
        '</b><br><button ng-click="openCreateFamilyPopup()" class="button">Editar</button></div>');
        $scope.infowindow.open($scope.map, fami.marker);
        $scope.selected = fami;
        var el = document.getElementById('btnEdit');
        $compile(el)($scope);
      });

      $scope.select = fami;
    });
  }
})();
