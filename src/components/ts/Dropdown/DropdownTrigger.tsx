import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'
import { useDropdown } from '@/components/ts/Dropdown/Dropdown'

const VARIANT_STYLES = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
} as const

const BG_COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
} as const

const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
} as const

const BORDER_COLORS = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
} as const

const HOVER_BG_COLORS = {
  default: 'hover:bg-neutral-100/30 dark:hover:bg-zinc-700/50',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/10',
  success: 'hover:bg-green-500/30 dark:hover:bg-green-500/10',
  warning: 'hover:bg-yellow-500/30 dark:hover:bg-yellow-500/10',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
} as const

const SIZE_STYLES = {
  sm: 'font-light text-xs px-2 py-1.5',
  md: 'font-medium text-sm px-4 py-2',
  lg: 'font-medium text-base px-8 py-2.5'
} as const

const ROUNDINGS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
} as const

export type DropdownTriggerProps = {
  variant?: keyof typeof VARIANT_STYLES
  color?: keyof typeof BG_COLORS
  rounded?: keyof typeof ROUNDINGS
  size?: keyof typeof SIZE_STYLES
  className?: string
  children: ReactNode
}

const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  (
    {
      children,
      variant = 'default',
      color = 'default',
      rounded = 'md',
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const { toggleDropdown, isOpen } = useDropdown()

    const classes = clsx(
      'inline-flex justify-center items-center transition',
      VARIANT_STYLES[variant],
      SIZE_STYLES[size],
      TEXT_COLORS[color],
      variant === 'default' && BG_COLORS[color],
      variant === 'bordered' && BORDER_COLORS[color],
      HOVER_BG_COLORS[color],
      ROUNDINGS[rounded],
      className
    )

    return (
      <button
        ref={ref}
        type='button'
        className={classes}
        onClick={toggleDropdown}
        aria-haspopup='menu'
        aria-expanded={isOpen}
        role='button'
        {...props}
      >
        {children}
      </button>
    )
  }
)

export default memo(DropdownTrigger)
