const User = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");

exports.signup = async (req, res, next) => {
  const { userName, email, password } = req.body;

  try {
    // Hash the password asynchronously
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({ userName, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: "User Created Successfully!" });
  } catch (error) {
    // Log the error for debugging
    console.error(error);

    // Pass the error to the next middleware (e.g. error handler)
    next(error);
  }
};
