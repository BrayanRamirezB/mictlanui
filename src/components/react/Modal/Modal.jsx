import { useEffect, useRef } from 'react'

const Modal = ({
  isOpen,
  isDismissable = true,
  effect = 'opaque',
  color = 'default',
  rounded = 'md',
  size = 'md',
  onClose,
  children
}) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isDismissable) {
        onClose()
      }
    }

    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        isDismissable
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden' // Prevent scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto' // Restore scrolling
    }
  }, [isOpen, isDismissable, onClose])

  if (!isOpen) return null

  const backdropEffects = {
    opaque: 'bg-black/50',
    blur: 'backdrop-blur-sm',
    transparent: 'bg-transparent'
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/20 ',
    warning: 'bg-yellow-500/30 ',
    danger: 'bg-red-500/20 '
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-xl',
    xl: 'rounded-2xl'
  }

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full min-h-full'
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${backdropEffects[effect]}`}
    >
      <div
        ref={modalRef}
        className={`${colors[color]} ${roundeds[rounded]} shadow-lg w-full ${
          sizes[size]
        } border-0 backdrop-blur-sm ${
          effect === 'opaque' ? 'text-gray-200' : 'text-gray-800 '
        } dark:text-gray-300`}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
