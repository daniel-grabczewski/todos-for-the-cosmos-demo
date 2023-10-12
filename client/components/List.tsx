import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { checkboxTodo, deleteTodo, fetchTodos } from '../slices/todos'
import '../styles/index.css'
import ReactSVG from 'react-svg'

function List() {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos)
  const [isHovered, setIsHovered] = useState(false)
  const fillColor = isHovered ? '#FF5050' : '#DADADA'
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const [localTodos, setLocalTodos] = useState(todos)

  const [showing, setShowing] = useState('All')

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  useEffect(() => {
    setLocalTodos(todos)
  }, [todos])

  function handleDelete(id: number) {
    dispatch(deleteTodo(id))
  }

  function handleCheck(id: number, event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(checkboxTodo(id))
  }

  function showAllHandler() {
    setLocalTodos(todos)
    setShowing('All')
  }

  function showActiveHandler() {
    setLocalTodos(todos.filter((todo) => todo.isCompleted == false))
    setShowing('Active')
  }

  function showCompletedHandler() {
    setLocalTodos(todos.filter((todo) => todo.isCompleted == true))
    setShowing('Completed')
  }

  return (
    <>
      <div>
        <div className={'tasks-priority-headers-container'}>
          <p className={'tasks-header'}>Tasks</p>
          <p className={'priority-header'}>Priorities</p>
        </div>
        {localTodos.map((element) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              margin: '0 10px',
              textDecoration: element.isCompleted ? 'line-through' : 'none',
            }}
            key={element.todo}
          >
            <input
              type="checkbox"
              checked={element.isCompleted}
              onChange={(event) => handleCheck(element.id, event)}
              style={{
                width: '20px',
                height: '20px',
                // Set background color to green when checkbox is checked
                border: '2px solid black', // Border color when checkbox is not checked
                borderRadius: '3px',
                cursor: 'pointer',
                marginRight: '-5px',
              }}
            />
            <div style={{ width: '250px' }}>
              <p>{element.todo}</p>
            </div>
            <p>{element.priority}</p>
            <div
              onClick={() => handleDelete(element.id)}
              onMouseOver={() => setHoveredId(element.id)}
              onMouseOut={() => setHoveredId(null)}
              style={{
                marginLeft: 'auto',
                marginRight: '10px',
                cursor: 'pointer',
                marginBottom : '-3px'
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  className="rect-transition"
                  width="21.1396"
                  height="2.5"
                  rx="1.25"
                  transform="matrix(0.707104 -0.707109 0.707104 0.707109 0.999756 15.6982)"
                  fill={hoveredId === element.id ? '#FF5050' : '#DADADA'}
                />
                <rect
                  className="rect-transition"
                  width="21.1396"
                  height="2.5"
                  rx="1.25"
                  transform="matrix(-0.707104 -0.707109 -0.707104 0.707109 17.3618 15.6982)"
                  fill={hoveredId === element.id ? '#FF5050' : '#DADADA'}
                />
              </svg>
            </div>
          </div>
        ))}
        <hr />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            margin: '0 10px',
          }}
        >
          <p>Showing:</p>
          <button onClick={showAllHandler}>All</button>
          <button onClick={showActiveHandler}>Active</button>
          <button onClick={showCompletedHandler}>Completed</button>
        </div>
      </div>
    </>
  )
}

export default List
