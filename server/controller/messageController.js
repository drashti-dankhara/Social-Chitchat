const Message = require("../models/messageModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'djzifhgu4',
    api_key: '797676925462281',
    api_secret: 'DFsq5RtsBk-fgNNiY7u61qZ5POE'
});

const addMessage = async (req, res) => {
    try {
        const file = req.files.img;
        console.log(file);
        await cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
            // console.log("Hello");
            const { from, to, message } = req.body;
            const data = new Message({
                message: { text: message, img: result.url },
                users: { from, to },
                sender: from,
            });
            await data.save().then((d) => {
                res.status(200).send({ success: true, msg: "message Added successfully!" });
            }).catch((e) => {
                res.status(200).send({ success: false, msg: "Failed to add message to the database" })
            })
        })

    } catch (error) {
        res.status(500).send({ success: false, msg: error.Message })
    }
}

const getAllMessage = async (req, res) => {
    try {
        const { from, to } = req.body;
        await Message.find({
            $or: [{
                $and: [
                    { "users.from": from },
                    { "users.to": to }
                ]
            },
            {
                $and: [
                    { "users.from": to },
                    { "users.to": from }
                ]
            }
            ]
        }).sort({ updatedAt: 1 }).then((data) => {
            const projectedMessages = data.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                    img: msg.message.img
                };
            });
            res.status(200).send({ success: true, data: projectedMessages })
        }).catch((e) => {
            console.log(e.message)
            res.status(200).send({ success: false, msg: e.Message })
        });
    } catch (error) {
        res.status(500).send({ success: false, msg: error.Message })
    }
}


module.exports = {
    addMessage,
    getAllMessage
}