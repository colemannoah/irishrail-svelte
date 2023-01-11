import { XMLParser } from "fast-xml-parser";

export const getStationDataByName = async (stationName: string) => {
	const response = await fetch(
		`https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=${stationName}`
	);

	const xml = await response.text();
  const parser: XMLParser = new XMLParser();
  const obj = await parser.parse(xml);

	console.log(obj);
	
	return obj;
};
