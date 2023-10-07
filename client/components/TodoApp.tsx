import AddTodo from './AddTodo'
import List from './List'

const TodoApp = () => {
  return (
    <div
      style={{
        background: 'rgba(0, 0, 0, 0.55)',
        color: '#F1F1F1',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        padding: '20px 20px'
      }}
    >
      <AddTodo />
      <List />
    </div>
  )
}

export default TodoApp
