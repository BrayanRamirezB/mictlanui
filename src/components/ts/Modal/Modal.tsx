import { useEffect, useRef, type ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  isDismissable?: boolean
  effect?: 'opaque' | 'blur' | 'transparent'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  onClose: () => void
  children: ReactNode
}

const Modal = ({
  isOpen,
  isDismissable = true,
  effect = 'opaque',
  color = 'default',
  rounded = 'md',
  size = 'md',
  onClose,
  children
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDismissable) {
        onClose()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        isDismissable
      ) {
        onClose()
      }
    }

    const trapFocus = (event: KeyboardEvent) => {
      if (isOpen && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement

        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault()
              lastElement.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault()
              firstElement.focus()
            }
          }
        }
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', trapFocus)
      document.body.style.overflow = 'hidden'

      if (modalRef.current) {
        modalRef.current.focus()
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', trapFocus)
      document.body.style.overflow = 'auto'
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
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`animate-zoom-in ${colors[color]} ${
          roundeds[rounded]
        } shadow-lg w-full ${sizes[size]} border-0 backdrop-blur-sm ${
          effect === 'opaque' ? 'text-gray-200' : 'text-gray-800 '
        } dark:text-gray-300`}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
