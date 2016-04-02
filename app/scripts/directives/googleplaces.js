'use strict';

/**
 * @ngdoc directive
 * @name bookmycabFrontendApp.directive:googleplaces
 * @description
 * # googleplaces
 */
angular.module('bookmycabFrontendApp')
  .directive('googleplaces', function () {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, model) {
        var options = {
          componentRestrictions: { country: 'IN' },
          types: ['geocode'],
        };
        var autocomplete = new google.maps.places.Autocomplete(element[0], options);

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();
            if (!place.geometry) {
              window.alert("Autocomplete's returned place contains no geometry");
              return;
            }
          scope.$apply(function() {
              model.$setViewValue(place);
          });
        });
      }
    };
  });
