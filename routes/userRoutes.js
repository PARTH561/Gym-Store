const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create User
router.post("/add", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User added", User: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Users
router.get("/", async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update User
router.put("/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "User updated", updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
