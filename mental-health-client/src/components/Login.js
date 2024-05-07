import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	// console.log("how many time", currentUser);

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
			login(formData);
			navigate("/");
		}
	};

	return (
		<div className="bg-gradient-to-l from-gray-100 via-fuchsia-100 to-stone-100 flex justify-center font-cabinet h-screen">
			<form
				className="rounded-lg w-96 px-4 py-8 mx-auto h-fit mt-40 space-y-2 border-2 border-black bg-white"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col">
					<label htmlFor="email" className="text-lg font-medium mb-2">
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
						<span className="text-red-500 text-lg">{errors.email}</span>
					)}
				</div>

				<div className="flex flex-col">
					<label htmlFor="password" className="text-lg font-medium mb-2">
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
						<span className="text-red-500 text-lg">{errors.password}</span>
					)}
				</div>
				<div className="flex flex-col">
					<button className="bg-[#FEAE71] py-2 px-4 rounded-full mt-2">
						<span>Login</span>
					</button>
					<span className="text-center mt-2">
						New user? Register as{" "}
						<Link className="underline" to="/register-student">
							Student
						</Link>{" "}
					</span>
				</div>
			</form>
		</div>
	);
};

export default Login;
