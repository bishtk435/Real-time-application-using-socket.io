var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log('a user connected!');
    socket.on('disconnect', () => {
        console.log('user disconnected!');
    });
});

http.listen(8080, () => {
    console.log('Server is running at 8000');
})