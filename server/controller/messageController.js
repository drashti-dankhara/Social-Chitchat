const Message = require("../models/messageModel");

const addMessage = async (req, res) => {
    try {
        // console.log("Hello");
        const { from, to, message } = req.body;
        const data = await Message.create({
            message: { text: message },
            users: { from, to },
            sender: from,
        });
        if (data) {
            res.status(200).send({ success: true, msg: "message Added successfully!" });
        }
        else {
            res.status(200).send({ success: false, msg: "Failed to add message to the database" })
        }
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