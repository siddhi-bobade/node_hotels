const express = require("express");
const app = express();
const db = require("./db");
require ('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
console.log("listening on port 3000"); 


// const Person = require("./models/person");
// const menuItem = require("./models/menuItem");


// GET route
app.get("/", function (req, res) {
    res.send("Welcome to my hotel!");
});

// Import the Routers files
const personRoutes = require("./routes/personRoutes");
const MenuItemsRoutes = require("./routes/menuItemRoutes");

// Use the routers
app.use("/persons",personRoutes);
app.use("/menuItems",MenuItemsRoutes);


// app.listen(3000, () => {
//     console.log("listening on port 3000");
// });
