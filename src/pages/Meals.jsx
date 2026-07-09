import { useState } from 'react'
import MealCard from '../components/MealCard'
import MealFormModal from '../components/MealFormModal'
import SquareButton from '../components/SquareButton'
import { useMeals } from '../hooks/useMeals'
import './Meals.css'

const CATEGORIES = ['breakfast', 'lunch', 'dinner', 'snack']

function Meals() {
  const { meals, addMeal, updateMeal, deleteMeal } = useMeals()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(null)
  const [isNewModalOpen, setNewModalOpen] = useState(false)
  const [editingMeal, setEditingMeal] = useState(null)
  const [deleteMode, setDeleteMode] = useState(false)

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !category || meal.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <section className="meals-page">
      <div className="meals-toolbar">
        <input
          type="text"
          className="meals-search"
          placeholder="search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="button" className="meals-new-button" onClick={() => setNewModalOpen(true)}>
          new meal
        </button>

        <div className="meals-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`meals-filter${category === cat ? ' meals-filter-active' : ''}`}
              onClick={() => setCategory((prev) => (prev === cat ? null : cat))}
            >
              {cat}
            </button>
          ))}
        </div>

        <SquareButton
          onClick={() => setDeleteMode((prev) => !prev)}
          ariaLabel={deleteMode ? 'exit delete mode' : 'enter delete mode'}
          active={deleteMode}
        />
      </div>

      <div className="meals-gallery">
        {filteredMeals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            deleteMode={deleteMode}
            onDelete={deleteMeal}
            onEdit={setEditingMeal}
          />
        ))}
      </div>

      {isNewModalOpen && (
        <MealFormModal
          onClose={() => setNewModalOpen(false)}
          onSubmit={(meal) => {
            addMeal(meal)
            setNewModalOpen(false)
          }}
        />
      )}

      {editingMeal && (
        <MealFormModal
          initialMeal={editingMeal}
          onClose={() => setEditingMeal(null)}
          onSubmit={(updates) => {
            updateMeal(editingMeal.id, updates)
            setEditingMeal(null)
          }}
        />
      )}
    </section>
  )
}

export default Meals
