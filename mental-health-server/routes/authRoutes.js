const express = require("express");
const {
	registerStudent,
	login,
	logout,
} = require("../controllers/authController");

router = express.Router();

router.get("/", (req, res) => {
	res.send("Welcome to auth!");
});

router.post("/register-student", registerStudent);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
