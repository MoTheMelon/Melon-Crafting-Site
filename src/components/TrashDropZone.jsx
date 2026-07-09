import { useState } from 'react'
import Square from './Square'
import './TrashDropZone.css'

function TrashDropZone({ onDrop, ariaLabel = 'remove meal' }) {
  const [isOver, setIsOver] = useState(false)

  return (
    <div
      className={`trash-drop-zone${isOver ? ' trash-drop-zone-over' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsOver(true)
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsOver(false)
        onDrop(e.dataTransfer)
      }}
      role="button"
      aria-label={ariaLabel}
    >
      <Square />
    </div>
  )
}

export default TrashDropZone
