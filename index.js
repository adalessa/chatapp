var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));

app.set('view engine', 'jade');

app.get('/', function(req, res){
	res.render('index');
	//res.sendFile(__dirname + '/index.jade');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
	socket.on('chat message', function(msg, user){
    io.emit('chat message', user + ':' + msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
