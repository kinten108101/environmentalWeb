type Record = {
	date: Date;
	temperature: number;
	precipitation: number;
	windSpeed: number;
	stationid: string;
};

type Data = Array<Record>;

export default Data;
