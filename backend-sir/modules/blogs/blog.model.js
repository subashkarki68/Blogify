const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      required: true,
    },
    content: { type: String, required: true },
    pictureUrl: { type: String },
    duration: { type: Number, min: 1, default: 1 },
  },
  {
    timestamps: true,
  }
);

module.exports = new model("Blog", blogSchema);
