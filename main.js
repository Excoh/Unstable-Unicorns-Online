const socket = require('socket.io');
const express = require('express');
const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 8080;

const app = express();
const server = http.Server(app);
const io = socket(server);
let playerCount = 0;
const playerColorClass = ['red', 'green', 'blue', 'black', 'pink', 'violet'];
const players = [];

app.use('/', express.static(path.join(__dirname, '/')));
app.set('port', PORT);
app.get('/', (requ, resp) => resp.sendFile(path.join(__dirname, 'main.html')));

io.on('connection', (socket) => {
    console.log('User Connecting');
    socket.on('disconnect', () => console.log('user disconnecting'));
    socket.on('pressed', (data) => {
        console.log('Server Pressing', data);
        socket.broadcast.emit('pressed', data);
    });
    socket.emit('init', {
        id: (playerCount + 1),
        color: playerColorClass[playerCount],
        playerCount: playerCount
    });
    playerCount++;
    console.log(`Player ${playerCount} has entered the game!`);
    socket.on('action', (data) => {
        console.log(data);
        if (data.type === 'clear') {
            playerCount = 0;
            socket.emit('action', {
                type: 'clear',
                playerCount: playerCount
            });
        }
    });
    socket.on('chat', (pInfo) => {
        socket.broadcast.emit('chat', pInfo);
    });

});

server.listen(PORT, () => {
    console.log(`Listening on server:${PORT}`)
});