import AdvisorSummary from "./components/AdvisorSummary";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import QuestionCard from "./components/Question";
import Register from "./components/Register";

const summaryData = [
	{ rollNumber: 1, question1: 4, question2: 3, question3: 5 },
	{ rollNumber: 2, question1: 5, question2: 2, question3: 4 },
	{ rollNumber: 3, question1: 3, question2: 4, question3: 3 },
	// Add more sample data as needed
];

function App() {
	return (
		<div>
			<Navbar />
			{/* <QuestionCard
				question={"I think I have a particular meaning and purpose of my life."}
			/> */}
			{/* <Register /> */}
			{/* <Login /> */}
			<AdvisorSummary data={summaryData} />
		</div>
	);
}

export default App;
