const express = require("express");
const db = require("../db");

const getQuestions = (req, res) => {
	const sql = "SELECT * FROM questions";

	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).json({
				error: err.message,
			});
		}
		const questions = JSON.parse(JSON.stringify(result));
		res.json(questions);
	});
};

const submitSurvey = (req, res) => {
	const { rollNumber, answers } = req.body;
	console.log(answers);
	const sql =
		"INSERT INTO form_response (roll_no, question_id, question_response) VALUES (?, ?, ?)";

	// answers is a json object like {question_id: question_response}
	// We need to convert it to an array of arrays like [[question_id, question_response], [question_id, question_response]]
	const answersArray = Object.entries(answers).map(
		([question_id, question_response]) => [
			rollNumber,
			question_id,
			question_response,
		]
	);

	console.log(answersArray);

	completedQueries = 0;

	// We need to insert multiple rows into the survey table
	answersArray.forEach((row) => {
		// Execute the SQL query for each row of data
		db.query(sql, row, (err, result) => {
			if (err) {
				// If an error occurs, handle it appropriately
				console.error("Error inserting data into the database:", err);
				// Optionally, you can return an error response to the client
				return res.status(500).json({ error: "Internal server error" });
			}
			completedQueries++;
			if (completedQueries === answersArray.length) {
				// If all queries are completed, send a success response
				res.json({ message: "Survey submitted successfully" });
			}
		});
	});
};

const showResponses = (req, res) => {
	const { rollNumber } = req.params;
	console.log(rollNumber);
	const sql = "SELECT * FROM form_response WHERE roll_no = ?";

	db.query(sql, rollNumber, (err, result) => {
		if (err) {
			return res.status(500).json({
				error: err.message,
			});
		}
		const responses = JSON.parse(JSON.stringify(result));
		res.json(responses);
	});
};

module.exports = { getQuestions, submitSurvey, showResponses };
