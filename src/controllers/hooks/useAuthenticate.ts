import {
	useContext, useCallback
} from "react";
import RefreshContext from "../contexts/RefreshContext";

function useAuthenticate() {
	const refresh = useContext(RefreshContext);

	const login = useCallback(function (userName: string, password: string) {
		localStorage.setItem("token", JSON.stringify({
			userName,
			password
		}));
		refresh();
	}, [refresh]);

	const logout = useCallback(function () {
		localStorage.removeItem("token");
		refresh();
	}, [refresh]);
	
	return { login, logout };
}

export default useAuthenticate;
