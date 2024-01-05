import { useEffect, useState } from 'react'
import AddTodo from './AddTodo'
import List from './List'
import {
  addTodo,
  getAllTodos,
  removeTodo,
  toggleTodoCompletionById,
} from '../apis'
import { NewTodo, Todo } from '../../models/Todo'

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    setTodos(getAllTodos())
  }, [])

  const handleAddTodo = (newTodo: NewTodo) => {
    addTodo(newTodo)
    setTodos(getAllTodos())
  }

  function handleDelete(id: number) {
    removeTodo(id)
    setTodos(getAllTodos())
  }

  const handleCheck = (id: number) => {
    toggleTodoCompletionById(id);
    setTodos(getAllTodos());
  };

  return (
    <div className="todo-box">
      <h1 className="page-header">todo</h1>
      <AddTodo onAddTodo={handleAddTodo} />
      <List todos={todos} onDelete={handleDelete} onCheck={handleCheck} />
    </div>
  )
}

export default TodoApp
