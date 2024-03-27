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

router.get("/add/", (req, res) => {
  res.render("add_menu_item");
});

router.get("/edit/:id", async (req, res) => {
  try {
    const item = await menuDAL.getMenuItemById(req.params.id);
    res.render("edit-menu-item", { item }); // You need to create this view
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const item = await menuDAL.getMenuItemById(req.params.id);
    if (!item) {
      // Handle the case where the item doesn't exist
      res.status(404).send("Item not found.");
    } else {
      // Make sure the price is a number
      item.price = parseFloat(item.price);
      res.render("delete-menu-item", { item });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
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
    await menuDAL.deleteMenuItem(req.params.id);
    res.redirect("/menu"); // Or another appropriate response
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
