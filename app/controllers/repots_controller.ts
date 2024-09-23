import type { HttpContext } from '@adonisjs/core/http'
import GithubRepot from '#models/github_repot'
import axios from 'axios'


export default class RepotsController {
  async index({ response, auth, view }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(400).send({})
    }

    const projects = await GithubRepot.query().where('userId', user.id)

    if (!projects.length && user.login) {
      const newProjects = await this.fetchProjects(user.id, user.login)
      return view.render('pages/repots', { projects: newProjects, user })
    }

    if (projects.length == 0) {
      return view.render('pages/repots', { user })
    }

    return view.render('pages/repots', { projects, user })
  }

  async fetchProjects(userId: number, login: string): Promise<GithubRepot[]> {
    const url = `https://api.github.com/users/${login}/repos`
    try {
      const { data: fetchedRepos } = await axios.get(url)
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

  async addRepot({ request, auth, response }: HttpContext) {

    const { name, homepage, description, language, htmlUrl } = request.only([
      'name',
      'homepage',
      'description',
      'language',
      'htmlUrl',
    ])
    const user = auth.user

    if (user) {
      await GithubRepot.create({
        userId: user.id,
        name: name,
        homepage: homepage,
        description: description,
        language: language,
        htmlUrl: htmlUrl,
      })

      return response.redirect(`/repot`)
    }


  }

  async repotForm({ params, response, auth, view }: HttpContext) {
    const user = auth.user
    const repotID = params.id
    const repot = await GithubRepot.query().where('id', repotID).first()
    if (!repot) {
      return response.status(400).send({})
    }
    return view.render('pages/repots', { repot, user })
  }

  async updateForm({ params, response, auth, view }: HttpContext) {
    const {id} = params
    const repot = await GithubRepot.query().where('id', id).first()
    const user = auth.user
    if (!repot) {
      return response.status(400).send({})

    }

    return view.render('pages/update', {repot, user})
  }

  async deleteRepot({ params, response}: HttpContext) {
    const {id} = params
    const repot = await GithubRepot.query().where('id', id).delete()
    if (!repot) {
      return response.status(500).send({})
    }
    return response.redirect(`/repot`)
  }

  async updateRepot({ response, request }: HttpContext) {
    return response.status(200).send({request})
  }


}
