const db = require("../db");

const getFormResponses = (req, res) => {
	const { email } = req.body;

	const sql = "SELECT batch, branch FROM fac_ad WHERE email = ?";

	db.query(sql, [email], (err, result) => {
		if (err) {
			return res.status(500).json({
				error: err.message,
			});
		}

		const { batch, branch } = JSON.parse(JSON.stringify(result))[0];
		// 2001CS44: here 20 is batch and CS is branch
		const sql = `SELECT * FROM form_response WHERE roll_no LIKE '${batch}__${branch}%'`;

		db.query(sql, (err, result) => {
			if (err) {
				return res.status(500).json({
					error: err.message,
				});
			}
			// convert the result to JSON and store in some variable
			const formResponses = JSON.parse(JSON.stringify(result));
			// console.log(formResponses);

			// Group form responses by rollNumber
			const groupedFormResponses = formResponses.reduce((acc, curr) => {
				if (!acc[curr.roll_no]) {
					acc[curr.roll_no] = {};
				}
				console.log(curr);
				acc[curr.roll_no][curr.question_id] = curr.question_response;
				return acc;
			}, {});

			// Transform grouped responses into the desired format
			const newData = Object.keys(groupedFormResponses).map((rollNumber) => {
				const responses = groupedFormResponses[rollNumber];
				const entry = { rollNumber };
				for (const questionID in responses) {
					entry[questionID] = responses[questionID];
				}
				return entry;
			});

			console.log(newData);

			res.json(newData);
		});
	});

	// db.query(sql, (err, result) => {
	// 	if (err) {
	// 		return res.status(500).json({
	// 			error: err.message,
	// 		});
	// 	}
	// 	// convert the result to JSON and store in some variable
	// 	const formResponses = JSON.parse(JSON.stringify(result));
	// 	// console.log(formResponses);

	// 	// Group form responses by rollNumber
	// 	const groupedFormResponses = formResponses.reduce((acc, curr) => {
	// 		if (!acc[curr.roll_no]) {
	// 			acc[curr.roll_no] = {};
	// 		}
	// 		console.log(curr);
	// 		acc[curr.roll_no][curr.question_id] = curr.question_response;
	// 		return acc;
	// 	}, {});

	// 	// Transform grouped responses into the desired format
	// 	const newData = Object.keys(groupedFormResponses).map((rollNumber) => {
	// 		const responses = groupedFormResponses[rollNumber];
	// 		const entry = { rollNumber };
	// 		for (const questionID in responses) {
	// 			entry[questionID] = responses[questionID];
	// 		}
	// 		return entry;
	// 	});

	// 	console.log(newData);

	// 	res.json(newData);
	// });
};

module.exports = { getFormResponses };
