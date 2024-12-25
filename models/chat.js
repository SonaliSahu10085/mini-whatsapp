const mongoose = require("mongoose");

//Primary Key By Default added> _id
const chatSchema = mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true,
  },
});

//collection
const Chat = mongoose.model("Chat", chatSchema); //chats

module.exports = Chat;


