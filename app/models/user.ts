import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare login: string

  @column()
  declare name?: string

  @column()
  declare email: string

  @column()
  declare emailVerificationState: string

  @column()
  declare nickName?: string

  @column()
  declare avatarUrl?: string

  @column()
  declare token?: string
}
