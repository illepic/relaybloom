var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var isProduction = process.env.TARGET === 'production';
var port = isProduction ? 80 : 3000;

var buildPath = path.resolve(__dirname, 'build');
var publicPath = path.resolve(__dirname, 'public');

//app.get('/', function(req, res){
//  res.sendFile(publicPath + '/relaybloom.html');
//});

app.use(express.static('public'));
app.use(express.static('build'));

io.on('connection', function(socket){
  socket.on('create', function(room) {
    socket.join(room);
  });
  socket.on('leg handoff', function(msg){
    socket.broadcast.to(msg.room).emit('leg handoff', msg);
  });
  socket.on('race refresh', function(msg){
    socket.broadcast.to(msg.room).emit('race refresh', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});