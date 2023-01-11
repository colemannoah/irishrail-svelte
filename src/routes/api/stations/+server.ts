import { json, type RequestHandler } from '@sveltejs/kit';
import xml2js from 'xml2js';

export interface ArrayOfObjStation {
  objStation: ObjStation[];
}

export interface ObjStation {
  stationDesc:      string;
  stationAlias:     string;
  stationLatitude:  number;
  stationLongitude: number;
  stationCode:      string;
  stationId:        number;
}

export const POST = (async ({ request }) => {
  const { stationName } = await request.json();
  const response = await fetch(`https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=${stationName}`);
  
  const text = await response.text();
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(text);
  const data = await JSON.parse(JSON.stringify(result));

  return json(data);
}) satisfies RequestHandler;

export const GET = (async () => {
  const response = await fetch('http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML');
  const xml = await response.text();
  const result = await xml2js.parseStringPromise(xml);
  
  const stationArray = result.ArrayOfObjStation;
  const stations = stationArray.objStation;
  
  const descriptions = stations.map(station => station.StationDesc);

  console.log(descriptions);
  return json(descriptions);
}) satisfies RequestHandler;
