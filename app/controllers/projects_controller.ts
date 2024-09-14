import axios from 'axios'
import GithubRepot from '#models/github_repot'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProjectsController {
  async index({ request, view }: HttpContext) {
    const userCookie = request.cookie('user')
    const user = userCookie ? JSON.parse(userCookie) : null

    const githubRepot = await GithubRepot.query().where('user_id', user.id).first()

    if (githubRepot) {
      return view.render('dashboard', { githubRepot, user })
    }

    await this.fetchProjectsByUser(user.id, user.login)

    return
  }

  async fetchProjectsByUser(userId: number, userName: string) {
    const url = `https://api.github.com/users/${userName}/repos`
    try {
      const response = await axios.get(url)
      const repos = response.data

      for (const repo of repos) {
        await GithubRepot.create({
          name: repo.name,
          homepage: repo.homepage || null,
          description: repo.description || null,
          language: repo.language || null,
          htmlUrl: repo.html_url,
          userId: userId,
        })
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des dépôts GitHub :', error)
      throw new Error('Impossible de récupérer les dépôts GitHub.')
    }
  }
}