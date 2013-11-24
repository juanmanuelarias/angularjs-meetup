'use strict';

angular.module('meetupApp')
  .directive('panel', function () {
    return {
      templateUrl: '/views/templates/panel.html',
      restrict: 'E',
      replace:true,
      transclude:true,
      scope:{
      	title:"@title"
      }
    };
  });
