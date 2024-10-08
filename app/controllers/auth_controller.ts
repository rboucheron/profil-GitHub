import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registrationValidator } from '#validators/auth'
import hash from '@adonisjs/core/services/hash'

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

    if (authUser) {
      await auth.use('web').login(authUser)
    }

    return response.redirect(`/repot`)
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.query().where('email', email).first()

    if(!user){
      return response.abort('Invalid credentials')
    }

    if (user.password !== null) {
      const isPasswordValid = await hash.verify(user.password, password)

      if (isPasswordValid){
        await auth.use('web').login(user)
        return response.redirect(`/repot`)

      }
    }
    return response.status(400).send({'message': '404'})
  }

  async registration({ request, response, auth }: HttpContext) {
    try {
      await registrationValidator.validate(request.all())
      const { email, fullName, password } = request.only(['email', 'fullName', 'password'])

      const newUser = await User.create({
        email: email,
        fullName: fullName,
        password: password,
      })

      if (newUser) {
        await auth.use('web').login(newUser)
        return response.redirect(`/repot`)
      }

      return response.status(500).send({ error: "Erreur lors de la création de l'utilisateur" })
    } catch (error) {
      if (error.messages) {
        return response.badRequest(error.messages)
      }

      return response.status(500).send({ error: 'Une erreur est survenue' })
    }
  }
}
