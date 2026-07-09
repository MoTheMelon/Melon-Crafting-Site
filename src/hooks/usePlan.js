import { useEffect, useState } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

export function usePlan() {
  const { user } = useAuth()
  const [plan, setPlanState] = useState({})

  useEffect(() => {
    if (!user) {
      setPlanState({})
      return
    }

    const planRef = doc(db, 'users', user.uid, 'meta', 'plan')
    const unsubscribe = onSnapshot(planRef, (snap) => {
      setPlanState(snap.exists() ? (snap.data().entries ?? {}) : {})
    })

    return unsubscribe
  }, [user])

  function setPlan(updater) {
    if (!user) return
    setPlanState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      setDoc(doc(db, 'users', user.uid, 'meta', 'plan'), { entries: next })
      return next
    })
  }

  return [plan, setPlan]
}
