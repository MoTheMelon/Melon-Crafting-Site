import { NavLink } from 'react-router-dom'
import './NavBar.css'

const pages = [
  { to: '/plan', label: 'plan' },
  { to: '/meals', label: 'meals' },
  { to: '/groceries', label: 'groceries' },
]

function NavBar() {
  return (
    <nav className="nav-bar">
      {pages.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? 'nav-bar-link nav-bar-link-active' : 'nav-bar-link'
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default NavBar
