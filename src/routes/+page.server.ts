import type { PageServerLoad } from './[id]/$types'

export const load: PageServerLoad = async ({ locals }) => {
  const posts = await locals.fetcher.list()

  return { posts }
}
