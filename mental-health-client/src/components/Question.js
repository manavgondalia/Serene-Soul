import React from "react";

const QuestionCard = ({ question, onOptionSelect }) => {
	const options = [
		"Strongly Disagree",
		"Disagree",
		"Undecided",
		"Agree",
		"Strongly Agree",
	];

	const handleOptionClick = (option) => {
		onOptionSelect(option);
	};

	return (
		<div className="bg-[#f0b27c] shadow-md rounded-xl p-4 w-2/5 mx-auto h-64  font-grostek">
			<div className="p-1 box-border h-full border-2 border-black flex flex-col place-content-around">
				<h2 className="text-xl font-bold mb-2 text-center">{question}</h2>
				<div className="flex flex-wrap md:flex-row space-x-4 mx-auto">
					{options.map((option, index) => (
						<button
							key={index}
							className={`px-2 py-2 rounded-md text-sm hover:bg-gray-200 ${
								index === 0 ? "bg-red-200" : ""
							} ${index === options.length - 1 ? "bg-green-200" : ""}`}
							onClick={() => handleOptionClick(option)}
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
