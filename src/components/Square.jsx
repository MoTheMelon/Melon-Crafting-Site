import './Square.css'

function Square({ className = '' }) {
  return (
    <svg className={`square ${className}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="3" ry="3" />
    </svg>
  )
}

export default Square
