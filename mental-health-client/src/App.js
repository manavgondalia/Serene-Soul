import Navbar from "./components/Navbar";
import QuestionCard from "./components/Question";
import Register from "./components/Register";

function App() {
	return (
		<div>
			<Navbar />
			{/* <QuestionCard
				question={"I think I have a particular meaning and purpose of my life."}
			/> */}
			<Register />
		</div>
	);
}

export default App;