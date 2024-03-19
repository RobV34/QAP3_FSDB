const { Pool } = require('pg');
const pool = new Pool({
  // your database configuration
});

const getAllMenuItems = async () => {
  const { rows } = await pool.query('SELECT * FROM menu_items WHERE available = TRUE');
  return rows;
};

module.exports = {
  getAllMenuItems,
};
