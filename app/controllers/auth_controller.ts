import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {


  async verifyToken(token: string): Promise<boolean> {
    const authUser = await User.query().where('token', token).first()
    if (authUser) {
      return true
    }
    return false
  }

  async githubCallback({ ally, response }: HttpContext) {
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

    if (authUser) {
      return authUser
    }

    const newUser = await User.create({
      email: githubUser.email,
      name: githubUser.name,
      nickName: githubUser.nickName,
      avatarUrl: githubUser.avatarUrl,
      emailVerificationState: 'verified',
      token: githubUser.token.token,
    })

    return newUser
  }
}
