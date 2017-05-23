var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'jade');

require('./routes.js')(app);

require('./events.js')(io);

http.listen(3000, function(){
  console.log('listening on *:3000');
});
