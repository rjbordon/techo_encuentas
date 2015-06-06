/**
 * Created by martin on 06/06/15.
 */





app.controller("mapa", ['$scope', '$http', function ($scope, $http) {

    $scope.family = [];
    $scope.markers = [];
    $scope.map = null;


    google.maps.event.addDomListener(window, 'load', initialize);

    function initialize() {

        var myLatlng = new google.maps.LatLng(-25.363882, 131.044922);
        var mapOptions = {
            zoom: 4,
            center: myLatlng
        };
        $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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
            $scope.family = data;
            console.log(data);
            // Agrego el marker


            $scope.family.forEach(function (fam) {
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
                $scope.markers.push(fam.marker);
            });
            $scope.center();

        }).error(function (data) {
            console.log('noando' + err);
        });
    }

    $scope.center = function () {
        var latlngbounds = new google.maps.LatLngBounds();

        $scope.markers.forEach(function (mar) {
            latlngbounds.extend(mar.position);
        });


        $scope.map.setCenter(latlngbounds.getCenter());
        $scope.map.fitBounds(latlngbounds);
    }
}]);

