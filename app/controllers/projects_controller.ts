import axios from 'axios'
import GithubRepot from '#models/github_repot'

export default class ProjectsController {


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
