import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UserBio extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  public declare userId: number

  @column()
  public declare bio: string


}
