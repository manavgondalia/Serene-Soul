const express = require("express");

const { getFormResponses } = require("../controllers/facultyController");
const { showQuestions } = require("../controllers/picController");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Welcome faculty advisor!");
});

router.post("/form-responses", getFormResponses);
router.get("/show-questions", showQuestions); // for the hover

module.exports = router;
