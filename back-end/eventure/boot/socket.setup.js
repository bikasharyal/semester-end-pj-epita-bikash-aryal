//./boot/socket.setup.js
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('update event', (eventData) => {
    // Broadcast the update to all other connected clients
    socket.broadcast.emit('event updated', eventData);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
