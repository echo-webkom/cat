import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, cookies }) => {
  const token = url.searchParams.get('token')

  if (!token) {
    return redirect(302, '/auth/logg-inn?error=missing_token')
  }

  cookies.set('session-token', token, {
    path: '/',
  })

  return redirect(302, '/')
}
