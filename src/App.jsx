import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import NavBar from './components/NavBar'
import AccountButton from './components/AccountButton'
import RequireAuth from './components/RequireAuth'
import Plan from './pages/Plan'
import Meals from './pages/Meals'
import Groceries from './pages/Groceries'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AccountButton />
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/plan" replace />} />
          <Route
            path="/plan"
            element={
              <RequireAuth>
                <Plan />
              </RequireAuth>
            }
          />
          <Route
            path="/meals"
            element={
              <RequireAuth>
                <Meals />
              </RequireAuth>
            }
          />
          <Route path="/groceries" element={<Groceries />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
