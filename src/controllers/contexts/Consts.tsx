import { createContext } from "react";

const Consts = createContext(null as null | {
	VITE_SERVER_BE_ADDRESS: string
});

export default Consts;
