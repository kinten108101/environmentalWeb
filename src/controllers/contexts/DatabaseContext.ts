import { createContext } from "react";

export type Database = 
	{	address: string
	}

const DatabaseContext = createContext(null as null | undefined | Database);

export default DatabaseContext;

export const RefreshContext = createContext(() => (undefined as void))
