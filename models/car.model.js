const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    carModel: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    picNumber: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
