import React, { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import '../styles/index.css'
import { NewTodo } from '../../models/Todo'

interface AddTodoProps {
  onAddTodo: (newTodo: NewTodo) => void
}

function AddTodo({ onAddTodo }: AddTodoProps) {
  const [form, setForm] = useState<NewTodo>({ todo: '', priority: 3 })

  function handleChange(event: React.ChangeEvent<HTMLInputElement> | any) {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: name === 'priority' ? Number(value) : value,
    })
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onAddTodo(form)
    setForm({ todo: '', priority: 3 })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What does the universe require of you?"
        value={form.todo}
        onChange={handleChange}
        name="todo"
      />
      <hr />
      <div className="change-priority-container">
        <label htmlFor="priority">
          <h3 className="change-priority-header">Priority:</h3>
        </label>
        <Slider
          className="slider-length"
          onChange={(value) => {
            handleChange({
              target: {
                name: 'priority',
                value: value,
              },
            })
          }}
          min={1}
          max={5}
          value={form.priority}
        />
      </div>
      <div className="change-priority-button-container">
        <button type="submit" style={{ alignContent: 'center' }}>
          Add
        </button>
      </div>
      <hr />
    </form>
  )
}

export default AddTodo
