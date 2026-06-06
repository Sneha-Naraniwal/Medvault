// routes/meds.js
const express = require("express");
const Medicine = require("../models/Medicine");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// Get medicines filtered by user role
router.get("/", auth, async (req, res) => {
  try {
    let filter;
    if (req.user.role === "agency") {
      filter = { addedBy: req.user._id };
    } else if (req.user.role === "vendor") {
      filter = { vendor: req.user._id };
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const medicines = await Medicine.find(filter).populate("vendor", "name email");
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add medicine (agency only)
// Example in your /routes/meds.js

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "agency")
    return res.status(403).json({ message: "Unauthorized" });

  console.log("Add medicine request body:", req.body);

  try {
    const { name, batchNo, quantity, expiryDate, vendor } = req.body;

    if (!vendor) return res.status(400).json({ message: "Vendor is required" });
    if (!name || !batchNo || !quantity || !expiryDate)
      return res.status(400).json({ message: "Missing required fields" });

    const medicine = new Medicine({
      name,
      batchNo,
      quantity,
      expiryDate,
      vendor,          // explicitly assign vendor here
      addedBy: req.user._id,
    });

    await medicine.save();

    res.json(medicine);
  } catch (error) {
    console.error("Error adding medicine:", error);
    res.status(500).json({ message: "Server error adding medicine", error: error.message });
  }
});

// Vendor confirms disposal
router.patch("/:id/dispose", auth, async (req, res) => {
  if (req.user.role !== "vendor") return res.status(403).json({ message: "Unauthorized" });

  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    if (medicine.vendor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not your medicine" });

    medicine.status = "disposed";
    medicine.disposalConfirmedByVendor = true;
    medicine.disposalDate = new Date();
    await medicine.save();

    res.json({ message: "Disposal confirmed", medicine });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
