const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser")
const socket = require("socket.io");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoute");


//Connection to Mongodb----------
const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected To ChitChat !!!");
    } catch (error) {
        console.log("Error in connection : ", error);
    }
}
connectToMongo();
//-----------------------------

const fileUpload = require("express-fileupload");

app.use(fileUpload({
    useTempFiles: true
}))

//static route

app.use("/api", userRoutes);
app.use("/api", messageRoutes);
app.use("/", (req, res) => {
    res.send("hello ChitChat..!")
})


const server = app.listen(process.env.PORT, () =>
    console.log(`Server is Running on ${process.env.PORT}`)
);

// ----------------- Socket.io -------------------

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        Credentials: true
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        console.log("sendMsg : ", data)
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    })

    socket.on("send-img", (data) => {
        console.log("sendImg : ", data)
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("img-recieve", data.img);
        }
    })
})

