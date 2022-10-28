const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    coverPicture: { type: String, default: "" },
    position: { type: String, default: "" },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    keyRef: { type: String, unique: true },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
