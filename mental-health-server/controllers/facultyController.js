const db = require("../db");

const getFormResponses = (req, res) => {
	const sql = "SELECT * FROM form_response ORDER by question_id";

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
};

module.exports = { getFormResponses };
