/**
 * Created by martin on 06/06/15.
 */





app.controller("mapa", ['$scope', '$http', '$modal', '$compile', '$rootScope', function ($scope, $http, $modal, $compile, $rootScope) {

    $scope.family = [];
    $scope.map = null;
    $scope.selected = null;
    var images = [
        {
            url: 'images/pinYellow.png',
            size: new google.maps.Size(22, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        {
            url: 'images/pinGreen.png',
            size: new google.maps.Size(40, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        {
            url: 'images/pinRed.png',
            size: new google.maps.Size(40, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        {
            url: 'images/pinGrey.png',
            size: new google.maps.Size(40, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        {
            url: 'images/pinBlue.png',
            size: new google.maps.Size(40, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        }
    ];
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };

    // Ventana para edicion del marker
    $scope.infowindow = new google.maps.InfoWindow({});

    google.maps.event.addDomListener(window, 'load', initialize);

    function initialize() {
        // Inicializo el mapa

        $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {});

        // Imagenes




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
    };

    $scope.openCreateFamilyPopup = function (size) {

        var modalInstance = $modal.open({
            //animation: $scope.animationsEnabled,
            templateUrl: 'templates/formFamilia.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                selected: function () {
                    return $scope.selected;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
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
            $scope.selected = fam;
            var el = document.getElementById('btnEdit');
            $compile(el)($scope);
        });

        $scope.select = fami;
    });
}]);


app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, selected) {

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

app.controller('navBarCtrl', function ($scope, $rootScope) {
    $scope.newFamily = function () {
        $rootScope.$broadcast('newMarker', {
                "bossFirstName": "",
                "bossLastName": "Nueva Familia",
                "street": "",
                "streetNumber": "",
                "neighborhood": "",
                "comments": "",
                "phone": "",
                "lat": 0,
                "lng": 0,
                "status": "1",
                "pollCount": "1",
                "priority": "0"
            }
        );
    }
});


