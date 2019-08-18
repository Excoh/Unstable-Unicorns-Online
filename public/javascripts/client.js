let playerNum = 0;
let color;
const animateTime = 500; // animation time in ms
const socket = io();

$('form').submit(function (e) {
    e.preventDefault(); // prevents page reloading
    const msg = $('#msg').val();
    const playerInfo = {
        msg: msg,
        color: color
    }
    socket.emit('chat', playerInfo);   // send the message typed
    $('#msg').val('');  // clear own chat box
    $('#chat').append($('<li>')
        .css('background-color', `${color}`)
        .text(msg));
    const lastElem = $('#chat').children().last();
    $('#chat').scrollTop(lastElem.position().top);
    // $('#chat').animate({
    //     scrollTop: lastElem.position().top
    // }, animateTime);
    return false;
});

socket.on('init', (data) => {
    console.log(data);
    color = data.color;
    playerNum = data.id;
    $('#player-num').text(`Player ${data.id}`);
    $('#container').addClass(color);
});
socket.on('chat', function (info) {
    $('#chat').append($('<li>')
        .css('background-color', `${info.color}`)
        .text(info.msg));
    const lastElem = $('#chat').children().last();
    $('#chat').animate({
        scrollTop: lastElem.position().top - lastElem.height()
    }, animateTime);
});
socket.on('pressed', (keyPressed) => {
    $('#content').text($('#content').text() + keyPressed);
});
socket.on('action', (data) => {
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
