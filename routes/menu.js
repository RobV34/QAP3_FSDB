const express = require('express');
const router = express.Router();
const menuService = require('../services/menu.dal');

// Route to display all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await menuService.getAllMenuItems();
    res.render('menu', { menuItems });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

