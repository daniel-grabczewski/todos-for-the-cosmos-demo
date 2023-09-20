import AddTodo from './AddTodo'
import List from './List'

const TodoApp = () => {
  return (
    <div style={{
      background: 'white',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}>
      <AddTodo />
      <List />
    </div>
  )
}

export default TodoApp
