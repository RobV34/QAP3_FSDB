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

router.get("/add", (req, res) => {
  res.render("add_menu_item");
});

// This would be in your routes/menu.js file.

router.get("/api/menu", async (req, res) => {
  try {
    const menuItems = await menuDAL.getMenuItems();
    res.json(menuItems);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error while retrieving menu items." });
  }
});

router.post("/api/menu", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newMenuItem = await menuDAL.createMenuItem(name, description, price);
    res.status(201).json(newMenuItem);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error while creating a menu item." });
  }
});

router.put("/api/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const updatedMenuItem = await menuDAL.updateMenuItem(
      id,
      name,
      description,
      price
    );
    if (updatedMenuItem) {
      res.json(updatedMenuItem);
    } else {
      res.status(404).json({ message: "Menu item not found." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error while updating a menu item." });
  }
});

router.patch("/api/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const itemToUpdate = await menuDAL.getMenuItemById(id);
    if (itemToUpdate) {
      const updatedName = name !== undefined ? name : itemToUpdate.name;
      const updatedDescription =
        description !== undefined ? description : itemToUpdate.description;
      const updatedPrice = price !== undefined ? price : itemToUpdate.price;

      const updatedMenuItem = await menuDAL.updateMenuItem(
        id,
        updatedName,
        updatedDescription,
        updatedPrice
      );
      res.json(updatedMenuItem);
    } else {
      res.status(404).json({ message: "Menu item not found." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error while patching a menu item." });
  }
});

router.delete("/api/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await menuDAL.deleteMenuItem(id);
    res.status(204).send(); // 204 No Content
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error while deleting a menu item." });
  }
});

module.exports = router;
