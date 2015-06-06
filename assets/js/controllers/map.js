/**
 * Created by martin on 06/06/15.
 */





app.controller("mapa", ['$scope', '$http', function ($scope, $http) {

    $scope.family = [];
    $scope.markers = [];
    $scope.map = null;
    $scope.selected = null;

    // Ventana para edicion del marker
    $scope.infowindow = new google.maps.InfoWindow({
        content: '<button class="button">Editar Familia</button>'
    });

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
                    $scope.infowindow.setContent('Familia: <b>' + fam.bossLastName + '</b><br><button class="button">Editar</button>');
                    $scope.infowindow.open($scope.map, fam.marker);
                    $scope.selected = fam;
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

    $scope.markerClick = function (mark) {


    }
}]);

