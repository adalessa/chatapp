var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, './data/users.json'),
    userList = [];

module.exports = function(io){
  io.on('connection', function(socket){
    const _id = socket.id;
    console.log('a user connected');

    socket.on('disconnect', function(){
      //userList = removeUser(_id);
      io.emit('userDisconnected', _id);
      console.log('user disconnected');
    });

    socket.on('register', function (username) {


      //getUsers(function (err, content) {
      //    console.log(content)
      //})

      if (username == "" ) {
        socket.emit('messages', 'You are not allow');
      } else {
        socket.emit('usersListConnected', userList);
        userList.push({id:_id,user:username});
        socket.broadcast.emit('userConnected', _id, username);

        socket.on('chat message', function(msg){
          io.emit('chat message', username + ': ' + msg);
        });
      }
    });

    function addUser(username){
      fs.readFile(filePath, 'utf8', function readFileCallback(err, data){
        var newUser = {};
        newUser.id = _id;
        newUser.username = username;
        if (err){
            console.log(err);
        } else {
          obj = JSON.parse(data); //now it an object
          obj.users.push(newUser); //add some data
          json = JSON.stringify(obj); //convert it back to json
          fs.writeFile(filePath, json, 'utf8',(err) => {
            if (err) throw err;
            //console.log('User successfully registered!');
          }); // write it back
        }
      });
    }

    function removeUser(socketId){
      fs.readFile(filePath, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
          obj = JSON.parse(data); //now it an object
          for(var i = 0; i < obj.users.length; i++){
            if(obj.users[i].id == socketId){
              obj.users.splice(i, 1 );
            }
          }
          json = JSON.stringify(obj); //convert it back to json
          fs.writeFile(filePath, json, 'utf8',(err) => {
            if (err) throw err;
            //console.log('User'+ socketId +' successfully deleted!');
          }); // write it back
        }
      });
    }

    function getUsers(callback){
      fs.readFile(filePath, 'utf8', function readFileCallback(err, userList){
        if (err){
            console.log(err);
        } else {
          callback(null, JSON.parse(data)); //now it an object
        }
      });
    }



  });


}
