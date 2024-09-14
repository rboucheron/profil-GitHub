
import { column, BaseModel} from '@adonisjs/lucid/orm'


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

  @column()
  public declare userId: number
}
