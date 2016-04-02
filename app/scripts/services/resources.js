'use strict';

/**
 * @ngdoc service
 * @name bookmycabFrontendApp.resources
 * @description
 * # resources
 * Factory in the bookmycabFrontendApp.
 */
angular.module('bookmycabFrontendApp')
  .factory('GetProducts', [
    '$resource', 'api_url',
    function ($resource, api_url) {
    return $resource(
      ['http://' + api_url, '/schedule_cab/products/'].join(''),
      {},
      {
        query: {
          method: 'GET'
        }
      },
      {stripTrailingSlashes: false}
    );
  }])
  .factory('ScheduleCab', [
    '$resource', 'api_url',
    function ($resource, api_url) {
    return $resource(
      [api_url, 'schedule_cab/'].join(''),
      {},
      {
        query: {
          method: 'GET'
        },
        save: {
          method: 'POST'
        }
      },
      {stripTrailingSlashes: false}
    );
  }]);
