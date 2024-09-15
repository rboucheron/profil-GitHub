import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AuthController = () => import('#controllers/auth_controller')
const RepotsController = () => import('#controllers/repots_controller')

router.on('/').render('pages/home')

router.get('/github/redirect', ({ ally }) => {
  return ally.use('github').redirect()
})

router.get('/github/callback', [AuthController, 'githubCallback'])

router.get('/repot', [RepotsController, 'index']).use(middleware.auth())
