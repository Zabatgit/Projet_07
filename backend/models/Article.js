const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    userId: { type: String, default: "" },
    description: { type: String, required: true, default: "" },
    imageUrl: { type: String, default: "" },
    likes: { type: Number, default: 0 },
    usersLiked: [{ type: String }],
    comments: [{}],
    keyRef: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
