myApp.factory('taskData', function () {
    return {
        tasks : [
            { title: 'Fix bug #3445', status: 'done', date: new Date() },
            { title: 'Fix bug #3446', status: 'done', date: new Date() },
            { title: 'Add new Feature', status: 'pending', date: new Date() }],
        add: function (task) {
            task.date = new Date();
            this.tasks.push(task);
        }
    }
});