import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  public async index({ request, view }: HttpContext) {

    const userCookie = request.cookie('user')
    const user = userCookie ? JSON.parse(userCookie) : null

    return view.render('home', { user })
  }
}
