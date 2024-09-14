import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import HomeController from '#controllers/home_controller'
import ProjectsController from '#controllers/projects_controller'

router.get('/', [HomeController, 'index'])

router.get('/github/redirect', ({ ally }) => {
  return ally.use('github').redirect()
})

router.get('/github/callback', [AuthController, 'githubCallback'])

router.get('/dashbord', [ProjectsController, 'index'])
