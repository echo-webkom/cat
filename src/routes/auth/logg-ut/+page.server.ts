import { extractSessionId, signOut } from '$lib/auth'
import type { Actions } from '@sveltejs/kit'

export const actions: Actions = {
  default: async ({ locals, cookies }) => {
    const sessionToken = cookies.get('session-token')
    if (sessionToken) {
      const token = await extractSessionId(sessionToken)
      if (token) {
        await signOut(token)
      }
    }
    cookies.delete('session-token', { path: '/' })
    locals.user = null
  },
}
