import React, { useState } from "react";

const AdvisorSummary = ({ data }) => {
	const [csvData, setCsvData] = useState("");
	const [searchRollNumber, setSearchRollNumber] = useState("");
	const [filteredData, setFilteredData] = useState(data);

	const generateCsv = () => {
		// Convert data to CSV format
		const csvContent =
			"data:text/csv;charset=utf-8," +
			Object.keys(data[0]).join(",") +
			"\n" +
			data.map((row) => Object.values(row).join(",")).join("\n");
		setCsvData(encodeURI(csvContent));
	};

	const handleSearchChange = (event) => {
		setSearchRollNumber(event.target.value);
		const filtered = data.filter((student) =>
			student.rollNumber.toString().includes(event.target.value)
		);
		setFilteredData(filtered);
	};

	return (
		<div className="mx-auto max-w-max flex flex-col justify-center overflow-auto font-grostek text-center">
			<button
				onClick={generateCsv}
				className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Export as CSV
			</button>
			<div className="mb-4">
				<input
					type="text"
					placeholder="Search by Roll Number"
					value={searchRollNumber}
					onChange={handleSearchChange}
					className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
			</div>
			<table className="table-auto">
				<thead>
					<tr>
						<th className="border px-4 py-2">Roll Number</th>
						{Object.keys(data[0])
							.slice(1)
							.map((question) => (
								<th key={question} className="border px-4 py-2">
									{question}
								</th>
							))}
					</tr>
				</thead>
				<tbody>
					{filteredData.map((student) => (
						<tr key={student.rollNumber}>
							<td className="border px-4 py-2">{student.rollNumber}</td>
							{Object.values(student)
								.slice(1)
								.map((response, index) => (
									<td key={index} className="border px-4 py-2">
										{response}
									</td>
								))}
						</tr>
					))}
				</tbody>
			</table>
			{csvData && (
				<a
					href={csvData}
					download="student_data.csv"
					className="mt-4 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Download CSV
				</a>
			)}
		</div>
	);
};

export default AdvisorSummary;
