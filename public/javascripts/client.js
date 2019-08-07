const socket = io();
socket.on('message', (data) => console.log(data));

var keyPressed = '';
document.addEventListener('keydown', (e) => {
    if (e.key.charCodeAt(0) >= 'a'.charCodeAt(0) && e.key.charCodeAt(0) <= 'z'.charCodeAt(0)) {
        keyPressed = e.key;
        socket.emit('pressed', keyPressed);
    }
});

socket.on('pressed', (keyPressed) => {
    $('#content').text($('#content').text() + keyPressed);
})