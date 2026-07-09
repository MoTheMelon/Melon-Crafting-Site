import { useState } from 'react'
import Triangle from './Triangle'
import './MealDrawer.css'

function MealDrawer({ meals }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="meal-drawer-hover-zone"
        onMouseEnter={() => {
          if (!open) setOpen(true)
        }}
      />
      <div className={`meal-drawer${open ? ' meal-drawer-open' : ''}`}>
        <button
          type="button"
          className="meal-drawer-tab"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'close meal menu' : 'open meal menu'}
        >
          <Triangle direction={open ? 'down' : 'up'} />
        </button>
        <div className="meal-drawer-panel">
          <div className="meal-drawer-grid">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="meal-card"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', meal.id)
                  e.dataTransfer.setData('text/meal-name', meal.name)
                }}
              >
                {meal.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MealDrawer
