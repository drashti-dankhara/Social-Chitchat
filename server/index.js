const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser")

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


require("dotenv").config();
const userRoutes = require("./routes/userRoutes");


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


app.listen(process.env.PORT, () =>
    console.log(`Server is Running on ${process.env.PORT}`)
)



