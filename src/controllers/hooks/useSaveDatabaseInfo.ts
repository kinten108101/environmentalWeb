import {
	useContext, useCallback
} from "react";
import { RefreshContext } from "../contexts/DatabaseContext";

function useSaveDatabaseInfo() {
	const refresh = useContext(RefreshContext);

	const override = useCallback(function (address: string) {
		localStorage.setItem("database-address", JSON.stringify({
			address
		}));
		refresh();
	}, [refresh]);

	return { override };
}

export default useSaveDatabaseInfo;
