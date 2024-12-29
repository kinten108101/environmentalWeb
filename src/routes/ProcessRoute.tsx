import layerElements from "react-nice-patterns/src/layerElements";
import axios from "axios";

import Results from "../views/pages/Results";
import VisualizationSession from "../controllers/contexts/VisualizationSession";
import { useContext, useEffect, useState } from "react";
import Consts from "../controllers/contexts/Consts";
import Data from "../models/Data";
import DatabaseContext from "../controllers/contexts/DatabaseContext";

const VisualizationFetcher = function (
{	...otherProps
}:
{	children?: React.ReactNode;
}) {
	const dbc = useContext(DatabaseContext);
	const [session, setSession] = useState(undefined as undefined | null | {
		dataCollection: Data;
	});
	const consts = useContext(Consts);
	if (consts === null)
		throw new Error;

	useEffect(function () {
		if (dbc === undefined || dbc === null)
			return;
		let address =  dbc.address;
		if (!address.match(/^http[s]?\:\/\/.*/))
			address = "http://" + address;
		axios.get(`${address}/api/weather/report`)
			.then(x => { 
				const u = x.data;
				return u;
			})
			.then((x: unknown) => {
				if (
					!Array.isArray(x)
				)
					throw new Error;

				const records = x;
				const stations = records.map(x => x.stationid).map(x => ([x])).reduce((acc, x) => acc.includes(x[0]) ? acc : [...acc, x[0]], []);
				const dataCollection = records.map(
					(x: unknown) => {
						if (
							typeof x !== "object"
							|| x === null
						)
							throw new Error;

						const precipitation = 0;

						if (
							!("temperature" in x)
						)
							throw new Error;

						let { temperature } = x;
						temperature = temperature || 0;

						if (
							!("velox" in x)
						)
							throw new Error;

						let { velox } = x;
						velox = Number(velox);

						if (
							!("veloy" in x)
						)
							throw new Error;

						let { veloy } = x;
						veloy = Number(veloy);

						if (
							!("veloz" in x)
						)
							throw new Error;

						let { veloz } = x;
						veloz = Number(veloz);

						const windSpeed = Math.sqrt(velox**2 + veloy**2 + veloz**2);

						if (
							!("timestamp" in x)
						)
							throw new Error;

						const date = (() => {
							if (typeof x.timestamp === "string")
								return new Date(x.timestamp);
							return new Date(0);
						})();

						if (
							!("stationid" in x)
							|| typeof x["stationid"] !== "string"
						)
							throw new Error;

						const stationid = x.stationid;
						
						return {
							date,
							stationid,
							precipitation,
							temperature,
							windSpeed,
						};
					}
				);

				const dataDiffCollection = dataCollection.map(
					(x, i) => {
						const { date, stationid } = x;
						const origin = dataCollection[Math.max(i - 1, 0)];
						if (origin === undefined)
							throw new Error;
						const temperature = (origin.temperature === 0) ? 0 : ((x.temperature - origin.temperature) / Math.abs(origin.temperature)) * 100;
						const windSpeed = (origin.windSpeed === 0) ? 0 : ((x.windSpeed - origin.windSpeed) / Math.abs(origin.windSpeed)) * 100;
						const precipitation = (origin.precipitation === 0) ? 0 : ((x.precipitation - origin.precipitation) / Math.abs(origin.precipitation)) * 100;
						return {
							date,
							stationid,
							temperature,
							windSpeed,
							precipitation
						};
					}
				);

				setSession({ dataCollection, dataDiffCollection, stations });
				console.log(x);
			})
			.catch(e => {
				console.error(e);
				setSession(null);
			})
	}, []);

	useEffect(function () {
		return;
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
