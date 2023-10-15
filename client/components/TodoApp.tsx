import AddTodo from './AddTodo'
import List from './List'

const TodoApp = () => {
  return (
      <div className="todo-box">
        <h1 className="page-header">todo</h1>
        <AddTodo />
        <List />
      </div>
  )
}

export default TodoApp
