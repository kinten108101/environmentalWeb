import { createContext } from "react";
import Data from "../../models/Data";

const VisualizationSession = createContext(null as
	{
		dataCollection: Data;
	} | null | undefined
);

export default VisualizationSession;
