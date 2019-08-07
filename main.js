const socket = require('socket.io');
const express = require('express');
const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 8080;

const app = express();
const server = http.Server(app);
const io = socket(server);
let playerCount = 0;
const playerColor = ['red', 'green', 'blue'];
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('port', PORT);
app.get('/', (requ, resp) => resp.sendFile(path.join(__dirname, 'main.html')));
// app.listen(PORT, () => console.log(`Listening on ${PORT}!`));
io.on('connection', (socket) => {
    console.log('User Connecting');
    socket.on('disconnect', () => console.log('user disconnecting'));
    socket.on('pressed', (data) => {
        console.log('Server Pressing', data);
        socket.broadcast.emit('pressed', data);
    });
    socket.emit('init', {
        id: (playerCount+1),
        color: playerColor[playerCount]
    });
    playerCount++;
    console.log(`Player ${playerCount} has entered the game.`);
});
server.listen(PORT, () => console.log(`Listening on ${PORT} but server.`));