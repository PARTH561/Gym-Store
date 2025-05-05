const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create Order
router.post("/add", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order added", Order: newOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Orders
router.get("/", async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(200).json(Orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Order
router.put("/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Order updated", updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Order
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
