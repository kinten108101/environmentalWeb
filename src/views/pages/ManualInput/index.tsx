import axios from "axios";
import CommonFrame from "../../components/CommonFrame"
import Headerbar from "../../components/Headerbar"
import Footer from "../../components/Footer"
import bulb from "../../../assets/bulb.png"
import { Button, TextField } from "@mui/material";
import { useContext } from "react";
import DatabaseContext from "../../../controllers/contexts/DatabaseContext";

const MockInput = function () {
	const dbc = useContext(DatabaseContext);

	function submit(e) {
		e.preventDefault();
		const temperature = Number(e.target.temperature.value);
		const velox = Number(e.target.velox.value);
		const veloy = Number(e.target.veloy.value);
		const veloz = Number(e.target.veloz.value);
		const timestamp = new Date().toISOString();
		const uuid = Math.floor(Math.random() * 10000);
		const essn = 1;
		const stationid = "AAAAA";

		if (dbc === undefined || dbc === null)
			return;
		let address =  dbc.address;
		if (!address.match(/^http[s]?\:\/\/.*/))
			address = "http://" + address;

		let content = {
			uuid, timestamp, temperature, velox, veloy, veloz, essn, stationid 
		};

		content = {
        "uuid": 2992,
        "timestamp": "2024-11-15T17:00:00.000Z",
        "temperature": 37,
        "velox": 4,
        "veloy": 5,
        "veloz": 8,
        "essn": 15,
        "stationid": "AAAAA"
    };

		const body = JSON.stringify(content);
		console.log(body);

		console.log("body", body)

		axios.post(
			`${address}/api/weather/report`, 
			content,
			{ 
				headers: {
					'Content-Type': 'application/json'
				},
			},
			).then(x => {
				console.log(x);
			})
			.catch(console.error);
	}

	return(
		<CommonFrame>
			<Headerbar
				style={{
					gridArea: "headerbar",
				}}
			/>
			<div 
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					paddingLeft: "48px",
					background: `url(${bulb}) no-repeat`,
					WebkitBackgroundSize: "cover",
					MozBackgroundSize: "cover",
					OBackgroundSize: "cover",
					backgroundSize: "cover"
				}}
			>
				<form
					onSubmit={submit}
					style={{
						backgroundColor: "white",
						display: "flex",
						flexDirection: "column",
						padding: "12px",
						borderRadius: "12px"
					}}
				>
					<h1>Manual Insert (Today)</h1>
					<TextField label="Temperature" id="temperature" />
					<TextField label="Wind x" id="velox" />
					<TextField label="Wind y" id="veloy" />
					<TextField label="Wind z" id="veloz" />
					<Button type="submit">Submit</Button>
				</form>
			</div>
			<Footer
				style={{
					gridArea: "footer",
				}}
			/>
		</CommonFrame>
	);
};

export default MockInput;
