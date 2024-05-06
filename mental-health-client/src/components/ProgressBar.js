import React from "react";

const ProgressBar = ({ currentQuestionIndex, totalQuestions }) => {
	// Calculate progress percentage
	const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

	return (
		<div className="mb-4 w-full bg-gray-200 rounded-full">
			<div
				className="h-2 bg-blue-500 rounded-full"
				style={{ width: `${progress}%` }}
			></div>
		</div>
	);
};

export default ProgressBar;
