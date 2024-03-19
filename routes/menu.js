const express = require('express');
const router = express.Router();
const menuDal = require('../services/menu.dal');

// Route to get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await menuDal.getMenuItems();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new menu item
router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newMenuItem = await menuDal.createMenuItem(name, description, price);
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


