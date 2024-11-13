const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRouter = require("./routes/authRoute.js");
dotenv.config();

const app = express();
app.use(express.json());

connectDB();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`You server is listing on ${port} !!`);
});

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
