require("dotenv").config();

const express = require("express");
const app = express();
const menuRoutes = require("./routes/menu");

// Set the view engine to ejs
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Martha's Good Eats!");
});

// Use the menuRoutes for anything going to '/menu'
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
