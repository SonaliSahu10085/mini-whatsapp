const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => console.log("MongoDb Connection Successful."))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const allChats = [
  {
    from: "Ajay",
    to: "Sonali",
    msg: "Hi from Ajay.",
    created_at: new Date(),
  },
  {
    from: "Sonali",
    to: "Ajay",
    msg: "Hi from Sonali.",
    created_at: new Date(),
  },
  {
    from: "Amit",
    to: "Ajay",
    msg: "Hi from Amit.",
    created_at: new Date(),
  },
  {
    from: "Ajay",
    to: "Amit",
    msg: "Hi from Ajay to Amit.",
    created_at: new Date(),
  },
  {
    from: "Ajay",
    to: "Deepa",
    msg: "Hi from Ajay to Deepa.",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
