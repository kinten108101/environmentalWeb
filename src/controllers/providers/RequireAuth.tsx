import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const RequireAuth = function (
{	fallbackPath,
	...otherProps
}:
{	fallbackPath: string;
	children?: React.ReactNode;
}) {
	const account = useContext(AuthContext);
	const navigate = useNavigate();

	switch (account) {
	case undefined: return null;
	case null: navigate(fallbackPath); return null;
	default: return otherProps.children;
	}
}

export default RequireAuth;
