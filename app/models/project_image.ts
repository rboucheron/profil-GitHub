
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ProjectImage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare github_repots_id: number;

  @column()
  declare imageSrc: string;

  @column()
  declare imageAlt: string;


}
