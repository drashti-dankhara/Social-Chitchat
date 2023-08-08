const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
    {
        message: {
            text: {
                type: String,
            },
            img: {
                type: String
            }
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Message", messageSchema);