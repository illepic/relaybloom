var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var buildPath = path.resolve(__dirname, 'build');
var publicPath = path.resolve(__dirname, 'public');

//app.get('/', function(req, res){
//  res.sendFile(publicPath + '/relaybloom.html');
//});

app.use(express.static('public'));
app.use(express.static('build'));

io.on('connection', function(socket){
  socket.on('leg handoff', function(msg){
    socket.broadcast.emit('leg handoff', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});