import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  name: { type: String, required: true },

  category: {
    type: String,
    required: true,
    enum: ["resin", "non-resin"],
  },

  subCategory: { type: String },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  isCustomizable: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
