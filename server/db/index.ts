import knexFile from './knexfile';
import knex from 'knex';
import type { UpdatedTodo, NewTodo, UpdatedTodoPriority } from '../../models/Todo';

const environment = (process.env.NODE_ENV || 'development') as 'production' | 'test' | 'development';
const config = knexFile[environment];
const connection = knex(config);

//--- GET REQUESTS ---//

// GET ALL TODOS
export async function getAllTodos(db = connection) {
  return db('todos').select('id', 'todo', 'priority', 'is_completed as isCompleted');
}

// GET A TODO GIVEN ITS ID
export async function getTodoById(todoId: number, db = connection) {
  return db('todos').select('id', 'todo', 'priority', 'is_completed as isCompleted').where('id', todoId).first();
}

// GET TODOS BASED ON GIVEN PRIORTIY (TRUE OR FALSE)
export async function getTodosByCompletion(isCompleted: boolean, db = connection) {
  return db('todos').select('id', 'todo', 'priority', 'is_completed as isCompleted').where('is_completed', isCompleted);
}

//--- POST REQUESTS ---//

// ADD A NEW TODO
export async function addTodo(newTodo: NewTodo, db = connection) {
  return db('todos').insert(newTodo);
}

//--- PATCH REQUESTS ---//

// UPDATE COMPLETION OF A TODO GIVEN ITS ID
export async function completeTodo(todoId: number, db = connection) {
  const todo = await db('todos').where('id', todoId).first();
  const updatedValue = !todo.is_completed; // Toggle the value

  return db('todos').where('id', todoId).update({ is_completed: updatedValue });
}

// UPDATE A TODO GIVEN ITS ID AND NEW TODO TEXT
export async function updateTodo(updatedTodo: UpdatedTodo, db = connection) {
  return db('todos').where('id', updatedTodo.id).update({ todo: updatedTodo.todo });
}

// UPDATE PRIORITY OF A TODO GIVEN ITS ID AND A NEW PRIORITY
export async function updateTodoPriority(updatedTodoPriority: UpdatedTodoPriority, db = connection) {
  return db('todos').where('id', updatedTodoPriority.id).update({ priority: updatedTodoPriority.priority });
}

//--- DELETE REQUESTS ---//

// DELETE ALL COMPELTED TODOS WHERE IS_COMPLETED IS TRUE
export async function clearCompletedTodos(db = connection) {
  return db('todos').where('is_completed', true).delete();
}

// REMOVE A TODO GIVEN ITS ID
export async function removeTodo (todoId: number, db = connection) {
  return db('todos').where('id', todoId).delete();
}
