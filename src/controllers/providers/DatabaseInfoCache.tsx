import {
	useEffect, useRef, useState, useCallback
} from "react";
import DatabaseContext, { 
	Database, RefreshContext 
} from "../contexts/DatabaseContext";

const DatabaseInfoCache = function (
{	...otherProps
}:
{	children?: React.ReactNode;
}) {
	const [info, setInfo] = useState<null | undefined | Database>(undefined);
	const [x, setX] = useState(NaN);
	const forceRefresh = useCallback(function () {
		return setX(Math.random());
	}, []);
	const lastParsement = useRef<string | null>();
	useEffect(function () {
		const dbAdString = localStorage.getItem("database-address");
		if (lastParsement.current === dbAdString)
			return;
		lastParsement.current = dbAdString;
		if (dbAdString === null) {
			return setInfo(null);
		}
		let obj: unknown;
		try {
			obj = JSON.parse(dbAdString)
		} catch (error) {
			console.warn(error);
			return setInfo(undefined);
		}
		if (
			typeof obj !== "object"
			|| obj === null
		)
			throw new Error;
		if (
			!("address" in obj)
			|| typeof obj["address"] !== "string"
		)
			throw new Error;
		const { address } = obj;
		return setInfo({
			address
		});
	}, [x]);
	return (
		<DatabaseContext.Provider value={info}>
			<RefreshContext.Provider value={forceRefresh}>
				{otherProps.children}
			</RefreshContext.Provider>
		</DatabaseContext.Provider>
	);
};

export default DatabaseInfoCache;
