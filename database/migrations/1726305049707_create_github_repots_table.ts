import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'github_repots'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('name').nullable()
      table.string('homepage').nullable()
      table.string('description').nullable()
      table.string('language').nullable()
      table.string('html_url')






    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
