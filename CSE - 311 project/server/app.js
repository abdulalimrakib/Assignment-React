const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
   origin:'http://localhost:5173',
  // origin:'https://auth-project-client.vercel.app',
  credentials:true,
}))
app.use(cookieParser());

require("./config/table");

const userRouter = require("./routes/user.routes")
const jobRouter = require("./routes/job.routes")
const applicationRouter = require("./routes/application.routes")

app.use("/api/user", userRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);

app.get("/", (req, res) => {
  res.send("home page");
});

module.exports = app;
