import React from "react";
import logo from "../assets/images/serene_soul_circular.png";

const Home = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-500">
			<img src={logo} alt="Logo" className="w-56 h-auto mb-8" />
			<h1 className="text-7xl font-black text-white mb-4 font-zodiak">
				Serene Soul
			</h1>
			<p className="text-lg text-white text-center max-w-md mb-8 font-briston">
				Your go-to destination for improving mental health and well-being.
			</p>
		</div>
	);
};

export default Home;
