import layerElements from "react-nice-patterns/src/layerElements";

import Results from "../views/pages/Results";
import VisualizationSession from "../controllers/contexts/VisualizationSession";
import { useContext, useEffect, useState } from "react";
import Consts from "../controllers/contexts/Consts";
import Data from "../models/Data";

const VisualizationFetcher = function (
{	...otherProps
}:
{	children?: React.ReactNode;
}) {
	const [session, setSession] = useState(undefined as undefined | null | {
		dataCollection: Data;
	});
	const consts = useContext(Consts);
	if (consts === null)
		throw new Error;

	useEffect(function () {
		fetch(`${consts.VITE_SERVER_BE_ADDRESS}/get`)
			.then(x => x.json())
			.then((x: unknown) => {
				if (
					typeof x !== "object"
					|| x === null
				)
					throw new Error;

				if (
					!("data" in x)
					|| typeof x.data !== "object"
					|| x.data === null
				)
					throw new Error;

				const { data } = x;

				if (
					!("history" in data)
					|| typeof data.history !== "object"
					|| data.history === null
				)
					throw new Error;

				const { history } = data;

				if (
					!("records" in history)
					|| !Array.isArray(history.records)
				)
					throw new Error;
				
				const { records } = history;

				const dataCollection = records.map(
					(x: unknown) => {
						if (
							typeof x !== "object"
							|| x === null
						)
							throw new Error;

						if (
							!("precipitation" in x)
							|| typeof x.precipitation !== "number"
						)
							throw new Error;

						const { precipitation } = x;

						if (
							!("temperature" in x)
							|| typeof x.temperature !== "number"
						)
							throw new Error;

						const { temperature } = x;

						if (
							!("windSpeed" in x)
							|| typeof x.windSpeed !== "number"
						)
							throw new Error;

						const { windSpeed } = x;

						if (
							!("date" in x)
							|| typeof x.date !== "string"
						)
							throw new Error;

						const date = new Date(x.date);
						
						return {
							date,
							precipitation,
							temperature,
							windSpeed,
						};
					}
				);

				setSession({ dataCollection });
				console.log(x);
			})
			.catch(e => {
				console.error(e);
				setSession(null);
			})
	}, []);

	return (
		<VisualizationSession.Provider value={session}>
			{otherProps.children}
		</VisualizationSession.Provider>
	);
}

const ProcessRoute = () => layerElements([
	x => <VisualizationFetcher>{x}</VisualizationFetcher>,
	_ => <Results />
]);

export default ProcessRoute;
