import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ role }) => {
	const { currentUser } = useContext(AuthContext);

	return currentUser && currentUser.role === role ? (
		<Outlet />
	) : (
		<Navigate to="/login" />
	);
};

export default PrivateRoute;
