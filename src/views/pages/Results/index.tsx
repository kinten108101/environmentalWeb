import { BarChart, BarPlot, ChartContainer, ChartsXAxis, LineChart, LinePlot, ResponsiveChartContainer } from "@mui/x-charts";

import CommonFrame from "../../components/CommonFrame";
import Headerbar from "../../components/Headerbar";
import Footer from "../../components/Footer";
import WorldCartogram from "../../components/WorldCartogram";
import "./index.css";
import { useContext, useState } from "react";
import VisualizationSession from "../../../controllers/contexts/VisualizationSession";

const WorldCartogramSelector = function () {
	return (
		<WorldCartogram
			style={{
				margin: "24px 0px",
			}}
			data={{
				"Viet_Nam": { progress: 100 }
			}}
		/>
	);
};

const GraphWithModes = function () {
	return (
		null
	);
};

const Results = function () {
	const data = useContext(VisualizationSession);
	if (data === null || data === undefined)
		return null;
	const [source, setSource] = useState(data.dataCollection);
	const [station, setStation] = useState(data.stations[0]);
	const switchSource = function (str: "absolute" | "difference") {
		switch (str) {
		case "absolute": return setSource(data.dataCollection);
		case "difference": return setSource(data.dataDiffCollection);
		default:
			throw new Error;
		}
	};

	const length = 20;

	const precipitationData =
		source
			.map(x => x?.precipitation)
			.slice(0, length);

	const temperatureData =
		source
			.map(x => x?.temperature)
			.slice(0, length);

	const windData =
		source
			.map(x => x?.windSpeed)
			.slice(0, length);

	return (
		<CommonFrame
			className="mresults"
		>
			<Headerbar
				style={{
					gridArea: "headerbar"
				}}
			/>
			<main
				style={{
					gridArea: "main",
					display: "grid",
					gridOld: `
						". title     title     title     ." max-content
						". selection selection selection ." max-content
						". basic1    basic2    basic3    ." max-content
						". compare   compare   compare   ." max-content
					/ 20px minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) 20px
					`,
					grid: `
						". title title title title ." max-content
						". . .    . .   ." 12px
						". selection .  basic2    basic3    ." max-content
						". . .    . .   ." 12px
						". compare   compare compare    compare    ." max-content
					/ 20px minmax(0,2fr) 12px minmax(0,3fr) minmax(0,3fr) 20px
					`,
				}}
			>
				<div
					style={{
						gridArea: "title",
						fontWeight: "bolder",
						display: "flex",
						alignItems: "center",
					}}
				>
					<h1>Results (Viet Nam)</h1>
					<div
						id="switcher"
						data-source={
							source === data.dataCollection ? "absolute" : "difference"
						}
						style={{
							display: "flex"
						}}
					>
						<button 
							onClick={() => switchSource("absolute")}
						>
							Absolute
						</button>
						<button
							onClick={() => switchSource("difference")}
						>
							Difference
						</button>
					</div>
				</div>
				<div
					className="selection"
					style={{
						gridArea: "selection",
						//display: "none",
						background: "rgba(0,30,0,0.6)",
						borderRadius: "12px",
					}}
				>
					<WorldCartogramSelector />
				</div>
				<div
					style={{ gridArea: "basic1", display: "none" }}
				>
					<h3>Precipitation</h3>
					<BarChart
						series={[
							{ data: precipitationData },
						]}
						height={100}
						margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
					/>
				</div>
				<div
					style={{ gridArea: "basic2" }}
				>
					<h3>Temperature</h3>
					<LineChart
						series={[
							{ 
								label: source === data.dataCollection ? 'Temperature (Celsius)' : 'Difference (Pencertage)',
								data: temperatureData 
							},
						]}
						height={100}
						margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
					/>
				</div>
				<div
					style={{ gridArea: "basic3" }}
				>
					<h3>Wind</h3>
					<LineChart
						series={[
							{ 
								label: source === data.dataCollection ? 'Wind speed (km/h)' : 'Difference (Percentage)',
								data: windData 
							},
						]}
						height={100}
						margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
					/>
				</div>
				<div
					style={{ gridArea: "compare" }}
				>
					<h3>All</h3>
					<ResponsiveChartContainer
						series={[
							{ type: "bar",
								data: precipitationData
							},
							{ type: "line",
								data: temperatureData
							},
							{ type: "line",
								data: windData
							},
						]}
						xAxis={[
							{
								data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(x => x.toString()),
								scaleType: "band",
								id: "x-axis-id"
							}
						]}
						height={290}
						margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
					>
						<BarPlot />
						<LinePlot />
						<ChartsXAxis label="Values" position="bottom" axisId={"x-axis-id"} />
					</ResponsiveChartContainer>
				</div>
			</main>
			<Footer
				style={{
					gridArea: "footer"
				}}
			/>
		</CommonFrame>
	);
};

export default Results;
