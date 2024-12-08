import { createContext } from "react";

export type Account =
	{	userName: string
	;	password: string
	}

const AuthContext = createContext(null as null | undefined | Account);

export default AuthContext;
