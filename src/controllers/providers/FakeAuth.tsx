import {
	useEffect, useRef, useState, useCallback
} from "react";
import AuthContext, { Account } from "../contexts/AuthContext";
import RefreshContext from "../contexts/RefreshContext";

const FakeAuth = function (
{	...otherProps
}:
{	children?: React.ReactNode;
}) {
	const [account, setAccount] = useState<null | undefined | Account>(undefined);
	const [x, setX] = useState(NaN);
	const forceRefresh = useCallback(function () {
		return setX(Math.random());
	}, []);
	const lastTokenParsement = useRef<string | null>();
	useEffect(function () {
		const tokenString = localStorage.getItem("token");
		if (lastTokenParsement.current === tokenString)
			return;
		lastTokenParsement.current = tokenString;
		if (tokenString === null) {
			return setAccount(null);
		}
		let accountObj: unknown;
		try {
			accountObj = JSON.parse(tokenString)
		} catch (error) {
			console.warn(error);
			return setAccount(undefined);
		}
		if (
			typeof accountObj !== "object"
			|| accountObj === null
		)
			throw new Error;
		if (
			!("userName" in accountObj)
			|| typeof accountObj["userName"] !== "string"
		)
			throw new Error;
		const { userName } = accountObj;
		if (
			!("password" in accountObj)
			|| typeof accountObj["password"] !== "string"
		)
			throw new Error;
		const { password } = accountObj;
		return setAccount({
			userName, password
		});
	}, [x]);
	return (
		<AuthContext.Provider value={account}>
			<RefreshContext.Provider value={forceRefresh}>
				{otherProps.children}
			</RefreshContext.Provider>
		</AuthContext.Provider>
	);
};

export default FakeAuth;
