import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("userInfo") || null)
	);

	const login = (inputs) => {
		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, inputs)
			.then((response) => {
				console.log(response);
				const data = JSON.stringify(response.data);
				// remove message from data
				const userInfo = JSON.parse(data);
				delete userInfo.message;
				localStorage.setItem("userInfo", JSON.stringify(userInfo));
				setCurrentUser(userInfo);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const logout = () => {
		setCurrentUser(null);
	};

	useEffect(() => {
		localStorage.setItem("userInfo", JSON.stringify(currentUser));
	}, [currentUser]);

	return (
		<AuthContext.Provider value={{ currentUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
