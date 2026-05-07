import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, locals }) => {
  const post = await locals.fetcher.get(params.id)

  return { post, id: params.id }
}
