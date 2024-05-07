const express = require("express");

const {
	addQuestion,
	addFA,
	showFA,
	showQuestions,
	deleteFA,
	addPic,
} = require("../controllers/picController");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Welcome PIC Wellness!");
});

router.post("/add-question", addQuestion);
router.post("/add-fa", addFA);
router.get("/show-fa", showFA);
router.delete("/delete-fa", deleteFA);
router.get("/show-questions", showQuestions);
// router.post("/add-pic", addPic);

module.exports = router;
