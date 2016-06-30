/**
 * @ngdoc controller
 * @name app.welcome.controller:Welcome
 * @description Welcome controller which typically is useless and you are going to delete it
 */

(function(){

  'use strict';

  angular.module('app.welcome')
    .controller('Welcome', Welcome);

  /* @ngInject */
  function Welcome(service){
    var vm = this;
    vm.pictures = [];
    vm.upload = function (files){
      if(!files.length){
        return false;
      }
      service.upload(files[0])
        .success(function(response){
          vm.pictures = vm.pictures.concat(response);
        })
        .error(function(err){
          console.error(err);
        })
    }
  }

}());
