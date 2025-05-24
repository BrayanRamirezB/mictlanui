import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'

type Variant = keyof typeof VARIANT_STYLES
type Color = keyof typeof BG_COLORS
type Font = keyof typeof FONT_SIZES
type Rounding = keyof typeof ROUNDINGS

export interface DropdownSectionProps {
  heading?: string
  showDivider?: boolean
  variant?: Variant
  color?: Color
  font?: Font
  rounded?: Rounding
  className?: string
  children: ReactNode
}

export const VARIANT_STYLES = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
} as const

export const BG_COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/5 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
} as const

export const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
} as const

export const BORDER_COLORS = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
} as const

export const FONT_SIZES = {
  sm: 'font-normal',
  md: 'font-medium',
  lg: 'font-semibold',
  xl: 'font-bold'
} as const

export const DIVIDER_COLORS = {
  default: 'bg-zinc-700 dark:bg-neutral-100/70',
  primary: 'bg-blue-500',
  secondary: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
} as const

export const ROUNDINGS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg'
} as const

const DropdownSection = forwardRef<HTMLDivElement, DropdownSectionProps>(
  (
    {
      children,
      heading,
      showDivider = false,
      variant = 'light',
      color = 'default',
      font = 'md',
      rounded = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const headerClasses = clsx(
      'px-4',
      VARIANT_STYLES[variant],
      variant !== 'light' && ROUNDINGS[rounded],
      TEXT_COLORS[color],
      FONT_SIZES[font],
      variant === 'default' && BG_COLORS[color],
      variant === 'bordered' && BORDER_COLORS[color]
    )

    const dividerClasses = clsx('my-2 h-px', DIVIDER_COLORS[color])

    return (
      <div
        ref={ref}
        role='region'
        aria-label={heading || 'Dropdown Section'}
        className={clsx('flex flex-col', className)}
        {...props}
      >
        {heading && <h3 className={headerClasses}>{heading}</h3>}
        {children}
        {showDivider && <div className={dividerClasses} role='separator' />}
      </div>
    )
  }
)

export default memo(DropdownSection)
