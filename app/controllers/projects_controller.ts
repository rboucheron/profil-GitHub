import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import GithubRepot from '#models/github_repot'
import User from '#models/user'

export default class ProjectsController {
  async fetchProjectsByUser(userId: string, userName: string): void {
    const url = `https://api.github.com/users/${userName}/repos`;
    try {
      const response = await axios.get(url);


    } catch (error) {

    }

  }
}
