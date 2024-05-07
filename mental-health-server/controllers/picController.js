const express = require("express");
const db = require("../db");
const bcrypt = require("bcryptjs");

const addQuestion = (req, res) => {
	const { questionText } = req.body;
	console.log(questionText);
	const sql = "INSERT INTO questions (question_text) VALUES (?)";

	db.query(sql, [questionText], (err, result) => {
		if (err) {
			return res.status(500).json({
				error: err.message,
			});
		}
		res.json({
			message: "Question added successfully!",
		});
	});
};

const addFA = (req, res) => {
	const { email, batch, branch, course, name, password } = req.body;

	const sql =
		"INSERT INTO fac_ad (email, batch, branch, course, name) VALUES (?, ?, ?, ?, ?)";

	db.query(sql, [email, batch, branch, course, name], (err, result) => {
		if (err) {
			return res.status(500).json({
				error: err.message,
			});
		}
		const sql = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);

		db.query(sql, [email, hashedPassword, 2], (err, result) => {
			if (err) {
				return res.status(500).json({
					error: err.message,
				});
			}
			res.json({
				message: "Faculty Advisor added successfully!",
			});
		});
	});
};

const showFA = (req, res) => {
	const sql = "SELECT * FROM fac_ad";

	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).json({
				error: err.message,
			});
		}
		const fa = JSON.parse(JSON.stringify(result));
		res.json(fa);
	});
};

const showQuestions = (req, res) => {
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

const deleteFA = (req, res) => {
	const { email } = req.body;

	const sql = "DELETE FROM fac_ad WHERE email = ?";

	db.query(sql, [email], (err, result) => {
		if (err) {
			return res.status(500).json({
				error: err.message,
			});
		}
		res.json({
			message: "Faculty Advisor deleted successfully!",
		});
	});
};

const addPic = (req, res) => {
	const { email, password } = req.body;

	const sql = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";

	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);

	db.query(sql, [email, hashedPassword, 3], (err, result) => {
		if (err) {
			return res.status(500).json({
				error: err.message,
			});
		}
		res.json({
			message: "PIC Wellness added successfully!",
		});
	});
};

module.exports = {
	addQuestion,
	addFA,
	showFA,
	showQuestions,
	deleteFA,
	addPic,
};
