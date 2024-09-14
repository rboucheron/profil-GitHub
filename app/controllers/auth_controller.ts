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
      response.cookie('user', JSON.stringify({
        id: authUser.id,
        token: authUser.token,
        name: authUser.name,
        nickName: authUser.nickName,
        avatarUrl: authUser.avatarUrl,
        login: authUser.login,
      }), {

        maxAge: '7d',
        path: '/',
        secure: true,
        sameSite: 'strict',
      })

      return

    }

    const newUser = await User.create({
      email: githubUser.email,
      name: githubUser.name,
      nickName: githubUser.nickName,
      avatarUrl: githubUser.avatarUrl,
      emailVerificationState: 'verified',
      token: githubUser.token.token,
      login: githubUser.original.login

    })

    response.cookie('user', JSON.stringify({
      id: newUser.id,
      token: newUser.token,
      name: newUser.name,
      nickName: githubUser.nickName,
      avatarUrl: newUser.avatarUrl,
      login: newUser.login,
    }), {
      httpOnly: true,
      maxAge: '7d',
      path: '/',
      secure: true,
      sameSite: 'strict',
    })


  }
}
