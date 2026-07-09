import { useState } from 'react'
import TriangleButton from './TriangleButton'
import SquareButton from './SquareButton'
import TrashDropZone from './TrashDropZone'
import { WEEKDAY_LABELS, formatMMDD, getWeekDays, toDateKey } from '../utils/week'
import './WeekCalendar.css'

function DayColumn({ label, date, dateKey, meals, onDropMeal }) {
  const [isOver, setIsOver] = useState(false)

  return (
    <div
      className={`day-column${isOver ? ' day-column-over' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsOver(true)
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsOver(false)
        const mealId = e.dataTransfer.getData('text/plain')
        const mealName = e.dataTransfer.getData('text/meal-name')
        const sourceDateKey = e.dataTransfer.getData('text/source-date')
        const instanceKey = e.dataTransfer.getData('text/instance-key')
        if (mealId) {
          onDropMeal({
            id: mealId,
            name: mealName,
            sourceDateKey: sourceDateKey || null,
            instanceKey: instanceKey || null,
          })
        }
      }}
    >
      <div className="day-label">{label}</div>
      <div className="day-date">{formatMMDD(date)}</div>
      <div className="day-meals">
        {meals.map((meal) => (
          <div
            key={meal.key}
            className="meal-chip"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', meal.id)
              e.dataTransfer.setData('text/meal-name', meal.name)
              e.dataTransfer.setData('text/source-date', dateKey)
              e.dataTransfer.setData('text/instance-key', meal.key)
            }}
          >
            {meal.name}
          </div>
        ))}
      </div>
    </div>
  )
}

function WeekCalendar({
  weekStart,
  onPrevWeek,
  onNextWeek,
  onToday,
  plan,
  onDropMeal,
  onRemoveMeal,
}) {
  const days = getWeekDays(weekStart)
  const rangeLabel = `${formatMMDD(days[0])} - ${formatMMDD(days[6])}`

  return (
    <div className="week-calendar">
      <div className="week-calendar-header">
        <SquareButton onClick={onToday} ariaLabel="jump to current week" />
        <TriangleButton direction="left" onClick={onPrevWeek} ariaLabel="previous week" />
        <span className="week-range-label">{rangeLabel}</span>
        <TriangleButton direction="right" onClick={onNextWeek} ariaLabel="next week" />
        <TrashDropZone
          ariaLabel="remove meal from plan"
          onDrop={(dataTransfer) => {
            const sourceDateKey = dataTransfer.getData('text/source-date')
            const instanceKey = dataTransfer.getData('text/instance-key')
            if (sourceDateKey && instanceKey) onRemoveMeal(sourceDateKey, instanceKey)
          }}
        />
      </div>
      <div className="week-days">
        {days.map((date, i) => {
          const key = toDateKey(date)
          return (
            <DayColumn
              key={key}
              label={WEEKDAY_LABELS[i]}
              date={date}
              dateKey={key}
              meals={plan[key] ?? []}
              onDropMeal={(meal) => onDropMeal(key, meal)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default WeekCalendar
