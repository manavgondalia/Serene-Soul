import axios from "axios";
import React, { useState } from "react";

const FARegister = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		batch: "",
		branch: "",
		course: "",
		name: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		if (event.target.name === "course") {
			setFormData({
				...formData,
				[event.target.name]: "btech",
			});
		} else {
			setFormData({ ...formData, [event.target.name]: event.target.value });
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const validationErrors = {};
		if (!formData.email) {
			validationErrors.email = "Email is required";
		}

		if (!formData.password) {
			validationErrors.password = "Password is required";
		}

		if (!formData.batch) {
			validationErrors.batch = "Batch is required";
		}

		if (!formData.branch) {
			validationErrors.branch = "Branch is required";
		}

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			// Submit form data (replace with your submission logic)
			console.log("Submitting form:", formData);
			axios
				.post(`${process.env.REACT_APP_SERVER_URL}/pic/add-fa`, formData)
				.then((response) => {
					console.log(response);
					const data = JSON.stringify(response.data);
					// remove message from data
					const userInfo = JSON.parse(data);
					delete userInfo.message;
					localStorage.setItem("userInfo", JSON.stringify(userInfo));
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<div className="bg-gradient-to-tr from-rose-500 to-indigo-500 h-screen flex justify-center font-cabinet ">
			<form
				className="max-w-lg h-fit space-y-2 w-full p-6 rounded-lg mx-auto mt-40 border-2 border-black bg-[#F6E9B2]"
				onSubmit={handleSubmit}
			>
				<div className="flex justify-between">
					<div className="flex flex-col">
						<label htmlFor="email" className="text-lg font-medium mb-2">
							Email (Required)
						</label>
						<input
							type="email"
							id="registerEmail"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className={`px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
								errors.email ? "border-red-500" : ""
							}`}
						/>
						{errors.email && (
							<span className="text-red-500 text-lg">{errors.email}</span>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="name" className="text-lg font-medium mb-2">
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>
				</div>

				<div className="flex justify-between">
					<div className="flex flex-col">
						<label htmlFor="password" className="text-lg font-medium mb-2">
							Password (Required)
						</label>
						<input
							type="password"
							id="registerPassword"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className={`px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
								errors.password ? "border-red-500" : ""
							}`}
						/>
						{errors.password && (
							<span className="text-red-500 text-lg">{errors.password}</span>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="course" className="text-lg font-medium mb-2">
							Course (Required)
						</label>
						<input
							type="text"
							id="course"
							name="course"
							value={formData.course}
							onChange={handleChange}
							className={`px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
								errors.course ? "border-red-500" : ""
							}`}
						/>
						{errors.course && (
							<span className="text-red-500 text-lg">{errors.course}</span>
						)}
					</div>
				</div>

				<div className="flex justify-between">
					<div className="flex flex-col">
						<label htmlFor="batch" className="text-lg font-medium mb-2">
							Batch (Required)
						</label>
						<input
							type="text"
							id="batch"
							name="batch"
							value={formData.batch}
							onChange={handleChange}
							className={`px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
								errors.batch ? "border-red-500" : ""
							}`}
						/>
						{errors.batch && (
							<span className="text-red-500 text-lg">{errors.batch}</span>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="branch" className="text-lg font-medium mb-2">
							Branch (Required)
						</label>
						<select
							id="branch"
							name="branch"
							value={formData.branch}
							onChange={handleChange}
							className="w-56 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
						>
							<option value="">Select...</option>
							<option value="CS">CS</option>
							<option value="EE">EE</option>
							<option value="MM">MME</option>
							<option value="CE">CE</option>
							<option value="CB">CBE</option>
							<option value="ME">ME</option>
						</select>
						{errors.branch && (
							<span className="text-red-500 text-lg">{errors.branch}</span>
						)}
					</div>
				</div>

				<div className="flex flex-col">
					<button className="mt-2 bg-[#FEAE71] py-2 px-4 rounded-full">
						<span>Register</span>
					</button>
				</div>
			</form>
		</div>
	);
};

export default FARegister;
