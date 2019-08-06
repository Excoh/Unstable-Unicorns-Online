const socket = io();
socket.on('message', (data) => console.log(data));

var keyPressed = '';
document.addEventListener('keydown', (e) => {
    keyPressed = e.key;
    socket.emit('pressed', keyPressed);
});