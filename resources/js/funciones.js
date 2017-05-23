import 'jquery';
import 'bootstrap';

function userLogin(){
    var user = $('#user').val();
    abrirSocket(user);
}
function abrirSocket(user){

    $('#chat').show();
    $('#messages').show();
    $('#login').hide();

    var divMessage = document.getElementById('messages');
    var user = $('#user').val();
    var socket = io();

    socket.on('messages', function (msg) {
      alert(msg);
    })

    socket.emit('register', user);

    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<div class="col-md-12">').text(msg));
      divMessage.scrollTop = divMessage.scrollHeight;
      //$("#messages").animate({ scrollTop: $('#messages').height()}, 1000);
    });
}
