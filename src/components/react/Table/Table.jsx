import { memo } from 'react'
import clsx from 'clsx'

const VARIANTS = {
  default: 'border-0 backdrop-blur-sm shadow-lg',
  bordered: 'border shadow-md',
  light: ''
}

const COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-600',
  secondary: 'text-indigo-800 dark:text-indigo-600',
  success: 'text-green-800 dark:text-green-600',
  warning: 'text-yellow-800 dark:text-yellow-600',
  danger: 'text-red-800 dark:text-red-500'
}

const BORDER_COLORS = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const ROUNDEDS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl'
}

const Table = ({
  children,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  className = '',
  ...props
}) => {
  const containerClass = clsx(
    'w-full overflow-auto',
    VARIANTS[variant],
    ROUNDEDS[rounded],
    TEXT_COLORS[color],
    variant === 'bordered' && BORDER_COLORS[color],
    className
  )

  const tableClass = clsx(
    'w-full border-collapse',
    variant === 'default' && COLORS[color]
  )

  return (
    <div
      className={containerClass}
      role='region'
      aria-label='Data Table'
      {...props}
    >
      <table className={tableClass} role='table'>
        {children}
      </table>
    </div>
  )
}

export default memo(Table)
