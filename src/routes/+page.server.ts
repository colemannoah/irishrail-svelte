import type { PageServerLoad } from "./$types"
import { error } from "@sveltejs/kit"


export const load = (async () => {
  // TODO: Implement station lookup

  throw error(404, 'Not found, not available');
}) satisfies PageServerLoad