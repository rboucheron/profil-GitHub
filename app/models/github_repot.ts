import type { HasOne } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, hasOne } from '@adonisjs/lucid/orm'
import User from '#models/user'

export default class GithubRepot extends BaseModel {

  @column({ isPrimary: true })
  public declare id: number

  @column()
  public declare name: string | null

  @column()
  public declare homepage?: string

  @column()
  public declare description: string | null

  @column()
  public declare language: string | null

  @column()
  public declare htmlUrl: string

  @hasOne(() => User, {
    foreignKey: 'user_id',
  })
  declare userId: HasOne<typeof User>
}
