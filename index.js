const express = require("express");
const app = express();
const menuRoutes = require("./routes/menu");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
