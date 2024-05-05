import React, { useState } from "react";

const Register = () => {
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

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			// Submit form data (replace with your submission logic)
			console.log("Submitting form:", formData);
		}
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			<div className="flex flex-col">
				<label htmlFor="email" className="text-sm font-medium mb-2">
					Email (Required)
				</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className={`px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
						errors.email ? "border-red-500" : ""
					}`}
				/>
				{errors.email && (
					<span className="text-red-500 text-sm">{errors.email}</span>
				)}
			</div>
			<div className="flex flex-col">
				<label htmlFor="password" className="text-sm font-medium mb-2">
					Password (Required)
				</label>
				<input
					type="password"
					id="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					className={`px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
						errors.password ? "border-red-500" : ""
					}`}
				/>
				{errors.password && (
					<span className="text-red-500 text-sm">{errors.password}</span>
				)}
			</div>
			<div className="flex flex-col">
				<label htmlFor="firstName" className="text-sm font-medium mb-2">
					First Name (Required)
				</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					value={formData.firstName}
					onChange={handleChange}
					className={`px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
						errors.firstName ? "border-red-500" : ""
					}`}
				/>
				{errors.firstName && (
					<span className="text-red-500 text-sm">{errors.firstName}</span>
				)}
			</div>
			<div className="flex flex-col">
				<label htmlFor="lastName" className="text-sm font-medium mb-2">
					Last Name
				</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					value={formData.lastName}
					onChange={handleChange}
					className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor="rolNo" className="text-sm font-medium mb-2">
					Roll Number
				</label>
				<input
					type="text"
					id="rollNo"
					name="rollNo"
					value={formData.rollNo}
					onChange={handleChange}
					className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
			</div>
		</form>
	);
};

export default Register;
