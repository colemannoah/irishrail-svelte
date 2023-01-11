import { XMLParser } from 'fast-xml-parser';

type Station = {
	StationDesc: string;
	StationAlias: string;
	StationLatitude: number;
	StationLongitude: number;
	StationCode: string;
	StationId: number;
};

export const getAllStations = async () => {
	const response = await fetch('http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML');

	const xml = await response.text();
	const parser: XMLParser = new XMLParser();
	const obj = await parser.parse(xml);

	const arrayOfObjStation = obj.ArrayOfObjStation;
	const objStation = arrayOfObjStation.objStation;
	const descriptions = objStation.map((station: Station) => station.StationDesc);

	return descriptions;
};
