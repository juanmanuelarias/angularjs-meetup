'use strict';

describe('Controller: TodoCtrl', function () {

  // load the controller's module
  beforeEach(module('meetupApp'));

  var TodoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodoCtrl = $controller('TodoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of items to the scope', function () {
    scope.addItem('Item 1');
    scope.addItem('Item 2');
    scope.addItem('Item 3');
    expect(scope.items.length).toBe(3);
  });

  it('should remove an item from scope', function () {
    scope.items = ['Item 1', 'Item 2', 'Item 3'];
    scope.removeItem(1)
    expect(scope.items.length).toBe(2);
  })
});
