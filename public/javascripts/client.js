// if hasn't join do nothing lmao
let playerNum = 0;
const socket = io();

var keyPressed = '';
document.addEventListener('keydown', (e) => {
    if (e.key.charCodeAt(0) >= 'a'.charCodeAt(0) && e.key.charCodeAt(0) <= 'z'.charCodeAt(0)) {
        keyPressed = e.key;
        socket.emit('pressed', keyPressed);
    }
});

socket.on('init', (data) => {
    console.log(data);
    playerNum = data.id;
    $('#player-num').text(`Player ${data.id}`);
    $('#container').addClass(data.color);
});
socket.on('pressed', (keyPressed) => {
    $('#content').text($('#content').text() + keyPressed);
});
socket.on('action', (data) => {
    console.log(`Receiving Action: ${data}`);
    if (data && data.type === 'clear') {
        updatePlayerCount(data.playerCount);
    }
})

function clearPlayers() {
    socket.emit('action', {
        type: 'clear'
    });
}

function updatePlayerCount(playerCount) {
    $('#player-count').text(`Total # of Players: ${playerCount}`);
}