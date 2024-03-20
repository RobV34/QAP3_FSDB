require("dotenv").config();

const express = require("express");
const app = express();
const menuRoutes = require("./routes/menu");
const path = require("path");
const methodOverride = require("method-override");
const menuDal = require("./services/menu.dal");

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Set up method-override
app.use(methodOverride("_method"));

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes

const menuDAL = require('./services/menu.dal'); // Adjust the path as necessary

app.get("/", async (req, res) => {
  try {
    // Retrieve menu items from the database
    const menuItems = await menuDAL.getMenuItems();
    // Render the landing page view and pass the menu items to it
    res.render("landing", { menuItems });
  } catch (err) {
    console.error(err);
    // Handle any errors that occur during fetching
    res.status(500).send("Server error while retrieving menu items.");
  }
});

app.get("/", (req, res) => {
  res.render("landing");
});

// Use the menuRoutes for anything going to '/menu'
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
