const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: { origin: "*" } 
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🍆 HornyHub Backend is fucking hard... Ready for real video calls and chat 💦');
});

io.on('connection', (socket) => {
  console.log('😈 Horny user connected:', socket.id);
  
  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', { ...data, cum: '💦' });
  });

  socket.on('callUser', (data) => {
    io.to(data.target).emit('incomingCall', { from: socket.id, signal: data.signal });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAnswered', data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🔥 HornyHub Backend running on port ${PORT} - Time to fuck!`);
});