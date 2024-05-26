import React, { useContext, useEffect, useState } from "react";
import {
	FaRegArrowAltCircleRight,
	FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const QuestionIterator = () => {
	const [questionSourceData, setQuestionSourceData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_SERVER_URL}/student/questions`)
			.then((response) => {
				console.log(response.data);
				setQuestionSourceData(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [questionResponses, setQuestionResponses] = useState({});

	const goToPreviousQuestion = () => {
		setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
	};

	const goToNextQuestion = () => {
		setCurrentIndex((prevIndex) =>
			Math.min(prevIndex + 1, questionSourceData.length - 1)
		);
	};

	const handleIndexChange = (index) => {
		if (typeof index !== "number" || isNaN(index)) return;
		const newIndex = Math.min(
			Math.max(index, 0),
			questionSourceData.length - 1
		);
		setCurrentIndex(newIndex);
	};

	const handleResponseChange = (response) => {
		setQuestionResponses((prevResponses) => ({
			...prevResponses,
			[currentIndex + 1]: response,
		}));
		console.log(questionResponses);
	};

	const submitSurvey = () => {
		// email is of the format name_rollNumber@domain
		// extract roll number in capital letters from email

		const rollNumber = currentUser.email
			.split("_")[1]
			.split("@")[0]
			.toUpperCase();
		console.log(questionResponses, rollNumber);

		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/student/submit-survey`, {
				answers: questionResponses,
				rollNumber: rollNumber,
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="h-screen font-cabinet bg-gradient-to-br from-red-100 to-amber-100 flex">
			{isLoading ? (
				<div className="h-fit mt-20 mx-auto w-2/5 flex flex-col">
					Loading...
				</div>
			) : (
				<div className="h-fit mt-32 mx-auto w-2/5 flex flex-col">
					<input
						value={currentIndex + 1}
						pattern="[0-9]*"
						onChange={(e) => handleIndexChange(e.target.value - 1)}
						className="p-2 border-2 border-black w-1/12 mx-auto rounded-lg mb-4 text-center"
					></input>
					<ProgressBar
						currentQuestionIndex={currentIndex}
						totalQuestions={questionSourceData.length}
					/>
					<QuestionCard
						questionText={questionSourceData[currentIndex].question_text}
						onOptionSelect={handleResponseChange}
						questionType={questionSourceData[currentIndex].question_type}
					/>
					<div className="flex justify-around mt-8">
						<button
							onClick={goToPreviousQuestion}
							disabled={currentIndex === 0}
							className={`${
								currentIndex === 0
									? "bg-gray-300"
									: "bg-[#59CEBE] hover:bg-[#50baac]"
							} text-gray-600 font-bold p-3 rounded-full`}
						>
							<FaRegArrowAltCircleLeft className="text-3xl" />
						</button>
						{currentIndex === questionSourceData.length - 1 ? (
							<button
								className="py-2 px-4 rounded-full bg-[#5dff75] hover:bg-[#59ec6f]"
								onClick={submitSurvey}
							>
								<span>Submit</span>
							</button>
						) : null}
						<button
							onClick={goToNextQuestion}
							disabled={currentIndex === questionSourceData.length - 1}
							className={`${
								Object.keys(questionResponses).length ===
								questionSourceData.length
									? "bg-gray-300"
									: "bg-[#59CEBE] hover:bg-[#50baac]"
							} text-gray-600 font-bold p-3 rounded-full`}
						>
							<FaRegArrowAltCircleRight className="text-3xl" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default QuestionIterator;
