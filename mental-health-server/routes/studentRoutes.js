const express = require("express");
const {
	getQuestions,
	submitSurvey,
	showResponses,
} = require("../controllers/studentControllers");

router = express.Router();

router.get("/", (req, res) => {
	res.send("Welcome student!");
});

router.get("/questions", getQuestions); // for the asking part
router.post("/submit-survey", submitSurvey);
router.get("/show-responses/:rollNumber", showResponses); // for the hover

module.exports = router;
