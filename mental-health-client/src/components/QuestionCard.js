import React, { useState } from "react";

const QuestionCard = ({ questionText, onOptionSelect, questionType }) => {
	const [response, setReponse] = useState("");

	const options = [
		"Strongly Disagree",
		"Disagree",
		"Undecided",
		"Agree",
		"Strongly Agree",
	];

	const colorOptions = [
		"hover:bg-red-200",
		"hover:bg-yellow-200",
		"hover:bg-blue-200",
		"hover:bg-teal-200",
		"hover:bg-green-200",
	];

	const handleQuestionResponseEdit = (reponse) => {
		console.log(reponse);
		setReponse(reponse);
		onOptionSelect(reponse);
	};

	return (
		<div className="bg-gradient-to-l from-yellow-300 to-teal-200 shadow-md rounded-xl p-4 w-full mx-auto h-64 font-cabinet">
			<div className="p-1 box-border h-full border-2 border-black flex flex-col place-content-center">
				<h2 className="text-xl font-bold mb-2 text-center h-14 px-2">
					{questionText}
				</h2>
				<div className="flex flex-wrap md:flex-row space-x-4 mx-auto">
					{questionType === 1 ? (
						options.map((option, index) => (
							<button
								key={index}
								className={`px-2 py-2 rounded-md text-sm border-1 ${colorOptions[index]}`}
								onClick={() => handleQuestionResponseEdit(index + 1)}
							>
								{option}
							</button>
						))
					) : (
						<div className="">
							<textarea
								id="response"
								name="response"
								value={response}
								onChange={(e) => handleQuestionResponseEdit(e.target.value)}
								className="p-2 block border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
								rows="3"
								cols="50"
								placeholder="Enter your new question..."
								required
							></textarea>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default QuestionCard;
