/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('todos').del()
  await knex('todos').insert([
    { todo: 'Start a civilization on mars', priority: 2, is_completed: false },
    { todo: 'Explore a new galaxy', priority: 4, is_completed: true },
    { todo: 'Walk the surface of the sun', priority: 5, is_completed: false },
  ])
}
