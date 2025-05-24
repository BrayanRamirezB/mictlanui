import {
  forwardRef,
  useRef,
  useEffect,
  useCallback,
  memo,
  type ReactNode,
  type RefObject
} from 'react'
import clsx from 'clsx'

type Position = keyof typeof POSITION_CLASSES
type Effect = keyof typeof BACKDROP_EFFECTS
type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full'
type Color = keyof typeof BG_COLORS

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  isDismissable?: boolean
  position?: Position
  effect?: Effect
  size?: Size
  color?: Color
  labelledBy?: string
  describedBy?: string
  className?: string
  children: ReactNode
}

export const BG_COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
} as const

export const TEXT_COLORS = (effect: Effect) => ({
  default: `${
    effect === 'opaque' ? 'text-gray-200' : 'text-gray-800'
  } dark:text-gray-300`,
  primary: 'text-blue-400 dark:text-blue-500',
  secondary: 'text-indigo-400 dark:text-indigo-500',
  success: 'text-green-400 dark:text-green-500',
  warning: 'text-yellow-400 dark:text-yellow-500',
  danger: 'text-red-400 dark:text-red-500'
})

export const BACKDROP_EFFECTS = {
  opaque: 'bg-black/50',
  blur: 'backdrop-blur-sm',
  transparent: 'bg-transparent'
} as const

export const SIZE_CLASSES = (position: Position) =>
  ({
    w: { sm: 'w-1/4', md: 'w-1/3', lg: 'w-1/2', xl: 'w-3/4', full: 'w-full' },
    h: { sm: 'h-1/4', md: 'h-1/3', lg: 'h-1/2', xl: 'h-3/4', full: 'h-full' }
  }[position === 'top' || position === 'bottom' ? 'h' : 'w'])

export const POSITION_CLASSES = {
  top: 'top-0 left-0 right-0 w-full animate-fade-in-down',
  bottom: 'bottom-0 left-0 right-0 w-full animate-fade-in-up',
  left: 'left-0 top-0 bottom-0 h-full animate-fade-in-right',
  right: 'right-0 top-0 bottom-0 h-full animate-fade-in-left'
} as const

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen,
      onClose,
      isDismissable = true,
      position = 'right',
      effect = 'opaque',
      size = 'md',
      color = 'default',
      children,
      labelledBy,
      describedBy,
      className,
      ...props
    },
    ref
  ) => {
    const drawerRef =
      (ref as RefObject<HTMLDivElement>) || useRef<HTMLDivElement>(null)
    const lastFocused = useRef<HTMLElement | null>(null)

    const handleEscape = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen && isDismissable) onClose()
      },
      [isOpen, isDismissable, onClose]
    )

    const handleClickOutside = useCallback(
      (e: MouseEvent) => {
        if (
          drawerRef.current &&
          !drawerRef.current.contains(e.target as Node) &&
          isOpen &&
          isDismissable
        )
          onClose()
      },
      [isOpen, isDismissable, onClose]
    )

    useEffect(() => {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [handleEscape, handleClickOutside])

    useEffect(() => {
      if (isOpen) {
        lastFocused.current = document.activeElement as HTMLElement
        drawerRef.current?.focus()
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
        lastFocused.current?.focus()
      }
    }, [isOpen])

    if (!isOpen) return null

    const sizeClass = SIZE_CLASSES(position)[size]
    const positionClass = POSITION_CLASSES[position]
    const styleClass = clsx(positionClass, sizeClass, 'fixed')
    const bgColorClass = BG_COLORS[color]
    const textColorClass = TEXT_COLORS(effect)[color]
    const backdropClass = BACKDROP_EFFECTS[effect]

    return (
      <div
        className={clsx('fixed inset-0 z-50', textColorClass, className)}
        role='dialog'
        aria-modal='true'
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        {...props}
      >
        <div
          className={clsx('fixed inset-0', backdropClass)}
          aria-hidden='true'
        />
        <div
          ref={drawerRef}
          className={clsx(
            'border-0 shadow-lg backdrop-blur-sm',
            styleClass,
            bgColorClass
          )}
          data-open={isOpen}
          data-dismissable={isDismissable}
          tabIndex={-1}
        >
          <div className='flex flex-col h-full'>{children}</div>
        </div>
      </div>
    )
  }
)

Drawer.displayName = 'Drawer'

export default memo(Drawer)
