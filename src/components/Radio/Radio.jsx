import { useState } from 'react'

const Radio = ({
  value,
  isSelected = false,
  isDisabled = false,
  isReadOnly = false,
  children,
  description,
  onChange,
  color
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleChange = () => {
    if (!isDisabled && !isReadOnly && onChange) {
      onChange(value)
    }
  }

  const handleMouseDown = () => {
    if (!isDisabled && !isReadOnly) {
      setIsPressed(true)
    }
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  const handleMouseEnter = () => {
    if (!isDisabled && !isReadOnly) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const colors = {
    default: 'bg-zinc-700/30 dark:bg-neutral-100/50',
    primary: 'bg-blue-500/50 ',
    secondary: 'bg-indigo-500/50 ',
    success: 'bg-green-500/60 ',
    warning: 'bg-yellow-500/60 ',
    danger: 'bg-red-500/50 '
  }

  return (
    <div
      data-selected={isSelected}
      data-pressed={isPressed}
      data-readonly={isReadOnly}
      data-hover-unselected={isHovered && !isSelected}
      data-hover={isHovered}
      data-disabled={isDisabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleChange}
      className={`flex items-center gap-2 ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <input
        type='radio'
        value={value}
        checked={isSelected}
        disabled={isDisabled || isReadOnly}
        onChange={handleChange}
        className='hidden'
      />

      <div
        className={`size-5 rounded-full flex items-center justify-center transition-colors ${
          isSelected
            ? colors[color]
            : 'border-2 border-zinc-700/50 dark:border-neutral-100/50'
        } ${isHovered ? 'bg-zinc-700/30 dark:bg-neutral-100/30' : ''}`}
      >
        {isSelected && (
          <div
            className={`size-3 border-2 rounded-full border-transparent ${colors[color]}`}
          ></div>
        )}
      </div>

      <div className='flex flex-col'>
        <div className='text-sm font-medium'>{children}</div>

        {description && <p className='text-sm font-light'>{description}</p>}
      </div>
    </div>
  )
}

export default Radio
