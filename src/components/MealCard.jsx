import './MealCard.css'

function MealCard({ meal, deleteMode, onDelete, onEdit }) {
  return (
    <div
      className={`meal-card-tile${deleteMode ? ' meal-card-tile-delete' : ''}`}
      onClick={() => (deleteMode ? onDelete(meal.id) : onEdit(meal))}
    >
      <div className="meal-card-image">
        {meal.image ? <img src={meal.image} alt="" /> : <span className="meal-card-placeholder" />}
      </div>
      <div className="meal-card-name">{meal.name}</div>
      {deleteMode && <div className="meal-card-delete-overlay" />}
    </div>
  )
}

export default MealCard
