export async function up(knex) {
  await knex.schema.alterTable('users', function (table) {
    table.dropColumn('text')
    table.string('email').unique()
    table.string('password')
    table.string('auth0Id')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('users', function (table) {
    table.string('text')
    table.dropColumn('email')
    table.dropColumn('password')
    table.dropColumn('auth0Id')
  })
}
