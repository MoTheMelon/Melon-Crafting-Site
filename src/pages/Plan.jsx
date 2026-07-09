import { useState } from 'react'
import WeekCalendar from '../components/WeekCalendar'
import MealDrawer from '../components/MealDrawer'
import { useMeals } from '../hooks/useMeals'
import { usePlan } from '../hooks/usePlan'
import { getMonday, addDays } from '../utils/week'
import './Plan.css'

function Plan() {
  const { meals } = useMeals()
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()))
  const [plan, setPlan] = usePlan()

  function handleDropMeal(dateKey, meal) {
    setPlan((prev) => {
      const next = { ...prev }
      if (meal.sourceDateKey && meal.instanceKey) {
        next[meal.sourceDateKey] = (next[meal.sourceDateKey] ?? []).filter(
          (m) => m.key !== meal.instanceKey,
        )
      }
      const entry = {
        id: meal.id,
        name: meal.name,
        key: meal.instanceKey || `${meal.id}-${Date.now()}`,
      }
      next[dateKey] = [...(next[dateKey] ?? []), entry]
      return next
    })
  }

  function handleRemoveMeal(sourceDateKey, instanceKey) {
    setPlan((prev) => ({
      ...prev,
      [sourceDateKey]: (prev[sourceDateKey] ?? []).filter((m) => m.key !== instanceKey),
    }))
  }

  return (
    <section className="plan-page">
      <WeekCalendar
        weekStart={weekStart}
        onPrevWeek={() => setWeekStart((d) => addDays(d, -7))}
        onNextWeek={() => setWeekStart((d) => addDays(d, 7))}
        onToday={() => setWeekStart(getMonday(new Date()))}
        plan={plan}
        onDropMeal={handleDropMeal}
        onRemoveMeal={handleRemoveMeal}
      />
      <MealDrawer meals={meals} />
    </section>
  )
}

export default Plan
