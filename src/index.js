const http = require('http');
const app = require('./app');
const { PORT } = require('./config');
const { connectToDatabase } = require('./db');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  // Handle incoming messages from the client
  socket.on('notification', (message) => {
    console.log('received message:', message);

    // Broadcast the message to all connected clients except the sender
    socket.broadcast.emit('notification', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

async function startServer() {
  await connectToDatabase();

  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

startServer();
