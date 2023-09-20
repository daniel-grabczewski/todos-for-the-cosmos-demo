import request from 'superagent'
import { UpdatedTodo, NewTodo, UpdatedTodoPriority } from '../../models/Todo'

const baseUrl = '/api/v1/' // Replace with your base URL

//--- GET REQUESTS ---//

//GET ALL TODOS
export function getAllTodos(): Promise<any> {
  return request.get(`${baseUrl}`)
}

//GET A TODO GIVEN ITS ID
export function getTodoById(todoId: number): Promise<any> {
  return request.get(`${baseUrl}${todoId}`)
}

//GET TODOS BASED ON GIVEN PRIORTIY (TRUE OR FALSE)
export function getTodosByCompletion(isCompleted: boolean): Promise<any> {
  return request.get(`${baseUrl}completed/${isCompleted}`)
}

//--- POST REQUESTS ---//

//ADD A NEW TODO
export function addTodo(newTodo: NewTodo): Promise<any> {
  return request.post(`${baseUrl}`).send(newTodo)
}

//--- PATCH REQUESTS ---//

//UPDATE COMPLETION OF A TODO GIVEN ITS ID
export function completeTodo(todoId: number): Promise<any> {
  return request.patch(`${baseUrl}complete/${todoId}`)
}

//UPDATE A TODO GIVEN ITS ID AND NEW TODO TEXT
export function updateTodo(updatedTodo: UpdatedTodo): Promise<any> {
  return request.patch(`${baseUrl}${updatedTodo.id}`).send(updatedTodo)
}

//UPDATE PRIORITY OF A TODO GIVEN ITS ID AND A NEW PRIORITY
export function updateTodoPriority(
  updatedTodoPriority: UpdatedTodoPriority
): Promise<any> {
  return request
    .patch(`${baseUrl}priority/${updatedTodoPriority.id}`)
    .send(updatedTodoPriority)
}

//--- DELETE REQUESTS ---//

//DELETE ALL COMPLETED TODOS WHERE IS_COMPLETED IS TRUE
export function clearCompletedTodos(): Promise<any> {
  return request.delete(`${baseUrl}completed`)
}

//REMOVE A TODO GIVEN ITS ID
export function removeTodo(todoId: number): Promise<any> {
  return request.delete(`${baseUrl}${todoId}`)
}
