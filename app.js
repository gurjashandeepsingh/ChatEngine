require(`dotenv`).config();
const express = require(`express`);
const app = express();
const userRoutes = require(`./routes/userRoutes`);
const chatRoutes =  require(`./routes/chatroutes`);
const messageRoutes = require(`./routes/messageRoutes`);
const {initDatabase} = require("./models/init.js")
const { centralDatabase, databaseInitOptions } = require("./config/dbConfig");
const chatUserMapModel = require("./models/chatUserMapModel");
console.log(initDatabase)

//Asynchronously initialize the database
initDatabase(centralDatabase, databaseInitOptions).catch((err) => {
  console.log(err)
  console.log(err, "An error occured while initializing the database")
})

// Defining the Routes 
app.use(`/api/user`, userRoutes);
app.use(`/api/chat`, chatRoutes);
app.use(`/api/message`, messageRoutes);

app.get(`/`, (req, res) => {
  res.send(`Hello`);
  console.log(`Hello`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT - ${process.env.PORT}`);
});

module.exports = {initDatabase}

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//     // credentials: true,
//   },
// });

// // Socket.io 

// // Will make the connection with request coming from Frontend. 
// io.on("connection", (socket) => {
//   console.log("Connected to socket.io");
//   // We'll create a new Socket where Frontend will send userData and this socket will have it's own id. 
//   socket.on("setup", (userData) => {
//     // We'll create a new room with the help of id of userData 
//     // This Room will be exclusive to that particular User only 
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   // We'll create a similar Socket on our Server
//   // When we click on any particular chat, it should create a room with that particular User
// socket.on("join chat", (room) => {
//     // Creating a new room with the id of selectedChat
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });

//   //If want to include Typing and NotTyping, uncomment 2 lines below 
  
//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   // Creating new socket 
//   // This "new message" will be emitted from Frontend and we'll have to catch it by listening 
//   socket.on("new message", (newMessageRecieved) => {
//     // Check which chat this message belongs to 
//     var chat = newMessageRecieved.chat;
//     // If that chat doesn't have any users 
//     if (!chat.users) return console.log("chat.users not defined");
//     // In a groupChat we would need to emit this message except the current Logged in User 
//     chat.userId.forEach((user) => {

//       //{ Replace Chat.users in Line 60 with ChatUser Model and run .map and get Chatid}

//       if (userId == newMessageRecieved.sender) return;
//       // Emit this message to all other userIds 
//       socket.in(userId).emit("message recieved", newMessageRecieved);
//     });
//   });
//   // When user will be disconnected 
//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   });
// });

