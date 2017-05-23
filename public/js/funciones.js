function userLogin(){
    var user = $('#user').val();
    debugger;
    abrirSocket(user);
}
function abrirSocket(user){
    $('#chat').show();
    $('#messages').show();
    $('#login').hide();
    var divMessage = document.getElementById('messages');
    var user = $('#user').val();
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val(), user);
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<div class="col-md-12">').text(msg));
      divMessage.scrollTop = divMessage.scrollHeight;
      //$("#messages").animate({ scrollTop: $('#messages').height()}, 1000);
    });
}
