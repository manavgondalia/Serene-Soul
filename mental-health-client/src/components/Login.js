import React, { useState } from "react";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
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
		<div className="bg-[#A0DEFF] p-4 rounded-lg mx-auto max-w-80 flex justify-center font-grostek">
			<form className="space-y-2 w-full" onSubmit={handleSubmit}>
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
						className={`px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
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
						className={`px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
							errors.password ? "border-red-500" : ""
						}`}
					/>
					{errors.password && (
						<span className="text-red-500 text-sm">{errors.password}</span>
					)}
				</div>
				<div className="flex flex-col">
					<button className="bg-[#FEAE71] py-2 px-4 rounded-full">
						<span>Login</span>
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
