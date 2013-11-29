'use strict';

angular.module('meetupApp')
.controller('ItemCtrl', function ($scope) {
	$scope.items = [];

	$scope.addItem = function (item) {
		$scope.items.push(item);
		$scope.item = '';
	};

	$scope.removeItem = function (index) {
		$scope.items.splice(index, 1);
	};
});
