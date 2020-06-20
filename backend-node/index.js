var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

io.on('connection', socket => {
    console.log('a user connected');
    setInterval(() => {
        console.log('event emitted');
        io.emit('new-chat-message', {
            message: 'hello from server',
            user: 'Robot',
            ourMessage: false
        });
        console.log('sent!');

    }, 5000);
})

http.listen(3000, () => {
    console.log('listening on *:3000');
});
