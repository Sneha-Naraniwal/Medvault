const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// ...your other user/vendor routes here...

// PATCH /api/users/me -- profile update for logged-in user
router.patch("/me", auth, async (req, res) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;
    // Allow role change only if you want, or comment next 3 lines for safety
    if (req.body.role && ["agency", "vendor"].includes(req.body.role)) {
      updates.role = req.body.role;
    }
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed", error: err.message });
  }
});
// GET /api/users/vendors -- returns all vendor users for agency
router.get("/vendors", auth, async (req, res) => {
  if (req.user.role !== "agency") {
    return res.status(403).json({ message: "Unauthorized" }); // only agency allowed
  }
  try {
    const vendors = await User.find({ role: "vendor" }).select("name email");
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
