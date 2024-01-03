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

// GET ALL TODOS
export function getAllTodos(): Todo[] {
  return getTodosFromLocalStorage()
}

// ADD A NEW TODO
export function addTodo(newTodo: NewTodo): Todo[] {
  const todos = getTodosFromLocalStorage()
  const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1
  const todoToAdd = { ...newTodo, id: newId, isCompleted: false }
  const updatedTodos = [...todos, todoToAdd]
  setTodosInLocalStorage(updatedTodos)
  return updatedTodos
}

// REMOVE A TODO GIVEN ITS ID
export function removeTodo(todoId: number): Todo[] {
  const todos = getTodosFromLocalStorage()
  const updatedTodos = todos.filter((todo) => todo.id !== todoId)
  setTodosInLocalStorage(updatedTodos)
  return updatedTodos
}

// UPDATE COMPLETION OF A TODO GIVEN ITS ID
export function completeTodo(todoId: number): Todo[] {
  const todos = getTodosFromLocalStorage()
  const updatedTodos = todos.map((todo) =>
    todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
  )
  setTodosInLocalStorage(updatedTodos)
  return updatedTodos
}

// DELETE ALL COMPLETED TODOS WHERE IS_COMPLETED IS TRUE
export function clearCompletedTodos(): Todo[] {
  const todos = getTodosFromLocalStorage()
  const updatedTodos = todos.filter((todo) => !todo.isCompleted)
  setTodosInLocalStorage(updatedTodos)
  return updatedTodos
}

// You can similarly implement other functionalities if needed.
