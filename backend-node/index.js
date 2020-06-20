const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const {v4: uuidv4} = require('uuid');

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

/**
 * Generates a new userId.
 * Currently there is no support for reconnecting with the old userId
 * @returns {string} a unique id based by
 */
function generateUserId() {
    return uuidv4();
}

function newChatMessageHandler(socket, userId) {
    socket.on('new-chat-message-to-server', data => {
        io.emit('new-chat-message', {
            ...data,
            from: userId,
        });
    });
}

/**
 * SocketIO new connection handler
 * Generates a new id for the user and sends it to the user
 */
io.on('connection', socket => {
    const userId = generateUserId();
    socket.emit('new-user-id', userId);

    newChatMessageHandler(socket, userId);
})

http.listen(3000, () => {
    console.log('listening on *:3000');
});
