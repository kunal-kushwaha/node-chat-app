const socket = io()

// because of const socket = io(), connection event triggers in server.js

// this socket is client side. and the one in server.js are different.
// we get this function from /socket.io/socket.io.js

// setTimeout(() => {
//     console.log('Connected ' + socket.id)
// }, 2000);

// shows when it connects
socket.on('connect', () => {
    console.log('Connected ' + socket.id)
})

socket.on('chat_rcvd', (data) => {
    $('#chats').append(
        $('<li>').text(
            `${data.username}: ${data.msg}`
        )
    )
})

$(() => {
    $('#chatbox').hide()

    $('#login').click(() => {
        socket.emit('login', {
            username: $('#username').val()
        })
    })

    socket.on('loggedin', () => {
        console.log('Login successful')
        $('#loginform').hide()
        $('#chatbox').show()
    })

    $('#send').click(() => {
        console.log('Sending chat')
        socket.emit('chat', {msg: $('#msg').val()})
    })
})