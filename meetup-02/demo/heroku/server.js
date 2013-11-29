var express = require('express');
var app = express();

app.configure(function () {
	app.use(express.compress());
    app.use(express.static(__dirname, {maxAge: 2592000000}));
    app.use(express.errorHandler());
})

var port = process.env.PORT || 8080;

app.listen(port);