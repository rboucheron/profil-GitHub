import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'

router.on('/').render('pages/home')

router.get('/github/redirect', ({ ally }) => {
  return ally.use('github').redirect()
})

router.get('/github/callback', [AuthController, 'githubCallback'])
