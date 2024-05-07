import axios from "axios";
import React, { useEffect, useState } from "react";

const AddQuestion = () => {
	const [newQuestion, setNewQuestion] = useState("");
	const [existingQuestions, setExistingQuestions] = useState([]);

	useEffect(() => {
		// Fetch existing questions from the server
		axios
			.get(`${process.env.REACT_APP_SERVER_URL}/pic/show-questions`)
			.then((response) => {
				setExistingQuestions(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [existingQuestions]);

	const handleInputChange = (e) => {
		setNewQuestion(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Check if the new question is not empty
		if (newQuestion.trim() !== "") {
			// Send the new question to the server
			axios
				.post(`${process.env.REACT_APP_SERVER_URL}/pic/add-question`, {
					questionText: newQuestion,
				})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});

			// Clear the input field
			setExistingQuestions((prevQuestions) => [
				...prevQuestions,
				{
					question_id: prevQuestions.length + 1,
					question_text: newQuestion,
				},
			]);
			setNewQuestion("");
		}
	};

	return (
		<div className="flex h-screen bg-gradient-to-bl from-blue-200 to-fuchsia-300">
			<div className="flex flex-col mx-auto mt-24 h-fit p-2 rounded-lg bg-slate-100">
				<form
					onSubmit={handleSubmit}
					className="bg-[#FFEC9E] p-4 rounded-lg w-1/2 mx-auto font-grostek mt-4"
				>
					<div className="mb-4">
						<label htmlFor="question" className="block text-md">
							New Question:
						</label>
						<textarea
							id="question"
							name="question"
							value={newQuestion}
							onChange={handleInputChange}
							className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							rows="3"
							placeholder="Enter your new question..."
							required
						></textarea>
					</div>
					<button
						type="submit"
						className="py-2 px-4 rounded-full bg-[#9BCF53] hover:bg-[#65B741]"
					>
						Add Question
					</button>
				</form>
				<div className="max-w-3xl mx-auto h-80 overflow-scroll mt-8">
					<table className="w-full">
						<thead>
							<tr className="bg-gray-300">
								<th className="border-2 border-black px-4 py-2">ID</th>
								<th className="border-2 border-black px-4 py-2">Text</th>
							</tr>
						</thead>
						<tbody>
							{existingQuestions.map((question) => (
								<tr key={question.question_id}>
									<td className="border-2 border-black px-4 py-2">
										{question.question_id}
									</td>
									<td className="border-2 border-black px-4 py-2">
										{question.question_text}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default AddQuestion;
