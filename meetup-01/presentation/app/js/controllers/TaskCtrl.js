myApp.controller('TaskCtrl', function ($scope, taskData) {
    $scope.tasks = taskData.tasks;

    $scope.add = function (task) {
        taskData.add(task);
    }
});