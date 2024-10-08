import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().notNullable()
      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('avatar_url').nullable()
      table.string('token').nullable()
      table.string('login').nullable()
      table.string('password').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      // Utilise table.timestamps() pour ajouter created_at et updated_at
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}



