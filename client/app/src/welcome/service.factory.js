/**
 * @ngdoc service
 * @name app.welcome.service
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.welcome')
		.factory('service', service);

  /* @ngInject */
  function service(Upload){
		return {
			upload: upload
		};


		function upload(file){
      return Upload.upload({
        url: 'http://localhost:5000/upload',
        file: file
      });
		}
	}

}());
