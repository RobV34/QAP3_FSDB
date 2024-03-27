const pool = require("./db.js");

// Get all menu items
async function getMenuItems() {
  try {
    const res = await pool.query("SELECT * FROM menu_items");
    return res.rows.map((row) => ({
      ...row,
      price: parseFloat(row.price),
    }));
  } catch (err) {
    throw err;
  }
}

// Get a single menu item by ID
async function getMenuItemById(id) {
  try {
    const res = await pool.query("SELECT * FROM menu_items WHERE id = $1", [
      id,
    ]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

// Create a new menu item
async function createMenuItem(name, description, price) {
  try {
    const res = await pool.query(
      "INSERT INTO menu_items (name, description, price) VALUES ($1, $2, $3) RETURNING *",
      [name, description, price]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

// Update a menu item by ID
async function updateMenuItem(id, name, description, price) {
  try {
    const res = await pool.query(
      "UPDATE menu_items SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *",
      [name, description, price, id]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

// Delete a menu item by ID
async function deleteMenuItem(id) {
  try {
    await pool.query("DELETE FROM menu_items WHERE id = $1", [id]);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
