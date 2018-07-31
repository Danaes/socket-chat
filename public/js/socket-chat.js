var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('lobby')) {
    window.location = 'index.html'
    throw new Error('El nombre y sala son necesarios');
}

var user = {
    name: params.get('name'),
    lobby: params.get('lobby')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enterChat', user, function(res) {
        renderUsers(res);
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('createMessage', function(message) {
    //console.log('Servidor: ', message);
    renderMessages(message, false);
    scrollBottom();
});

socket.on('listPeople', function(people) {
    renderUsers(people);
});

// Mensajes privados
socket.on('privateMessage', function(message) {
    console.log('Mensaje privado:', message);
});