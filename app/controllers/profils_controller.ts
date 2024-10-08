import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import UserBio from '#models/user_bio'

export default class ProfilsController {
  async updateView({ auth, view }: HttpContext) {
    const user = auth.user
    if (user) {
      const avatarTypes: string[] = [
        `${env.get('DICE_BEAR')}adventurer-neutral/svg?seed=${user.fullName}`,
        `${env.get('DICE_BEAR')}big-ears-neutral/svg?seed=${user.fullName}`,
        `${env.get('DICE_BEAR')}fun-emoji/svg?seed=${user.fullName}`,
        `${env.get('DICE_BEAR')}dylan/svg?seed=${user.fullName}`,
        `${env.get('DICE_BEAR')}open-peeps/svg?seed=${user.fullName}`,
        `${env.get('DICE_BEAR')}pixel-art/svg?seed=${user.fullName}`,
        `${env.get('DICE_BEAR')}notionists/svg?seed=${user.fullName}`,
        `${env.get('DICE_BEAR')}personas/svg?seed=${user.fullName}`,
      ]

      const bio = await UserBio.query().where('userId', user.id).first()

      if (!bio) {
        return view.render('pages/profil', { avatarTypes, user })
      }

      return view.render('pages/profil', { avatarTypes, user, bio })
    }
  }
}
