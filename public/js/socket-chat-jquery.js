var params = new URLSearchParams(window.location.search);

var name = params.get('name');
var lobby = params.get('lobby');

//ref de JQuery
var divUsuarios = $('#divUsuarios');
var sendForm = $('#sendForm');
var txtMessage = $('#txtMessage');
var divChatbox = $('#divChatbox');

function renderUsers(users) {
    var html = '';

    html += '<li>';
    html += '   <a href="javascript.void(0)" class="active"> Chat de <span> ' + lobby + '</span></a>';
    html += '</li>';

    for (var i = 0; i < users.length; i++) {
        html += '<li>';
        html += '   <a data-id="' + users[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + users[i].name + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);
}

function renderMessages(data, me) {

    var html = '';
    var date = new Date(data.date);
    var time = date.getHours() + ':' + date.getMinutes();
    var adminClass = 'info';
    if (data.name === 'Administrador') {
        adminClass = 'danger';
    }

    if (!me) {
        html += '<li class="animated fadeIn">';
        if (data.name !== 'Administrador') {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
            html += '    <div class="chat-content">';
            html += '        <h5>' + data.name + '</h5>';
            html += '        <div class="box bg-light-' + adminClass + '">' + data.message + '</div>';
            html += '    </div>';
        } else {
            html += '    <div class="chat-content">';
            html += '        <div class="box bg-light-' + adminClass + '">' + data.message + '</div>';
            html += '    </div>';
        }
        html += '    <div class="chat-time">' + time + '</div>';
        html += '</li>';
    } else {
        html += '<li class="reverse animated fadeIn">';
        html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '    <div class="chat-content">';
        html += '        <h5>' + data.name + '</h5>';
        html += '        <div class="box bg-light-inverse">' + data.message + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + time + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//Listeners
divUsuarios.on('click', 'a', function() {

    var id = $(this).data('id');

    if (id)
        console.log(id);

});

sendForm.on('submit', function(e) {
    e.preventDefault();
    if (txtMessage.val().trim().length === 0)
        return;

    socket.emit('createMessage', {
        name,
        message: txtMessage.val()
    }, function(message) {
        txtMessage.val('').focus();
        renderMessages(message, true);
        scrollBottom();
    })
});