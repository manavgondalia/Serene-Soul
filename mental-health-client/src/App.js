import React from "react";
import AddQuestion from "./components/AddQuestion";
import AdvisorSummary from "./components/AdvisorSummary";
import FacultyAdvisorTable from "./components/FacultyAdvisorTable";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
// import QuestionCard from "./components/QuestionCard";
import QuestionIterator from "./components/QuestionIterator";
import StudentRegister from "./components/StudentRegister";
import ViewMyResponse from "./components/ViewMyResponse";
import { Route, Routes } from "react-router-dom";
import FARegister from "./components/FARegister";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./utils/PrivateRoute";

// const summaryData = [
// 	{ rollNumber: 1, question1: 4, question2: 3, question3: 5 },
// 	{ rollNumber: 2, question1: 5, question2: 2, question3: 4 },
// 	{ rollNumber: 3, question1: 3, question2: 4, question3: 3 },
// 	// Add more sample data as needed
// ];

function App() {
	return (
		<React.Fragment>
			<Toaster />
			<header>
				<Navbar />
			</header>
			<main>
				<Routes>
					<Route path="/" element={<Home />} exact />
					<Route path="/register-student" element={<StudentRegister />} exact />
					<Route path="/login" element={<Login />} exact />
					<Route path="/" element={<PrivateRoute role={3} />}>
						<Route path="/pic-add-question" element={<AddQuestion />} exact />
						<Route path="/register-fa" element={<FARegister />} exact />
						<Route
							path="/faculty-advisor-details"
							element={<FacultyAdvisorTable />}
							exact
						/>
					</Route>
					<Route path="/" element={<PrivateRoute role={2} />}>
						<Route path="/advisor-summary" element={<AdvisorSummary />} exact />
					</Route>
					<Route path="/" element={<PrivateRoute role={1} />}>
						<Route
							path="/view-my-response"
							element={<ViewMyResponse />}
							exact
						/>
						<Route path="/fill-the-form" element={<QuestionIterator />} exact />
					</Route>
				</Routes>
			</main>

			{/* <Register /> */}
			{/* <Login /> */}
			{/* <AdvisorSummary data={summaryData} /> */}
			{/* <AddQuestion /> */}
			{/* <ViewMyResponse /> */}
			{/* <Home /> */}
			{/* <FacultyAdvisorTable /> */}
			{/* <QuestionIterator /> */}
		</React.Fragment>
	);
}

export default App;
