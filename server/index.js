const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
connectDB();
app.get("/", (req, res) => {
  res.send("Good Boy");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`You server is listing on ${port} !!`);
});
