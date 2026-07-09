import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Plan from './pages/Plan'
import Meals from './pages/Meals'
import Groceries from './pages/Groceries'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/plan" replace />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/groceries" element={<Groceries />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
