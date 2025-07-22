const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"], // Vite and CRA default ports
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Store active rooms and users
const rooms = new Map();
const users = new Map();

// API endpoint to create a new room
app.post("/api/create-room", (req, res) => {
  const roomId = uuidv4();
  const { hostId, hostName } = req.body;
  
  rooms.set(roomId, {
    id: roomId,
    host: hostId,
    hostName: hostName,
    participants: [],
    createdAt: new Date(),
    isActive: true
  });
  
  res.json({ roomId, joinUrl: `${req.protocol}://${req.get('host')}/room/${roomId}` });
});

// API endpoint to get room info
app.get("/api/room/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms.get(roomId);
  
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  
  res.json({
    roomId: room.id,
    hostName: room.hostName,
    participantCount: room.participants.length,
    isActive: room.isActive
  });
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on("join-room", (data) => {
    const { roomId, userId, userName } = data;
    
    if (!rooms.has(roomId)) {
      socket.emit("error", { message: "Room not found" });
      return;
    }
    
    const room = rooms.get(roomId);
    
    // Add user to room
    socket.join(roomId);
    socket.roomId = roomId;
    socket.userId = userId;
    socket.userName = userName;
    
    // Update room participants
    room.participants.push({
      id: userId,
      name: userName,
      socketId: socket.id,
      joinedAt: new Date()
    });
    
    // Store user info
    users.set(socket.id, {
      userId,
      userName,
      roomId,
      socketId: socket.id
    });
    
    // Notify others in the room
    socket.to(roomId).emit("user-joined", {
      userId,
      userName,
      socketId: socket.id
    });
    
    // Send current participants to the new user
    socket.emit("room-users", room.participants.filter(p => p.socketId !== socket.id));
    
    console.log(`${userName} joined room ${roomId}`);
  });
  
  socket.on("offer", (payload) => {
    socket.to(payload.target).emit("offer", {
      sdp: payload.sdp,
      sender: socket.id,
      senderName: socket.userName
    });
  });
  
  socket.on("answer", (payload) => {
    socket.to(payload.target).emit("answer", {
      sdp: payload.sdp,
      sender: socket.id,
      senderName: socket.userName
    });
  });
  
  socket.on("ice-candidate", (payload) => {
    socket.to(payload.target).emit("ice-candidate", {
      candidate: payload.candidate,
      sender: socket.id
    });
  });
  
  socket.on("toggle-audio", (data) => {
    socket.to(socket.roomId).emit("user-audio-toggle", {
      userId: socket.userId,
      audioEnabled: data.audioEnabled
    });
  });
  
  socket.on("toggle-video", (data) => {
    socket.to(socket.roomId).emit("user-video-toggle", {
      userId: socket.userId,
      videoEnabled: data.videoEnabled
    });
  });
  
  socket.on("chat-message", (data) => {
    const user = users.get(socket.id);
    if (user) {
      io.to(socket.roomId).emit("chat-message", {
        id: uuidv4(),
        message: data.message,
        sender: user.userName,
        senderId: user.userId,
        timestamp: new Date()
      });
    }
  });
  
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    
    const user = users.get(socket.id);
    if (user && user.roomId) {
      const room = rooms.get(user.roomId);
      if (room) {
        // Remove user from room participants
        room.participants = room.participants.filter(p => p.socketId !== socket.id);
        
        // Notify others in the room
        socket.to(user.roomId).emit("user-left", {
          userId: user.userId,
          userName: user.userName,
          socketId: socket.id
        });
        
        // Clean up empty rooms
        if (room.participants.length === 0) {
          rooms.delete(user.roomId);
          console.log(`Room ${user.roomId} deleted - no participants`);
        }
      }
    }
    
    users.delete(socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 SkillSwap Video Server running on port ${PORT}`);
  console.log(`📹 Ready to handle video calls!`);
});