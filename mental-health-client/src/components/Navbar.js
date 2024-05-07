import React, { useContext, useEffect, useState } from "react";
import serene_soul_circular from "../assets/images/serene_soul_circular.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { currentUser, logout } = useContext(AuthContext);

	useEffect(() => {
		console.log(currentUser);
	}, [currentUser]);

	return (
		<div className="w-full">
			<nav className="flex items-center justify-between flex-wrap p-2 font-grostek bg-[#FFC55A] top-0 w-full fixed">
				<Link
					to="/"
					className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72"
				>
					<img src={serene_soul_circular} className="w-16 h-16" alt="Logo" />
				</Link>
				<div className="block lg:hidden">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
					>
						<svg
							className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
						</svg>
						<svg
							className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
						</svg>
					</button>
				</div>
				<div
					className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
						isOpen ? "block" : "hidden"
					}`}
				>
					<div className="text-sm lg:flex-grow flex justify-end">
						{currentUser ? (
							<span
								href="/#"
								className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4"
							>
								Hi {currentUser.email.split("@")[0]}!
							</span>
						) : null}
						{currentUser && currentUser.role === 1 ? (
							<Link
								to="/fill-the-form"
								className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4"
							>
								Fill Survey
							</Link>
						) : null}
						{currentUser && currentUser.role === 1 ? (
							<Link
								to="/view-my-response"
								className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4"
							>
								View Response
							</Link>
						) : null}
						{currentUser && currentUser.role === 2 ? (
							<Link
								to="/advisor-summary"
								className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4"
							>
								View Responses
							</Link>
						) : null}
						{currentUser && currentUser.role === 3 ? (
							<Link
								to="/faculty-advisor-details"
								className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4"
							>
								Advisor Details
							</Link>
						) : null}

						{currentUser && currentUser.role === 3 ? (
							<Link
								to="/pic-add-question"
								className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4"
							>
								Add Question
							</Link>
						) : null}

						{currentUser && currentUser.role === 3 ? (
							<Link
								to="/register-fa"
								className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4"
							>
								Register FA
							</Link>
						) : null}
					</div>
					<Link to="/login">
						<button
							className="inline-flex items-center bg-[#00215E] border-0 py-2 px-4 text-white"
							onClick={currentUser ? logout : null}
						>
							{currentUser ? "Logout" : "Login"}
						</button>
					</Link>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
