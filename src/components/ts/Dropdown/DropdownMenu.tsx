import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'
import { useDropdown } from '@/components/ts/Dropdown/Dropdown'

type Variant = keyof typeof VARIANT_STYLES
type Color = keyof typeof BG_COLORS
type Rounding = keyof typeof ROUNDINGS

export interface DropdownMenuProps {
  variant?: Variant
  color?: Color
  rounded?: Rounding
  id?: string
  className?: string
  children: ReactNode
}

export const VARIANT_STYLES = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
} as const

export const BG_COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
} as const

export const BORDER_COLORS = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
} as const

export const ROUNDINGS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg'
} as const

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      children,
      variant = 'default',
      color = 'default',
      rounded = 'md',
      id,
      className,
      ...props
    },
    ref
  ) => {
    const { isOpen } = useDropdown()

    const classes = clsx(
      'origin-top-right animate-fade-in-down flex flex-col right-0 mt-2 w-full transition',
      !isOpen && 'hidden',
      VARIANT_STYLES[variant],
      variant === 'default' && BG_COLORS[color],
      variant === 'bordered' && BORDER_COLORS[color],
      ROUNDINGS[rounded],
      className
    )

    return (
      <div
        ref={ref}
        id={id}
        role='menu'
        aria-hidden={!isOpen}
        aria-labelledby='aria-labelledby'
        aria-describedby='aria-describedby'
        className={classes}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export default memo(DropdownMenu)
