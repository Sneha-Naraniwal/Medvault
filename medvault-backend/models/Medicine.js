const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batchNo: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["available", "disposed"], default: "available" },
  disposalConfirmedByVendor: { type: Boolean, default: false },
  disposalDate: { type: Date },
});

module.exports = mongoose.model("Medicine", medicineSchema);
