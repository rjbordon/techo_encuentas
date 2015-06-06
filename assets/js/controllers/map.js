/**
 * Created by martin on 06/06/15.
 */





app.controller("mapa", ['$scope', '$http', '$modal', '$compile', function ($scope, $http, $modal, $compile) {

    $scope.family = [];
    $scope.markers = [];
    $scope.map = null;
    $scope.selected = null;

    // Ventana para edicion del marker
    $scope.infowindow = new google.maps.InfoWindow({});

    google.maps.event.addDomListener(window, 'load', initialize);

    function initialize() {
        // Inicializo el mapa

        $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {});

        // Imagen
        var image = {
            url: 'images/logo.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            size: new google.maps.Size(356, 95),
            //size: new google.maps.Size(20, 32),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(0, 32)
        };

        var shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly'
        };

        $http({
            method: 'GET',
            url: '/api/family'
        }).success(function (data) {

            // Obtengo todas las familias en data
            $scope.family = data;
            console.log(data);
            // Agrego el marker

            // por cada familia creo un marker

            $scope.family.forEach(function (fam) {
                // Creo el marker
                fam.marker = new google.maps.Marker({
                    position: new google.maps.LatLng(fam.lat, fam.lng),
                    map: $scope.map,
                    //icon: image,
                    shape: shape,
                    title: fam.bossLastName,
                    zIndex: 1,
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

            });
            $scope.center();

        }).error(function (data) {
            console.log('noando' + err);
        });
    }

    $scope.center = function () {
        var latlngbounds = new google.maps.LatLngBounds();

        $scope.family.forEach(function (fam) {
            latlngbounds.extend(fam.marker.position);
        });


        $scope.map.setCenter(latlngbounds.getCenter());
        $scope.map.fitBounds(latlngbounds);
    }

    /*$scope.openCreateFamilyPopup = function() {
     alert('holas');
     };*/

    $scope.openCreateFamilyPopup = function (size) {

        var modalInstance = $modal.open({
            //animation: $scope.animationsEnabled,
            templateUrl: 'templates/formFamilia.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };
}]);


app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    /*$scope.items = items;
     $scope.selected = {
     item: $scope.items[0]
     };*/

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
