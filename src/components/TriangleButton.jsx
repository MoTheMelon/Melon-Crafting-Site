import Triangle from './Triangle'
import './TriangleButton.css'

function TriangleButton({ direction, onClick, ariaLabel }) {
  return (
    <button
      type="button"
      className="triangle-button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Triangle direction={direction} />
    </button>
  )
}

export default TriangleButton
