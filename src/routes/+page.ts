import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
  const response = await fetch('/api/stations');
  const stations = await response.json();

  return { stations };
}) satisfies PageLoad;