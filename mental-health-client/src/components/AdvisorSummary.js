import axios from "axios";
import React, { useEffect, useState } from "react";

const AdvisorSummary = () => {
	const [data, setData] = useState(null);
	const [questionData, setQuestionData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingTooltip, setIsLoadingTooltip] = useState(true);
	const [error, setError] = useState(null);
	const [csvData, setCsvData] = useState("");
	const [searchRollNumber, setSearchRollNumber] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		// Fetch data from the backend
		axios
			.get(`${process.env.REACT_APP_SERVER_URL}/faculty-advisor/form-responses`)
			.then((response) => {
				console.log("this is from useEffect", response.data);
				let arrangeData = response.data;
				arrangeData.sort((a, b) => {
					return a.rollNumber.localeCompare(b.rollNumber);
				});
				setData(arrangeData);
				setFilteredData(arrangeData);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setIsLoading(false);
			});
	}, []); // Run only once on component mount

	// fetch all questions from backend to display the question text corresponding to ID on hover
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_SERVER_URL}/faculty-advisor/show-questions`)
			.then((response) => {
				console.log(response.data);
				// make a dictionary of question ID and question text
				let questionDict = {};
				response.data.forEach((question) => {
					questionDict[question.question_id] = question.question_text;
				});
				console.log(questionDict);
				setQuestionData(questionDict);
				setIsLoadingTooltip(false);
			})
			.catch((error) => {
				console.log(error);
				setIsLoadingTooltip(false);
			});
	}, []);

	const generateCsv = () => {
		// Get the keys of the first row to determine the order of columns
		const keys = Object.keys(data[0]);

		// Rearrange the keys to make the last column the first column
		const rearrangedKeys = [...keys.slice(-1), ...keys.slice(0, -1)];

		// Modify column names
		const columnNames = rearrangedKeys.map((key, index) => {
			if (index === 0) {
				return "Roll Number";
			} else {
				return `Question ${key}`;
			}
		});

		// Convert data to CSV format with rearranged column order and modified column names
		const csvContent =
			"data:text/csv;charset=utf-8," +
			columnNames.join(",") +
			"\n" +
			data
				.map((row) => rearrangedKeys.map((key) => row[key]).join(","))
				.join("\n");

		setCsvData(encodeURI(csvContent));
	};

	const handleSearchChange = (event) => {
		console.log(data);
		setSearchRollNumber(event.target.value);
		const filtered = data.filter((student) =>
			student.rollNumber.toString().includes(event.target.value)
		);
		setFilteredData(filtered);
	};

	return (
		<div className="h-screen font-grostek flex bg-gradient-to-l from-green-200 to-teal-200">
			{isLoading === true ? (
				<p>Loading data...</p>
			) : (
				<div className="max-w-[60rem] mx-auto flex flex-col justify-center h-2/3 text-center mt-24 rounded-xl p-4 bg-slate-50">
					<button
						onClick={generateCsv}
						className="w-36 mx-auto mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Export as CSV
					</button>
					<div className="mb-4 w-fit mx-auto">
						<input
							type="text"
							placeholder="Search by Roll Number"
							value={searchRollNumber}
							onChange={handleSearchChange}
							className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>
					<div className="w-full h-80 mx-auto overflow-x-scroll">
						<table className="table-auto ">
							<thead>
								<tr>
									<th className=" px-4 border-2 border-black py-2">
										Roll Number
									</th>
									{Object.keys(data[0])
										.slice(0, Object.keys(data[0]).length - 1)
										.map((question) => (
											<th
												key={question}
												className="cursor-pointer relative border-2 border-black px-4 py-2"
											>
												{isLoadingTooltip ? (
													<div className="hidden"></div>
												) : (
													<span className="group">
														{"Question " + question}
														<span className="hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-md whitespace-nowrap">
															{questionData[question]}
														</span>
													</span>
												)}
											</th>
										))}
								</tr>
							</thead>
							{/* <tbody>
								{filteredData.map((student) => (
									<tr key={student.rollNumber}>
										<td className="border px-4 py-2">{student.rollNumber}</td>
										{Object.values(student)
											.slice(0, Object.values(student).length - 1)
											.map((response, index) => (
												<td key={index} className="border px-4 py-2">
													{response}
												</td>
											))}
									</tr>
								))}
							</tbody> */}
							<tbody>
								{filteredData.map((student) => (
									<tr key={student.rollNumber}>
										<td className="border-2 border-black px-4 py-2">
											{student.rollNumber}
										</td>
										{Object.keys(data[0])
											.slice(0, Object.keys(data[0]).length - 1)
											.map((questionID) => (
												<td
													key={questionID}
													className="border-2 border-black px-4 py-2"
												>
													{student.hasOwnProperty(questionID)
														? student[questionID]
														: ""}
												</td>
											))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{csvData && (
						<a
							href={csvData}
							download="student_data.csv"
							className="w-36 mx-auto mt-4 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>
							Download CSV
						</a>
					)}

					<div className="mt-16 flex justify-between space-x-2  mx-auto">
						<label className="flex items-center bg-red-200 text-blue-800 rounded-md px-3 py-1">
							<span className="mr-1">1:</span>
							<span>Strongly Disagree</span>
						</label>
						<label className="flex items-center bg-yellow-200 text-yellow-800 rounded-md px-3 py-1">
							<span className="mr-1">2:</span>
							<span>Disagree</span>
						</label>
						<label className="flex items-center bg-blue-200 text-gray-800 rounded-md px-3 py-1">
							<span className="mr-1">3:</span>
							<span>Undecided</span>
						</label>
						<label className="flex items-center bg-teal-200 text-green-800 rounded-md px-3 py-1">
							<span className="mr-1">4:</span>
							<span>Agree</span>
						</label>
						<label className="flex items-center bg-green-200 text-red-800 rounded-md px-3 py-1">
							<span className="mr-1">5:</span>
							<span>Strongly Agree</span>
						</label>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdvisorSummary;
