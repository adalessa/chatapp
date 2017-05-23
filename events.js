module.exports = function(io){
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('register', function (username) {
      if (username != "Ariel" ) {
        socket.emit('messages', 'You are not allow');
      } else {
        socket.on('chat message', function(msg){
          io.emit('chat message', username + ': ' + msg);
        });
      }
    });
  });
}
