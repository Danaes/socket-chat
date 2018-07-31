const { io } = require('../server');

const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    client.on('enterChat', (user, callback) => {

        if (!user.name || !user.lobby)
            return callback({
                err: true,
                message: 'El nombre/sala es necesario'
            });

        client.join(user.lobby);

        users.addPerson(client.id, user.name, user.lobby);

        client.broadcast.to(user.lobby).emit('listPeople', users.getPeopleByLobby(user.lobby));

        callback(users.getPeopleByLobby(user.lobby));
    });

    client.on('createMessage', data => {

        let user = users.getPerson(client.id);

        let message = createMessage(user.name, data.message);
        client.broadcast.to(user.lobby).emit('createMessage', message);
    });

    client.on('disconnect', () => {
        let removedPerson = users.removePerson(client.id);

        client.broadcast.to(removedPerson.lobby).emit('createMessage', createMessage(null, `${removedPerson.name} abandonó el chat`));
        client.broadcast.to(removedPerson.lobby).emit('listPeople', users.getPeopleByLobby(removedPerson.lobby));

    });

    client.on('privateMessage', data => {

        let user = users.getPerson(client.id);

        client.broadcast.to(data.to).emit('privateMessage', createMessage(user.name, data.message));
    });

});