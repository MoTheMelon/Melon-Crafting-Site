import { useEffect, useState } from 'react'
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  runTransaction,
  writeBatch,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import seedMeals from '../data/meals.json'

async function seedIfNeeded(uid) {
  const seedMarkerRef = doc(db, 'users', uid, 'meta', 'mealsSeeded')

  const shouldSeed = await runTransaction(db, async (tx) => {
    const marker = await tx.get(seedMarkerRef)
    if (marker.exists()) return false
    tx.set(seedMarkerRef, { seededAt: Date.now() })
    return true
  })

  if (!shouldSeed) return

  const mealsRef = collection(db, 'users', uid, 'meals')
  const batch = writeBatch(db)
  seedMeals.forEach(({ id, ...meal }) => batch.set(doc(mealsRef), meal))
  await batch.commit()
}

export function useMeals() {
  const { user } = useAuth()
  const [meals, setMeals] = useState([])

  useEffect(() => {
    if (!user) {
      setMeals([])
      return
    }

    seedIfNeeded(user.uid)

    const mealsRef = collection(db, 'users', user.uid, 'meals')
    const unsubscribe = onSnapshot(mealsRef, (snapshot) => {
      setMeals(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
    })

    return unsubscribe
  }, [user])

  async function addMeal(meal) {
    if (!user) return
    await addDoc(collection(db, 'users', user.uid, 'meals'), meal)
  }

  async function updateMeal(id, updates) {
    if (!user) return
    await updateDoc(doc(db, 'users', user.uid, 'meals', id), updates)
  }

  async function deleteMeal(id) {
    if (!user) return
    await deleteDoc(doc(db, 'users', user.uid, 'meals', id))
  }

  return { meals, addMeal, updateMeal, deleteMeal }
}
