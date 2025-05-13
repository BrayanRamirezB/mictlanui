import { useState, useEffect } from 'react'

const Tooltip = ({
  children,
  content,
  color = 'default',
  rounded = 'md',
  placement = 'top',
  isDisabled = false,
  delay = 300
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    let timeoutId

    if (isHovered && !isDisabled) {
      timeoutId = setTimeout(() => setIsOpen(true), delay)
    } else {
      setIsOpen(false)
    }

    return () => clearTimeout(timeoutId)
  }, [isHovered, isDisabled, delay])

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-800 dark:text-blue-500',
    secondary: 'text-indigo-800 dark:text-indigo-500',
    success: 'text-green-800 dark:text-green-500',
    warning: 'text-yellow-800 dark:text-yellow-500',
    danger: 'text-red-800 dark:text-red-500'
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-describedby={isOpen ? 'tooltip-content' : undefined}
      className='relative flex items-center'
    >
      {isOpen && !isDisabled && (
        <div
          id='tooltip-content'
          role='tooltip'
          data-open={isOpen}
          data-placement={placement}
          data-disabled={isDisabled}
          aria-hidden={!isOpen}
          className={`absolute z-99999 border-0 shadow-md backdrop-blur-sm ${positions[placement]} whitespace-nowrap text-sm px-3 py-1 
          ${roundeds[rounded]}
          ${textColors[color]}
          ${colors[color]}
          `}
        >
          {content}
        </div>
      )}
      {children}
    </div>
  )
}

export default Tooltip
