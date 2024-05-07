import React from "react";
import logo from "../assets/images/serene_soul_circular.png";

const Home = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-500">
			<img src={logo} alt="Logo" className="w-56 h-auto mb-8" />
			<h1 className="text-7xl font-black text-white mb-4 font-zodiak">
				Serene Soul
			</h1>
			<p className="text-xl text-white text-center max-w-md mb-8 font-cabinet">
				Your well-being matters. Fill this completely anonymous form to help us
				understand you.<br></br> Be assured that your responses will be kept
				confidential.
			</p>
		</div>
	);
};

export default Home;
