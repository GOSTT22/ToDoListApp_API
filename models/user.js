const mongoose = require("mongoose");
const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: String,
  lastname: String,
  password: String,
  createdAt: { type: Date, required: true, default: Date.now },
});

module.exports = User;
