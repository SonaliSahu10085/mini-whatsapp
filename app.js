const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

const app = express();
app.listen("3000", function () {
  console.log("Server is listening on port 3000");
});

main()
  .then(() => console.log("MongoDb Connection Successful."))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.get("/", function (req, res) {
  res.render("index");
});

//index route > To Get All Chats
app.get("/chats", async function (req, res) {
  const chats = await Chat.find();
  res.render("home", { chats });
});

//new route > To render a form
app.get("/chat/new", function (req, res) {
  res.render("new");
});

//add new chat
app.post("/chats", function (req, res) {
  const { from, to, msg } = req.body;
  const newChat = new Chat({
    from,
    to,
    msg,
    created_at: new Date(),
  });

  newChat
    .save()
    .then(() => console.log("New Chat Created!"))
    .catch((err) => console.log(err));

  res.redirect("/chats");
});

//edit form route
app.get("/chat/:id/edit", async function (req, res) {
  const { id } = req.params;
  const chat = await Chat.findById(id);
  res.render("edit", { chat });
});

//update route
app.put("/chat/:id", async function (req, res) {
  const { id } = req.params;
  const { msg: newMsg } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  console.log("Chat Updated!", updatedChat);
  res.redirect("/chats");
});

//delete route
app.delete("/chat/:id", async function (req, res) {
  const { id } = req.params;
  const deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  console.log("Chat Deleted!");
  res.redirect("/chats");
});
