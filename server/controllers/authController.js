const User = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { userName, email, password } = req.body;

  try {
    // Hash the password asynchronously
    const hashedPassword = bcryptjs.hashSync(password, 10);

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

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) return next(errorHandler(404, "User not found !"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials !"));

    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
