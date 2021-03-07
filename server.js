// io needs to use HTTP, express will still be the middleware for routes
const express =require ('express')
const app = express(); //creates the express app
const http = require('http').Server(app); //app is an http server
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

http.listen(PORT, ()=>{
    console.log("listning to port "+ PORT)
});

app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/index.html")
});

app.use(express.static('public'));

io.on('connection', function(socket){
    console.log("client is connected "+ socket.id)
    socket.on('userMessage', (data) => {
        io.sockets.emit("userMessage", data)

    })  
    socket.on('userTypig', (data) =>{
        socket.broadcast.emit('userTyping', data)

     
    });
});