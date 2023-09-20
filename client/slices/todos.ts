import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UpdatedTodo, NewTodo, UpdatedTodoPriority, Todo } from '../../models/Todo'
import { addTodo, clearCompletedTodos, completeTodo, getAllTodos, removeTodo } from '../apis'

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos', async () => {
   const response = await getAllTodos()
   return response.body
  }
)

export const postTodoThenFetch = createAsyncThunk(
  'todos/postTodoThenFetch',
  async (todo : NewTodo) => {
    await addTodo(todo)
    const response = await getAllTodos()
    return response.body
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async(id : number) => {
    await removeTodo(id)
    const response = await getAllTodos()
    return response.body
  }
)

export const checkboxTodo = createAsyncThunk(
  'todos/checkboxTodo',
  async(id : number) => {
    await completeTodo(id)
    const response = await getAllTodos()
    return response.body
  }
)

export const clearCompleted = createAsyncThunk(
  'todos/clearCompleted', async() => {
    await clearCompletedTodos()
    const response = await getAllTodos()
    return response.body
  }
)


const todosSlice = createSlice({
  name : 'todos',
  initialState: [] as Todo[],
  reducers: {},
  extraReducers: (builder) => 
    builder
      .addCase(fetchTodos.fulfilled, (state, {payload}) => payload)
      .addCase(postTodoThenFetch.fulfilled, (state, { payload}) => payload)
      .addCase(deleteTodo.fulfilled, (state, {payload}) => payload)
      .addCase(checkboxTodo.fulfilled, (state, {payload}) => payload)
      .addCase(clearCompleted.fulfilled, (state, {payload}) => payload)
})

export default todosSlice.reducer