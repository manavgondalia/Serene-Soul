import React from "react";

const ProgressBar = ({ currentQuestionIndex, totalQuestions }) => {
	// Calculate progress percentage
	const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

	return (
		<div className="mb-8 w-full bg-white rounded-full">
			<div
				className="h-4 bg-yellow-300 rounded-full"
				style={{ width: `${progress}%` }}
			></div>
		</div>
	);
};

export default ProgressBar;
