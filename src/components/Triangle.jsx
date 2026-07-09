import './Triangle.css'

const ROTATION = {
  right: 0,
  down: 90,
  left: 180,
  up: 270,
}

function Triangle({ direction = 'right', className = '' }) {
  return (
    <svg
      className={`triangle ${className}`.trim()}
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${ROTATION[direction]}deg)` }}
      aria-hidden="true"
    >
      <polygon points="7,4 20,12 7,20" />
    </svg>
  )
}

export default Triangle
