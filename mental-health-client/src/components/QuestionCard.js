import React, { useState } from "react";

const QuestionCard = ({ questionText, onOptionSelect }) => {
	const [chosenOption, setChosenOption] = useState(0);

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

	const handleOptionClick = (option) => {
		console.log(option);
		setChosenOption(option);
		onOptionSelect(option);
	};

	return (
		<div className="bg-gradient-to-l from-yellow-300 to-teal-200 shadow-md rounded-xl p-4 w-full mx-auto h-64  font-cabinet">
			<div className="p-1 box-border h-full border-2 border-black flex flex-col place-content-around">
				<h2 className="text-xl font-bold mb-2 text-center h-14 px-2">
					{questionText}
				</h2>
				<div className="flex flex-wrap md:flex-row space-x-4 mx-auto">
					{options.map((option, index) => (
						<button
							key={index}
							className={`px-2 py-2 rounded-md text-sm border-1 ${colorOptions[index]}`}
							onClick={() => handleOptionClick(index + 1)}
						>
							{option}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default QuestionCard;
