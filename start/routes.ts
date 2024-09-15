import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const HomeController = () => import('#controllers/home_controller')
const AuthController = () => import('#controllers/auth_controller')
const RepotsController = () => import('#controllers/repots_controller')

router.get('/', [HomeController, 'index'])

router.get('/github/redirect', ({ ally }) => {
  return ally.use('github').redirect()
})

router.get('/github/callback', [AuthController, 'githubCallback'])

router.get('/repot', [RepotsController, 'index']).use(middleware.auth())
