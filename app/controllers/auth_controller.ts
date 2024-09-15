import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'


export default class AuthController {

  async githubCallback({ ally, response, auth }: HttpContext) {
    const gh = ally.use('github')

    if (gh.accessDenied()) {
      return response.badRequest('Access was denied by the user')
    }

    if (gh.stateMisMatch()) {
      return response.badRequest('We are unable to verify the request. Please try again')
    }

    if (gh.hasError()) {
      return response.badRequest(gh.getError())
    }

    const githubUser = await gh.user()

    const authUser = await User.query().where('email', githubUser.email).first()

    if (!authUser) {
      const newUser = await User.create({
        fullName: githubUser.name,
        email: githubUser.email,
        login: githubUser.original.login,
        avatarUrl: githubUser.avatarUrl,
        token: githubUser.token.token,
      })

      await auth.use('web').login(newUser)
    }

    return response.redirect(`/repot`)
  }
}
