import { useState, useEffect, useId, forwardRef, useCallback } from 'react'
import clsx from 'clsx'

const POSITIONS = {
  top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
}

const ROUNDINGS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const BACKGROUNDS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const Tooltip = forwardRef(
  (
    {
      children,
      content,
      color = 'default',
      rounded = 'md',
      placement = 'top',
      isDisabled = false,
      delay = 300,
      className,
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const tooltipId = `tooltip-${autoId}`

    const [isHovered, setIsHovered] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
      if (isDisabled) {
        setIsOpen(false)
        return
      }
      let timeout = null
      if (isHovered) {
        timeout = setTimeout(() => setIsOpen(true), delay)
      } else {
        setIsOpen(false)
      }
      return () => clearTimeout(timeout)
    }, [isHovered, isDisabled, delay])

    const handleMouseEnter = useCallback(() => setIsHovered(true), [])
    const handleMouseLeave = useCallback(() => setIsHovered(false), [])

    const tooltipClasses = clsx(
      'absolute z-50 border-0 shadow-md backdrop-blur-sm animate-fade-in whitespace-nowrap text-sm px-3 py-1',
      POSITIONS[placement],
      ROUNDINGS[rounded],
      BACKGROUNDS[color],
      TEXT_COLORS[color]
    )

    return (
      <div
        ref={ref}
        className={clsx('relative inline-flex', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-describedby={isOpen && !isDisabled ? tooltipId : undefined}
        {...props}
      >
        {children}
        {isOpen && !isDisabled && (
          <div
            id={tooltipId}
            role='tooltip'
            className={tooltipClasses}
            data-placement={placement}
            data-disabled={isDisabled}
            aria-hidden={!isOpen}
          >
            {content}
          </div>
        )}
      </div>
    )
  }
)

export default Tooltip
