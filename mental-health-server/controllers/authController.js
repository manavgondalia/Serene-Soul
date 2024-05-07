const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerStudent = (req, res) => {
	// check whether user already exists

	const {
		email,
		password,
		firstName,
		lastName,
		rollNumber,
		gender,
		contactNumber,
	} = req.body;

	const sql = "SELECT * FROM users WHERE email = ?";
	db.query(sql, [email], (err, result) => {
		if (err) {
			return res.status(500).json({
				message: "Internal Server Error",
				error: err,
			});
		}

		if (result.length > 0) {
			return res.status(409).json({
				message: "Student already exists",
			});
		}

		// hash the password and create a user
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const sql = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";

		db.query(sql, [email, hashedPassword, 1], (err, result) => {
			if (err) {
				return res.status(500).json({
					message: "Internal Server Error",
					error: err,
				});
			}
			const sql_student =
				"INSERT INTO student (roll_no, first_name, last_name, email, gender, contact_no) VALUES (?, ?, ?, ?, ?, ?)";
			db.query(
				sql_student,
				[rollNumber, firstName, lastName, email, gender, contactNumber],
				(err, result) => {
					if (err) {
						return res.status(500).json({
							message: "Internal Server Error",
							error: err,
						});
					}
					return res.status(201).json({
						message: "Student created successfully",
						token: jwt.sign({ email: req.body.email }, "jwtkey", {
							expiresIn: "30d",
						}),
						email: email,
						role: 1,
					});
				}
			);
		});
	});
};

const login = (req, res) => {
	// check whether user exists

	const { email, password } = req.body;
	const sql = "SELECT * FROM users WHERE email = ?";

	db.query(sql, [email], (err, result) => {
		if (err) {
			return res.status(500).json({
				message: "Internal Server Error",
				error: err,
			});
		}

		if (result.length === 0) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		const user = result[0];
		const isPasswordCorrect = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				message: "Invalid password",
			});
		}

		const token = jwt.sign({ email: result[0].email }, "jwtkey", {
			expiresIn: "30d",
		});
		res.status(200).json({
			message: "Login successful!",
			token: jwt.sign({ email: req.body.email }, "jwtkey", {
				expiresIn: "30d",
			}),
			email: email,
			role: user.role,
		});
	});
};

const logout = (req, res) => {};

module.exports = { registerStudent, login, logout };
