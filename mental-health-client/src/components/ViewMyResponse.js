import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const ViewMyResponse = () => {
	const [responses, setResponses] = useState([]);
	const [questionData, setQuestionData] = useState(null);
	const [isLoadingA, setIsLoadingA] = useState(true);
	const [isLoadingB, setIsLoadingB] = useState(true);

	const { currentUser } = useContext(AuthContext);

	// fetch roll number from email (email is of the form name_rollno@domain) and capitalize everything
	const rollNumber = currentUser.email
		.split("_")[1]
		.split("@")[0]
		.toUpperCase();

	const colorOptions = [
		"bg-red-200",
		"bg-yellow-200",
		"bg-blue-200",
		"bg-teal-200",
		"bg-green-200",
	];
	const options = [
		"Strongly Disagree",
		"Disagree",
		"Undecided",
		"Agree",
		"Strongly Agree",
	];

	useEffect(() => {
		// Fetch student responses from the backend
		axios
			.get(
				`${process.env.REACT_APP_SERVER_URL}/student/show-responses/${rollNumber}`
			)
			.then((response) => {
				setResponses(response.data);
				console.log(response.data);
				setIsLoadingA(false);
			})
			.catch((error) => {
				console.error("Error fetching student responses:", error);
			});
	}, [rollNumber]);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_SERVER_URL}/faculty-advisor/show-questions`)
			.then((response) => {
				// make a dictionary of question ID and question text
				let questionDict = {};
				response.data.forEach((question) => {
					questionDict[question.question_id] = question.question_text;
				});
				console.log(questionDict);
				setQuestionData(questionDict);
				setIsLoadingB(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="h-screen flex bg-gradient-to-bl from-fuchsia-300 to-pink-500 font-cabinet">
			<div className="max-w-4xl mx-auto h-2/3 overflow-scroll mt-36 p-4 bg-gray-100 rounded-xl ">
				{isLoadingA === true || isLoadingB === true ? (
					<h1>Loading...</h1>
				) : (
					<>
						<h2 className="text-xl font-bold mb-4">
							Student Responses for {rollNumber}
						</h2>
						<table className="w-full border-collapse border border-gray-300 table-fixed text-center">
							<thead>
								<tr>
									<th className="border border-gray-300 px-4 py-2">Question</th>
									<th className="border border-gray-300 px-4 py-2">
										Question Response
									</th>
								</tr>
							</thead>
							<tbody>
								{responses.map((response, index) => (
									<tr key={index}>
										<td className="border border-gray-300 px-4 py-2">
											{questionData[response.question_id]}
										</td>
										<td className="border border-gray-300 px-4 py-2">
											<span
												className={`px-2 py-2 rounded-md text-sm border-1 ${
													colorOptions[response.question_response - 1] ===
													undefined
														? "bg-gray-200"
														: colorOptions[response.question_response - 1]
												}`}
											>
												{options[response.question_response - 1] === undefined
													? response.question_response
													: options[response.question_response - 1]}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</>
				)}
			</div>
		</div>
	);
};

export default ViewMyResponse;
