import Square from './Square'
import './SquareButton.css'

function SquareButton({ onClick, ariaLabel, active }) {
  return (
    <button
      type="button"
      className={`square-button${active ? ' square-button-active' : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Square />
    </button>
  )
}

export default SquareButton
