import { useState } from 'react'
import { Todo } from '../../models/Todo'

interface ListProps {
  todos: Todo[]
  onDelete: (id: number) => void
  onCheck: (id: number) => void
}

function List({ todos, onDelete, onCheck }: ListProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedButton, setSelectedButton] = useState('All')

  const displayedTodos = todos.filter((todo) => {
    if (selectedButton === 'Active') return !todo.isCompleted
    if (selectedButton === 'Completed') return todo.isCompleted
    return true
  })

  return (
    <div>
      <div className="tasks-priority-headers-container">
        <p className="tasks-header">Task</p>
        <p className="priority-header">Priority</p>
      </div>
      <div className="added-todos-container">
        {displayedTodos.map((element) => (
          <div
            className="added-todo"
            style={{
              textDecoration: element.isCompleted ? 'line-through' : 'none',
            }}
            key={element.id}
          >
            <input
              type="checkbox"
              checked={element.isCompleted}
              onChange={() => onCheck(element.id)}
              className="checkbox-container"
            />
            <div style={{ width: '375px' }}>
              <p className="added-todo-text">{element.todo}</p>
            </div>
            <p className="added-todo-priority-number">{element.priority}</p>
            <div
              onClick={() => onDelete(element.id)}
              onMouseOver={() => setHoveredId(element.id)}
              onMouseOut={() => setHoveredId(null)}
              className="delete-button-container"
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
          onClick={() => setSelectedButton('All')}
          className={selectedButton === 'All' ? 'selected-button' : ''}
        >
          All
        </button>
        <button
          onClick={() => setSelectedButton('Active')}
          className={selectedButton === 'Active' ? 'selected-button' : ''}
        >
          Active
        </button>
        <button
          onClick={() => setSelectedButton('Completed')}
          className={selectedButton === 'Completed' ? 'selected-button' : ''}
        >
          Completed
        </button>
      </div>
    </div>
  )
}

export default List
