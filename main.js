const socket = require('socket.io');
const express = require('express');
const http = require('http');
const path = require('path');
const PORT = 8080;

const app = express();
const server = http.Server(app);
const io = socket(server);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('port', PORT);
app.get('/', (requ, resp) => resp.sendFile(path.join(__dirname, 'main.html')));
// app.listen(PORT, () => console.log(`Listening on ${PORT}!`));
io.on('connection', (socket) => {
    console.log('User Connecting');
    socket.on('disconnect', () => console.log('user disconnecting'));
    socket.on('pressed', (data) => console.log('Pressing', data));
});
server.listen(PORT, () => console.log(`Listening on ${PORT} but server.`));


setInterval( () => {
    // send a message to all connected sockets with the name 'message'
    io.sockets.emit('message', 'hi');
}, 1000)