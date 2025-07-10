
server/.env.example
// ------------------------------
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
CLIENT_ORIGIN=https://your-frontend-url.com

// ------------------------------
// ✅ Express Server Socket.io Setup
// 📄 server/server.js
// ------------------------------
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN, methods: ['GET', 'POST'] }
});

require('./sockets/socketEvents')(io);

mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
