const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    text: { type: String, required: true }
},
    { timestamps: true }
);

mudule.exports = mongoose.model("Message", messageSchema)