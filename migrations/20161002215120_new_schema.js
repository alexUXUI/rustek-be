`use strict`

exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('followers', (table) => {
      table.increments()
      table.string('username')
      table.string('email')
      table.dateTime('datetime')
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('followers')
  ])
}
