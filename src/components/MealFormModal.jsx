import { useState } from 'react'
import './MealFormModal.css'

const CATEGORIES = ['breakfast', 'lunch', 'dinner', 'snack']

function MealFormModal({ initialMeal, onSubmit, onClose }) {
  const isEditing = Boolean(initialMeal)
  const [name, setName] = useState(initialMeal?.name ?? '')
  const [image, setImage] = useState(initialMeal?.image ?? '')
  const [category, setCategory] = useState(initialMeal?.category ?? CATEGORIES[0])

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit({ name: name.trim(), image: image.trim(), category })
  }

  return (
    <div className="meal-form-backdrop" onClick={onClose}>
      <form
        className="meal-form-modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2>{isEditing ? 'edit meal' : 'new meal'}</h2>

        <label className="meal-form-field">
          name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
        </label>

        <label className="meal-form-field">
          image url
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="optional"
          />
        </label>

        <label className="meal-form-field">
          category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <div className="meal-form-actions">
          <button type="button" className="meal-form-cancel" onClick={onClose}>
            cancel
          </button>
          <button type="submit" className="meal-form-submit">
            {isEditing ? 'save changes' : 'add meal'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default MealFormModal
