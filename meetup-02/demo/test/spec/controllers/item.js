'use strict';

describe('Controller: ItemCtrl', function () {

  // load the controller's module
  beforeEach(module('meetupApp'));

  var ItemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemCtrl = $controller('ItemCtrl', {
      $scope: scope
    });
  }));

  it('should add items to scope', function () {
    scope.addItem('Item 1');
    scope.addItem('Item 2');
    scope.addItem('Item 3');
    expect(scope.items.length).toBe(3);
  });

  it('should remove items from scope', function () {
    scope.items = ['Item 1', 'Item 2', 'Item 3'];
    scope.removeItem(1);
    expect(scope.items.length).toBe(2);
  });

});
