import 'jquery';
import 'bootstrap';

global.userLogin = function() {
    var user = $('#user').val();
    abrirSocket(user);
}

function abrirSocket(user){

    $('#chat').show();
    $('#messages').show();
    $('#login').hide();

    var divMessage = document.getElementById('chat');
    var user = $('#user').val();
    var socket = io();

    socket.on('messages', function (msg) {
      alert(msg);
    })

    socket.emit('register', user);

    socket.on('userConnected', function(id, user){
          $('#connected').append($('<div id="'+id+'" class="col-md-12">').text(user));
    });
    socket.on('usersListConnected', function(userList){
      for(var i=0; i<userList.length;i++){
        $('#connected').append($('<div id="'+userList[i].id+'" class="col-md-12">').text(userList[i].user));
      }
    });
    socket.on('userDisconnected', function(_id){
        $('#'+_id).remove();
    });
    /*socket.on('connected', function(userList){
        debugger;
        JSON.parse(userList)
        $('#connected').empty();
        for(var i=0; i<userList.length;i++){
          $('#connected').append($('<div id="'+userList.id+'" class="col-md-12">').text(user));
        }
    });
    socket.on('disconnected', function(userList){
        debugger;
        $('#connected').empty();
        for(var i=0; i<userList.length;i++){
          $('#connected').append($('<div id="'+userList.id+'" class="col-md-12">').text(user));
        }
    });*/

    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#chat').append($('<div class="col-md-12">').text(msg));
      divMessage.scrollTop = divMessage.scrollHeight;
      //$("#messages").animate({ scrollTop: $('#messages').height()}, 1000);
    });
}
