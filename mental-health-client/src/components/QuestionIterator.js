import React, { useState } from "react";
import {
	FaRegArrowAltCircleRight,
	FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";

const QuestionIterator = () => {
	const questionSourceData = [
		{
			questionID: 1,
			questionText:
				"I think I have a particular meaning and purpose of my life.",
		},
		{
			questionID: 2,
			questionText: "I have happy memories of the past.",
		},
		{
			questionID: 3,
			questionText: "I am very much satisfied about everything in my life.",
		},
		{
			questionID: 4,
			questionText:
				"In general, I feel I am in charge of the situation in which I live.",
		},
		{
			questionID: 5,
			questionText: "In most ways my life is close to my ideal.",
		},
		{
			questionID: 6,
			questionText: "The conditions of my life are excellent.",
		},
		{
			questionID: 7,
			questionText: "So far, I have the important things I want in life.",
		},
		{
			questionID: 8,
			questionText:
				"If I could live my life over, I would change almost nothing.",
		},
		{
			questionID: 9,
			questionText:
				"In many ways, I feel contented about my achievements in life.",
		},
		{
			questionID: 10,
			questionText: "I am living the kind of life I wanted to.",
		},
		{
			questionID: 11,
			questionText: "I find it easy to make decisions.",
		},
		{
			questionID: 12,
			questionText:
				"In my daily life, I get the chance to show how capable I am.",
		},
		{
			questionID: 13,
			questionText: "I feel positive and creative.",
		},
		{
			questionID: 14,
			questionText: "I find I can think quite clearly.",
		},
		{
			questionID: 15,
			questionText:
				"I am quite good at managing responsibilities of my daily life.",
		},
		{
			questionID: 16,
			questionText:
				"For me, life has been a continuous process of learning, changing, and growth.",
		},
		{
			questionID: 17,
			questionText: "I feel that I am capable of working hard.",
		},
		{
			questionID: 18,
			questionText:
				"I feel eager to tackle my daily tasks or make new decisions.",
		},
		{
			questionID: 19,
			questionText:
				"I feel I can easily handle or cope with any serious problem.",
		},
		{
			questionID: 20,
			questionText:
				"I think it is important to have new experiences that challenge how you think about yourself and the world.",
		},
		{
			questionID: 21,
			questionText: "I take immense interest in other people.",
		},
		{
			questionID: 22,
			questionText: "I always keep committed and involved.",
		},
		{
			questionID: 23,
			questionText: "I have an adjusting nature and sense of belongingness.",
		},
		{
			questionID: 24,
			questionText: "I feel I must do what others expect me to do.",
		},
		{
			questionID: 25,
			questionText:
				"People would describe me as a giving person, willing to share my time with others.",
		},
		{
			questionID: 26,
			questionText: "I have a good influence on life.",
		},
		{
			questionID: 27,
			questionText: "It is always necessary that others approve of what I do.",
		},
		{
			questionID: 28,
			questionText: "Maintaining close relationships gives pleasure to me.",
		},
		{
			questionID: 29,
			questionText: "I experience warm and trusting relationships with others.",
		},
		{
			questionID: 30,
			questionText:
				"I believe that people are essentially good and can be trusted.",
		},
		{
			questionID: 31,
			questionText: "I remain energetic, active, and vigorous the whole day.",
		},
		{
			questionID: 32,
			questionText: "The thought of an accident doesn't affect me.",
		},
		{
			questionID: 33,
			questionText: "Tension in life doesn't affect my health.",
		},
		{
			questionID: 34,
			questionText: "I have no difficulty in sleeping.",
		},
		{
			questionID: 35,
			questionText: "I keep myself busy the whole day.",
		},
		{
			questionID: 36,
			questionText: "Illness doesn't affect my mental health.",
		},
		{
			questionID: 37,
			questionText: "I feel rested when I wake up in the morning.",
		},
		{
			questionID: 38,
			questionText:
				"Talking or thinking about my illness doesn't make any difference to me.",
		},
		{
			questionID: 39,
			questionText:
				"Usually I don't feel tired, worn out, used up, or exhausted.",
		},
		{
			questionID: 40,
			questionText: "Age-related problems are part of life.",
		},
		{
			questionID: 41,
			questionText: "Personal relationships give me pleasure.",
		},
		{
			questionID: 42,
			questionText: "I enjoy the company of other people.",
		},
		{
			questionID: 43,
			questionText: "I enjoy my personal achievements.",
		},
		{
			questionID: 44,
			questionText:
				"I perform useful activities like reading, gardening, etc., in my leisure time.",
		},
		{
			questionID: 45,
			questionText: "I have no hesitation in talking to anyone.",
		},
		{
			questionID: 46,
			questionText: "I like to do any task at the right place and right time.",
		},
		{
			questionID: 47,
			questionText: "I have good relations with relatives and friends.",
		},
		{
			questionID: 48,
			questionText: "I feel satisfied by doing religious activities.",
		},
		{
			questionID: 49,
			questionText: "I like to watch programs on TV with everyone.",
		},
		{
			questionID: 50,
			questionText: "I am always careful about my manner of dress.",
		},
	];

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

	const handleResponseChange = (response) => {
		setQuestionResponses((prevResponses) => ({
			...prevResponses,
			[currentIndex + 1]: response,
		}));
		console.log(questionResponses);
	};

	const submitSurvey = () => {
		console.log(questionResponses);
	};

	return (
		<div className="mx-auto flex flex-col w-2/5 font-grostek">
			<ProgressBar
				currentQuestionIndex={currentIndex}
				totalQuestions={questionSourceData.length}
			/>
			<QuestionCard
				questionText={questionSourceData[currentIndex].questionText}
				onOptionSelect={handleResponseChange}
			/>
			<div className="flex justify-around mt-4">
				<button
					onClick={goToPreviousQuestion}
					disabled={currentIndex === 0}
					className={`${
						currentIndex === 0
							? "bg-gray-300"
							: "bg-[#59CEBE] hover:bg-[#50baac]"
					} text-gray-600 font-bold py-2 px-4 rounded-full`}
				>
					<FaRegArrowAltCircleLeft className="text-3xl" />
				</button>
				{currentIndex === questionSourceData.length - 1 ? (
					<button
						className="py-2 px-4 rounded-full bg-[#5dff75]"
						onClick={submitSurvey}
					>
						<span>Submit</span>
					</button>
				) : null}
				<button
					onClick={goToNextQuestion}
					disabled={currentIndex === questionSourceData.length - 1}
					className={`${
						Object.keys(questionResponses).length === questionSourceData.length
							? "bg-gray-300"
							: "bg-[#59CEBE] hover:bg-[#50baac]"
					} text-gray-600 font-bold py-2 px-4 rounded-full`}
				>
					<FaRegArrowAltCircleRight className="text-3xl" />
				</button>
			</div>
		</div>
	);
};

export default QuestionIterator;
