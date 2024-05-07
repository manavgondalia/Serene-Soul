import axios from "axios";
import React, { useEffect, useState } from "react";

const FacultyAdvisorTable = () => {
	const [facultyAdvisors, setFacultyAdvisors] = useState([]);

	useEffect(() => {
		// Fetch faculty advisors from the server
		fetch(`${process.env.REACT_APP_SERVER_URL}/pic/show-fa`)
			.then((response) => response.json())
			.then((data) => setFacultyAdvisors(data))
			.catch((error) => console.error(error));
	}, []);

	const [showAddForm, setShowAddForm] = useState(false);
	const [newAdvisor, setNewAdvisor] = useState({
		email: "",
		batch: "",
		branch: "",
		course: "",
		name: "",
	});

	const handleDelete = (email) => {
		setFacultyAdvisors((prevAdvisors) =>
			prevAdvisors.filter((advisor) => advisor.email !== email)
		);

		axios
			.delete(`${process.env.REACT_APP_SERVER_URL}/pic/delete-fa/`, {
				data: { email: email },
			})

			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleAddNew = () => {
		setShowAddForm(true);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewAdvisor((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddSubmit = () => {
		// Add new faculty advisor
		setFacultyAdvisors((prevAdvisors) => [...prevAdvisors, { ...newAdvisor }]);

		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/pic/add-fa`, newAdvisor)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.error(error);
			});

		// Reset input fields and hide form
		setNewAdvisor({ email: "", batch: "", branch: "", course: "", name: "" });
		setShowAddForm(false);
	};

	return (
		<div className="h-screen flex bg-gradient-to-bl from-yellow-300 to-teal-300">
			<div className="max-w-3xl mx-auto mt-28 h-fit p-4 bg-[#CAF4FF] rounded-xl">
				<table className="w-full border-collapse border-2 border-black mt-8 table-fixed">
					<thead>
						<tr className="bg-gray-300">
							<th className="border-2 border-black px-4 py-2">Email</th>
							<th className="border-2 border-black px-4 py-2">Batch</th>
							<th className="border-2 border-black px-4 py-2">Branch</th>
							<th className="border-2 border-black px-4 py-2">Course</th>
							<th className="border-2 border-black px-4 py-2">Name</th>
							<th className="border-2 border-black px-4 py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{facultyAdvisors.map((advisor) => (
							<tr key={advisor.email}>
								<td className="border-2 border-black px-4 py-2">
									{advisor.email}
								</td>
								<td className="border-2 border-black px-4 py-2">
									{advisor.batch}
								</td>
								<td className="border-2 border-black px-4 py-2">
									{advisor.branch}
								</td>
								<td className="border-2 border-black px-4 py-2">
									{advisor.course}
								</td>
								<td className="border-2 border-black px-4 py-2">
									{advisor.name}
								</td>
								<td className="border-2 border-black px-4 py-2">
									<button
										className="text-red-500 hover:text-red-700 font-bold"
										onClick={() => handleDelete(advisor.email)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
						{showAddForm && (
							<tr>
								<td className="border border-gray-200 px-4 py-2">
									<input
										type="text"
										name="email"
										value={newAdvisor.email}
										onChange={handleInputChange}
										placeholder="Email"
										className="max-w-full border border-gray-300 rounded-md px-2 py-1"
									/>
								</td>
								<td className="border border-gray-200 px-4 py-2">
									<input
										type="text"
										name="batch"
										value={newAdvisor.batch}
										onChange={handleInputChange}
										placeholder="Batch"
										className="max-w-full border border-gray-300 rounded-md px-2 py-1"
									/>
								</td>
								<td className="border border-gray-200 px-4 py-2">
									<input
										type="text"
										name="branch"
										value={newAdvisor.branch}
										onChange={handleInputChange}
										placeholder="Branch"
										className="max-w-full border border-gray-300 rounded-md px-2 py-1"
									/>
								</td>
								<td className="border border-gray-200 px-4 py-2">
									<input
										type="text"
										name="course"
										value={newAdvisor.course}
										onChange={handleInputChange}
										placeholder="Course"
										className="max-w-full border border-gray-300 rounded-md px-2 py-1"
									/>
								</td>
								<td className="border border-gray-200 px-4 py-2">
									<input
										type="text"
										name="name"
										value={newAdvisor.name}
										onChange={handleInputChange}
										placeholder="Name"
										className="max-w-full border border-gray-300 rounded-md px-2 py-1"
									/>
								</td>
								<td className="border border-gray-200 px-4 py-2 flex justify-between">
									<button
										className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
										onClick={handleAddSubmit}
									>
										Add
									</button>
									{showAddForm && (
										<button
											className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
											onClick={() => setShowAddForm(false)}
										>
											X
										</button>
									)}
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<div className="flex justify-end mt-4">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={handleAddNew}
					>
						Add New Faculty Advisor
					</button>
				</div>
			</div>
		</div>
	);
};

export default FacultyAdvisorTable;
