/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

router.get('/github/redirect', ({ ally }) => {
  return ally.use('github').redirect()
})

router.get('/github/callback', async ({ ally }) => {
  const gh = ally.use('github')
  if (gh.accessDenied()) {
    return
  }

  if (gh.stateMisMatch()) {
    return 'We are unable to verify the request. Please try again'
  }

  if (gh.hasError()) {
    return gh.getError()
  }

  const user = await gh.user()
  return user
})
