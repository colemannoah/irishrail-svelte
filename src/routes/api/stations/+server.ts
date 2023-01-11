import { json, type RequestHandler } from '@sveltejs/kit';
import { getAllStations } from '../../lib/server/getAllStations';
import { getStationDataByName } from '../../lib/server/getStationData';

export const POST = (async ({ request }) => {
	const { stationName } = await request.json();
	const data = await getStationDataByName(stationName);

	return json(data);
}) satisfies RequestHandler;

export const GET = (async () => {
	const descriptions = await getAllStations();

	return json(descriptions);
}) satisfies RequestHandler;
