import { useEffect, useRef } from 'react'

const Drawer = ({
  isOpen,
  onClose,
  isDismissable = true,
  position = 'right',
  effect = 'opaque',
  size = 'md',
  color = 'default',
  children,
  labelledBy,
  describedBy
}) => {
  const drawerRef = useRef(null)
  const lastFocusedElement = useRef(null)

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/20 ',
    warning: 'bg-yellow-500/20 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const textColors = {
    default: `${
      effect === 'opaque' ? 'text-gray-200' : 'text-gray-800 '
    } dark:text-gray-300`,
    primary: 'text-blue-400 dark:text-blue-500',
    secondary: 'text-indigo-400 dark:text-indigo-500',
    success: 'text-green-400 dark:text-green-500',
    warning: 'text-yellow-400 dark:text-yellow-500',
    danger: 'text-red-400 dark:text-red-500'
  }

  const backdropEffects = {
    opaque: 'bg-black/50',
    blur: 'backdrop-blur-sm',
    transparent: 'bg-transparent'
  }

  const drawerWSizes = {
    sm: 'w-1/4',
    md: 'w-1/3',
    lg: 'w-1/2',
    xl: 'w-3/4',
    full: 'w-full'
  }

  const drawerHSizes = {
    sm: 'h-1/4',
    md: 'h-1/3',
    lg: 'h-1/2',
    xl: 'h-3/4',
    full: 'h-full'
  }

  const drawerPositions = {
    top: 'top-0 left-0 right-0 w-full animate-fade-in-down',
    bottom: 'bottom-0 left-0 right-0 w-full animate-fade-in-up',
    left: 'left-0 top-0 bottom-0 h-full animate-fade-in-right',
    right: 'right-0 top-0 bottom-0 h-full animate-fade-in-left'
  }

  const drawerStyle = `${drawerPositions[position]} ${
    position === 'top' || position === 'bottom'
      ? drawerHSizes[size]
      : drawerWSizes[size]
  } fixed`

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen && isDismissable) {
        onClose()
      }
    }

    const handleClickOutside = (event) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        isOpen &&
        isDismissable
      ) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose, isDismissable])

  useEffect(() => {
    if (isOpen) {
      lastFocusedElement.current = document.activeElement
      drawerRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
      lastFocusedElement.current?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 ${textColors[color]}`}
      role='dialog'
      aria-modal='true'
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      <div
        className={`fixed inset-0 ${backdropEffects[effect]}`}
        aria-hidden='true'
      />
      <div
        ref={drawerRef}
        className={`border-0 shadow-lg backdrop-blur-sm ${drawerStyle} ${colors[color]}`}
        data-open={isOpen}
        data-dismissable={isDismissable}
      >
        <div className='flex flex-col h-full'>{children}</div>
      </div>
    </div>
  )
}

export default Drawer
