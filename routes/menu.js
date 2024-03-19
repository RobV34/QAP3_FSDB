const express = require("express");
const router = express.Router();
const menuDAL = require("../services/menu.dal");

// This route should be '/' since you're mounting it on '/menu' in your main server file
router.get("/", async (req, res) => {
  try {
    const menuItems = await menuDAL.getMenuItems();
    res.render("menu", { menuItems }); // 'menu' here refers to menu.ejs in your views folder
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;


