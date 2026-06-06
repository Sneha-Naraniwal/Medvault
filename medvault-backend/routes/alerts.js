const express = require("express");
const Alert = require("../models/Alert");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const filter = req.user.role === "agency"
      ? { createdBy: req.user._id }
      : { sentTo: req.user._id };
    const alerts = await Alert.find(filter).populate("medicine");
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "agency") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const { medicineId, sentToId, message, type } = req.body;
  try {
    const alert = await Alert.create({
      medicine: medicineId,
      sentTo: sentToId,
      createdBy: req.user._id,
      message,
      type,
    });
    res.json(alert);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
