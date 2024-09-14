import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('email_verification_state').notNullable().defaultTo('unverified')
      table.string('name').nullable()
      table.string('nick_name').nullable()
      table.string('avatar_url').nullable()
      table.string('token').nullable()
      table.string('login').notNullable()


      // Utilise table.timestamps() pour ajouter created_at et updated_at
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
