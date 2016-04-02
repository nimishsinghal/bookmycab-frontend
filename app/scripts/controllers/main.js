'use strict';

/**
 * @ngdoc function
 * @name bookmycabFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookmycabFrontendApp
 */
angular.module('bookmycabFrontendApp')
  .controller('MainCtrl', [
    '$scope', 'GetProducts', 'ScheduleCab', 'toastr', 'api_url',
    function ($scope, GetProducts, ScheduleCab, toastr, api_url) {
    var latitude, longitude;
    $scope.products = [];
    var ws = new WebSocket('ws://' + api_url +'/ws/alerts?subscribe-broadcast&publish-broadcast&echo');
    ws.onopen = function() {
        console.log("websocket connected");
    };
    ws.onmessage = function(e) {
        console.log("Received: " + e.data);
    };
    ws.onerror = function(e) {
        console.error(e);
    };
    ws.onclose = function(e) {
        console.log("connection closed");
    };
    function send_message(msg) {
        ws.send(msg);
    };
    $scope.fetchProducts = function (place) {
        if (typeof place === 'object') {
            latitude = place.geometry.location.lat();
            longitude = place.geometry.location.lng();
            GetProducts.query(
                {'latitude': latitude, 'longitude': longitude}
            ).$promise.then(function (response) {
                $scope.products = response.products;
            });
        }
    };

    $scope.scheduleCab = function (schedule, source, destination, time) {
        schedule.source_latitude = source.geometry.location.lat().toFixed(6);
        schedule.source_longitude = source.geometry.location.lng().toFixed(6);
        schedule.destination_latitude = destination.geometry.location.lat().toFixed(6);
        schedule.destination_longitude = destination.geometry.location.lng().toFixed(6);
        schedule.schedule_time = parseInt(time.getTime() / 1000, 10);
        ScheduleCab.save(schedule).$promise.then(function () {
            toastr.success('Your cab has been booked!');
        }, function (response) {
            toastr.error(response.detail);
        });
    };

  }]);
