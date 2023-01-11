import { XMLParser } from 'fast-xml-parser';

export const getAllStations = async () => {
	const response = await fetch('http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML');

  const xml = await response.text();
  const parser: XMLParser = new XMLParser();
  const obj = await parser.parse(xml);

  const arrayOfObjStation =  obj.ArrayOfObjStation;
  const objStation = arrayOfObjStation.objStation;
  const descriptions = objStation.map((station: any) => station.StationDesc);
  
  console.log(descriptions);
  
  return descriptions;
};
