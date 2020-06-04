const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
// const server = http.Server(app);
// NOTE : server here is an EventEmitter object
const io = socketio(server);
// io is an interface via which sockets can connect

let idUserMap = {}

io.on('connection', (socket) => {
    console.log('Connected ' + socket.id)

    socket.on('login', (data) => {
        idUserMap[socket.id] = data.username
        socket.emit('loggedin')
    })

    socket.on('chat', (data) => {
        io.emit('chat_rcvd', {
            username: idUserMap[socket.id],
            msg: data.msg
        })  // will send to all sockets in io

        // socket.broadcast.emit('chat_rcvd', {
        //     username: idUserMap[socket.id],
        //     msg: data.msg
        // })

        // io.emit('chat_rcvd', {
        //     username: idUserMap[socket.id],
        //     msg: data.msg
        // })
    })

})

app.use('/', express.static(
    __dirname + '/public'
))

server.listen(3333, () => {
    console.log('Server has started on http://localhost:3333')
})