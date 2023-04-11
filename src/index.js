const http = require('http');
const app = require('./app');
const { PORT } = require('./config');
const { connectToDatabase } = require('./db');

const server = http.createServer(app);

async function startServer() {
  await connectToDatabase();

  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

startServer();
