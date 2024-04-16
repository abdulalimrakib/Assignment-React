const { register, login, logout } = require("../controller/user.controller");
const { verifyToken } = require("../config/authentication");

const router = require("express").Router();

router.post("/register", register)
router.post("/login", login)
router.get("/logout",verifyToken, logout)

module.exports = router