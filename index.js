var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    io.emit('connected', "user is connected");
    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
    });
    socket.on('send name', (msg) => {
        console.log(msg);
        socket.broadcast.emit('name received', msg + ' is connected');
    })
    socket.on('disconnect', () => {
        io.emit('disconnected', "user is disconnected");
        console.log('user disconnected!');
    });
});

http.listen(8080, () => {
    console.log('Server is running at 8000');
})