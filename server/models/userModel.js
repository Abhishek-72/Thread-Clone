const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    profilePic: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=1024x1024&w=is&k=20&c=ZVVVbYUtoZgPqbVSDxoltjnrW3G_4DLKYk6QZ0uu5_w=",
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    reposts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
