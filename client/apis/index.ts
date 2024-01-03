import { NewTodo, Todo } from '../../models/Todo.js'
import { initialTodos } from '../data/data.js'

const TODO_STORAGE_KEY = 'todos'

// Initialize local storage with initial data
if (!localStorage.getItem(TODO_STORAGE_KEY)) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(initialTodos))
}

// Utility function to get and parse todos from local storage
function getTodosFromLocalStorage(): Todo[] {
  const todos = localStorage.getItem(TODO_STORAGE_KEY)
  return todos ? JSON.parse(todos) : []
}

// Utility function to set todos in local storage
function setTodosInLocalStorage(todos: Todo[]) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos))
}

//!--- GET REQUESTS ---//

// GET ALL TODOS
export function getAllTodos(): Todo[] {
  return getTodosFromLocalStorage()
}

//GET A TODO GIVEN ITS ID
export function getTodoById(todoId: number) {
  const todos = getTodosFromLocalStorage()
  return todos.find((todo) => todo.id === todoId)
}

//GET TODOS BASED ON GIVEN COMPLETION (TRUE OR FALSE)
export function getTodosByCompletion(isCompleted: boolean) {
  const todos = getTodosFromLocalStorage()
  return todos.filter((todo) => todo.isCompleted === isCompleted)
}

//!--- POST REQUESTS ---//

// ADD A NEW TODO
export function addTodo(newTodo: NewTodo): Todo[] {
  const todos = getTodosFromLocalStorage()
  const newId =
    todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1
  const todoToAdd = { ...newTodo, id: newId, isCompleted: false }
  const updatedTodos = [...todos, todoToAdd]
  setTodosInLocalStorage(updatedTodos)
  return updatedTodos
}

//!--- PATCH REQUESTS ---//

// UPDATE BY TOGGLING COMPLETION OF A TODO GIVEN ITS ID
export function completeTodo(todoId: number): Todo[] {
  const todos = getTodosFromLocalStorage()
  const updatedTodos = todos.map((todo) =>
    todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
  )
  setTodosInLocalStorage(updatedTodos)
  return updatedTodos
}

// UPDATE PRIORITY OF A TODO GIVEN ITS ID AND A NEW PRIORITY

//UPDATE A TODO GIVEN ITS ID AND NEW TODO TEXT

//!--- DELETE REQUESTS ---//

// REMOVE A TODO GIVEN ITS ID
export function removeTodo(todoId: number): Todo[] {
  const todos = getTodosFromLocalStorage()
  const updatedTodos = todos.filter((todo) => todo.id !== todoId)
  setTodosInLocalStorage(updatedTodos)
  return updatedTodos
}

// DELETE ALL COMPLETED TODOS WHERE ISCOMPLETED IS TRUE
export function clearCompletedTodos(): Todo[] {
  const todos = getTodosFromLocalStorage()
  const updatedTodos = todos.filter((todo) => !todo.isCompleted)
  setTodosInLocalStorage(updatedTodos)
  return updatedTodos
}
