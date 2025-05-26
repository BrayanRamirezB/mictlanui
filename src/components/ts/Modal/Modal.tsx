import { useEffect, useRef, useCallback, memo } from 'react'
import clsx from 'clsx'

export type Effect = 'opaque' | 'blur' | 'transparent'
export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
  isOpen: boolean
  isDismissable?: boolean
  effect?: Effect
  color?: Color
  rounded?: Rounded
  size?: Size
  onClose: () => void
  children: React.ReactNode
  className?: string
}

const BACKDROP_EFFECTS: Record<Effect, string> = {
  opaque: 'bg-black/50',
  blur: 'backdrop-blur-sm',
  transparent: 'bg-transparent'
}

const COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/30',
  danger: 'bg-red-500/20'
}

const ROUNDED: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-xl',
  xl: 'rounded-2xl'
}

const SIZES: Record<Size, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full min-h-full'
}

const Modal = ({
  isOpen,
  isDismissable = true,
  effect = 'opaque',
  color = 'default',
  rounded = 'md',
  size = 'md',
  onClose,
  children,
  className
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDismissable) {
        onClose()
      }
    },
    [isDismissable, onClose]
  )

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        isDismissable
      ) {
        onClose()
      }
    },
    [isDismissable, onClose]
  )

  const trapFocus = useCallback((event: KeyboardEvent) => {
    if (!modalRef.current) return

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', trapFocus)
      document.body.style.overflow = 'hidden'

      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus()
      } else {
        modalRef.current?.focus()
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', trapFocus)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, handleKeyDown, handleClickOutside, trapFocus])

  if (!isOpen) return null

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center',
        BACKDROP_EFFECTS[effect]
      )}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={clsx(
          'animate-zoom-in shadow-lg w-full border-0 backdrop-blur-sm',
          COLORS[color],
          ROUNDED[rounded],
          SIZES[size],
          {
            'text-gray-200': effect === 'opaque',
            'text-gray-800 dark:text-gray-300': effect !== 'opaque'
          },
          className
        )}
        role='document'
      >
        {children}
      </div>
    </div>
  )
}

export default memo(Modal)
