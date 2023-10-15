import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { checkboxTodo, deleteTodo, fetchTodos } from '../slices/todos'
import '../styles/index.css'

function List() {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const [localTodos, setLocalTodos] = useState(todos)

  const [selectedButton, setSelectedButton] = useState('All')

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
    setSelectedButton('All')
  }

  function showActiveHandler() {
    setLocalTodos(todos.filter((todo) => todo.isCompleted == false))
    setSelectedButton('Active')
  }

  function showCompletedHandler() {
    setLocalTodos(todos.filter((todo) => todo.isCompleted == true))
    setSelectedButton('Completed')
  }

  return (
    <>
      <div>
        <div className="tasks-priority-headers-container">
          <p className="tasks-header">Task</p>
          <p className="priority-header">Priority</p>
        </div>
        <div className="added-todos-container">
          {localTodos.map((element) => (
            <div
            className = 'added-todo'
              style={{
                textDecoration: element.isCompleted ? 'line-through' : 'none',
              }}
              key={element.todo}
            >
              <input
                type="checkbox"
                checked={element.isCompleted}
                onChange={(event) => handleCheck(element.id, event)}
                className = 'checkbox-container'
              />
              <div style={{ width: '375px' }}>
                <p className="added-todo-text">{element.todo}</p>
              </div>
              <p className="added-todo-priority-number">{element.priority}</p>
              <div
                onClick={() => handleDelete(element.id)}
                onMouseOver={() => setHoveredId(element.id)}
                onMouseOut={() => setHoveredId(null)}
                className = 'delete-button-container'
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
        </div>
        <hr />
        <div className="filter-controls-container">
          <p className="showing-text">Showing:</p>
          <button
            onClick={showAllHandler}
            className={selectedButton === 'All' ? 'selected-button' : ''}
          >
            All
          </button>
          <button
            onClick={showActiveHandler}
            className={selectedButton === 'Active' ? 'selected-button' : ''}
          >
            Active
          </button>
          <button
            onClick={showCompletedHandler}
            className={selectedButton === 'Completed' ? 'selected-button' : ''}
          >
            Completed
          </button>
        </div>
      </div>
    </>
  )
}

export default List
