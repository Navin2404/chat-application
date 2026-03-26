require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
// const { Server } = require(Socket.io);

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("../routes/auth"));
// app.use("/api/auth", require("./routes/messages"));

// socket.io logic


// mongodb connect panlam
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected successfully");
    server.listen(5000, () =>
      console.log("🚀 Server running on port 5000")
    );
  })
  .catch((err) => {
    console.error("❌ Database connection failed:");
    console.error(err);
  });




