import { createContext } from "react";
import Data from "../../models/Data";

const VisualizationSession = createContext(null as
	{
		dataCollection: Data;
		dataDiffCollection: Data;
		stations: string[];
	} | null | undefined
);

export default VisualizationSession;
