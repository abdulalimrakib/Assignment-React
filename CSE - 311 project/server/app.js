const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/table");

const accountRoute = require("./controller/account.route")
const userRoute = require("./controller/user.route")

app.use("/account", accountRoute)
app.use("/user", userRoute)

app.get("/", (req, res) => {
  res.send("home page");
});

module.exports = app;
