import type { HttpContext } from '@adonisjs/core/http'
import GithubRepot from '#models/github_repot'
import axios from 'axios'

export default class RepotsController {

  async index({response, auth, view}: HttpContext) {
    const user = auth.user;
    if (!user) {
      return response.status(400).send({})
    }

    const projects = await GithubRepot.query().where('userId', user.id);

    if (!projects) {
      const projects = await this.fetchProjects(user.id, user.login)
      return view.render('repots', { projects, user })

    }
    return view.render('repots', { projects, user })
  }


  async fetchProjects(userId: number, login: string): Promise<GithubRepot[]> {
    const url = `https://api.github.com/users/${login}/repos`
    try {
      const apiResponse = await axios.get(url)
      const fetchedRepos = apiResponse.data
      const savedRepos: GithubRepot[] = []

      for (const fetchedRepo of fetchedRepos) {
        const savedRepo = await GithubRepot.create({
          name: fetchedRepo.name,
          homepage: fetchedRepo.homepage || null,
          description: fetchedRepo.description || null,
          language: fetchedRepo.language || null,
          htmlUrl: fetchedRepo.html_url,
          userId: userId,
        })
        savedRepos.push(savedRepo)
      }

      return savedRepos
    } catch (error) {
      console.error('Erreur lors de la récupération des dépôts GitHub :', error)
      throw new Error('Impossible de récupérer les dépôts GitHub.')
    }
  }



}