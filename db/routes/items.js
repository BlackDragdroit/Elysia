const express = require("express");
const Item = require("../models/Item");
const InventoryItem = require("../models/InventoryItem");

const router = express.Router();

// Create an Item
router.post("/", async (req, res) => {
  try {
    const { userId, title, rewardId } = req.body;
    await Item.create({ userId, title, rewardId });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add an Item to a players Inventory
router.post("/mapInventoryItem", async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;
    await InventoryItem.create({
      userId,
      itemId,
      quantity,
    });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove an Item from a Players Inventory
router.post("/removeInventoryItem", async (req, res) => {
  try {
    const { userID, itemID } = req.body;
    await InventoryItem.findOneAndDelete({ userId: userID, itemId: itemID });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get every Item that exists
router.get("/", async (req, res) => {
  try {
    const items = Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get every Item a specific player has in his inventory
router.get("/:userId", async (req, res) => {
  try {
    const InventoryItems = await InventoryItem.find({
      userId: req.params.userId,
    });

    const itemIDs = InventoryItems.map((ii) => ii.itemId);

    const items = Item.find({ _id: { $in: itemIDs } });

    res.status(200).json(items);

    console.log(`Fetched ${items.length} bosses for user ${req.params.userId}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
