import { XMLParser } from 'fast-xml-parser';

export type StationData = {
	Servertime: Date;
	Traincode: string;
	Stationfullname: string;
	Stationcode: string;
	Querytime: string;
	Traindate: string;
	Origin: string;
	Destination: string;
	Origintime: string;
	Destinationtime: string;
	Status: string;
	Lastlocation: string;
	Duein: number;
	Late: number;
	Exparrival: string;
	Expdepart: string;
	Scharrival: string;
	Schdepart: string;
	Direction: string;
	Traintype: string;
	Locationtype: string;
};

export type StationDataResponse = {
	departures: StationData[];
	arrivals: StationData[];
	stops: StationData[];
}

export const getStationDataByName = async (stationName: string) => {
	const response = await fetch(
		`https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=${stationName}`
	);

	const xml = await response.text();
	const parser: XMLParser = new XMLParser();
	const obj = await parser.parse(xml);

	const arrayOfObjStationData = obj.ArrayOfObjStationData;
	const objStationData = arrayOfObjStationData.objStationData;
	
	const departures = objStationData.filter((station: StationData) => station.Locationtype === 'O');
	const arrivals = objStationData.filter((station: StationData) => station.Locationtype === 'D');
	const stops = objStationData.filter((station: StationData) => station.Locationtype === 'S');

	const stationDataResponse: StationDataResponse = {
		departures,
		arrivals,
		stops
	}

	return stationDataResponse;
};
