import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const ProfilsController = () => import('#controllers/profils_controller')
const AuthController = () => import('#controllers/auth_controller')
const RepotsController = () => import('#controllers/repots_controller')

router.on('/').render('pages/home')

router.get('/github/redirect', ({ ally }) => {
  return ally.use('github').redirect()
})

router.get('/github/callback', [AuthController, 'githubCallback'])

router.get('/repot', [RepotsController, 'index']).use(middleware.auth())
router.get('/repot/update/:id', [RepotsController, 'index']).use(middleware.auth())
router.get('/profil', [ProfilsController, 'updateView']).use(middleware.auth())
router.on('/login').render('pages/login')
router.on('/signin').render('pages/signin')
router.post('/login', [AuthController, 'login'])
router.post('/signin', [AuthController, 'registration'])
