var express = require('express');

module.exports = function(app) {

	// Rutas estaticas
	app.use('/vendor/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
	app.use('/vendor/bootstrap/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
	app.use('/vendor/jquery/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
	app.use(express.static('public'));

	// Rutas
	app.get('/', function(req, res){
		res.render('index');
	});
}
