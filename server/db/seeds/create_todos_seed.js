/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('todos').del();
  await knex('todos').insert([
    { todo: 'Walk the dog', priority: 1, is_completed: false },
    { todo: 'Do the laundry', priority: 2, is_completed: true },
    { todo: 'Vacuum the house', priority: 3, is_completed: false }
  ]);
};