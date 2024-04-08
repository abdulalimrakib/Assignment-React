const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/table");

const accountRoute = require("./controller/account.route")

app.use("/account", accountRoute)

app.get("/", (req, res) => {
  res.send("home page");
});

module.exports = app;
