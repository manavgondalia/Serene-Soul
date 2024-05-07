import axios from "axios";
import React, { useState } from "react";

const StudentRegister = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		rollNumber: "",
		gender: "",
		contactNumber: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const validationErrors = {};
		if (!formData.email) {
			validationErrors.email = "Email is required";
		}
		if (!formData.firstName) {
			validationErrors.firstName = "First Name is required";
		}
		if (!formData.rollNumber) {
			validationErrors.rollNumber = "Roll Number is required";
		}
		if (!formData.password) {
			validationErrors.password = "Password is required";
		}

		if (formData.contactNumber && formData.contactNumber.length !== 10) {
			validationErrors.contactNumber = "Invalid contact number";
		}

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			// Submit form data (replace with your submission logic)
			console.log("Submitting form:", formData);
			axios
				.post(
					`${process.env.REACT_APP_SERVER_URL}/auth/register-student`,
					formData
				)
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
		<div className="bg-gradient-to-br from-amber-50 to-green-100 h-screen flex justify-center font-cabinet ">
			<form
				className="max-w-lg h-fit space-y-2 w-full p-6 rounded-lg mx-auto mt-40 border-2 border-black bg-white"
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
						<label htmlFor="rolNo" className="text-lg font-medium mb-2">
							Roll Number (Required)
						</label>
						<input
							type="text"
							id="rollNumber"
							name="rollNumber"
							value={formData.rollNumber}
							onChange={handleChange}
							className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
						{errors.rollNumber && (
							<span className="text-red-500 text-lg">{errors.rollNumber}</span>
						)}
					</div>
				</div>
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

				<div className="flex justify-between">
					<div className="flex flex-col">
						<label htmlFor="firstName" className="text-lg font-medium mb-2">
							First Name (Required)
						</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							className={`px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
								errors.firstName ? "border-red-500" : ""
							}`}
						/>
						{errors.firstName && (
							<span className="text-red-500 text-lg">{errors.firstName}</span>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="lastName" className="text-lg font-medium mb-2">
							Last Name
						</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="flex flex-col">
						<label htmlFor="contactNumber" className="text-lg font-medium mb-2">
							Contact Number
						</label>
						<input
							type="tel"
							id="contactNumber"
							name="contactNumber"
							pattern="[0-9]{10}"
							title="10 digit numbers only"
							value={formData.contactNumber}
							onChange={handleChange}
							className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
						{errors.contactNumber && (
							<span className="text-red-500 text-lg">
								{errors.contactNumber}
							</span>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="gender" className="text-lg font-medium mb-2">
							Gender
						</label>
						<select
							id="gender"
							name="gender"
							value={formData.gender}
							onChange={handleChange}
							className="w-56 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
						>
							<option value="">Select...</option>
							<option value="M">Male</option>
							<option value="F">Female</option>
							<option value="O">Other</option>
						</select>
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

export default StudentRegister;
