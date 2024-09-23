import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'project_images'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('github_repots_id').unsigned().references('id').inTable('github_repots').onDelete('CASCADE')
      table.string('image_src').notNullable()
      table.string('image_alt').notNullable()


    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
