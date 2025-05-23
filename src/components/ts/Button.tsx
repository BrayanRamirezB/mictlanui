import { useMemo, memo } from 'react'
import type { FC, ReactNode, MouseEvent } from 'react'
import clsx from 'clsx'

export type ButtonVariant = 'default' | 'bordered' | 'light' | 'complete'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type ButtonColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export interface LoadingSpinnerProps {
  color: ButtonColor
}

export interface ButtonProps {
  variant?: ButtonVariant
  disabled?: boolean
  size?: ButtonSize
  rounded?: ButtonRounded
  color?: ButtonColor
  isLoading?: boolean
  onClick?: () => void
  children?: ReactNode
  className?: string
}

const VARIANTS: Record<ButtonVariant, string> = {
  default: 'border-0 shadow-md backdrop-blur-sm',
  bordered: 'border border-current shadow-md',
  light: '',
  complete: 'backdrop-blur-xl'
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-lg'
}

const ROUNDEDS: Record<ButtonRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const COLORS: Record<ButtonColor, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/5',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/30',
  danger: 'bg-red-500/20'
}

const SHADOW_COLORS: Record<ButtonColor, string> = {
  default: 'shadow-lg shadow-zinc-700/30 dark:shadow-neutral-100/20',
  primary: 'shadow-lg shadow-blue-500/20',
  secondary: 'shadow-lg shadow-indigo-500/20',
  success: 'shadow-lg shadow-green-500/30',
  warning: 'shadow-lg shadow-yellow-500/20',
  danger: 'shadow-lg shadow-red-500/20'
}

const TEXT_COLORS: Record<ButtonColor, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-600',
  secondary: 'text-indigo-800 dark:text-indigo-600',
  success: 'text-green-800 dark:text-green-600',
  warning: 'text-yellow-800 dark:text-yellow-600',
  danger: 'text-red-800 dark:text-red-500'
}

const ICON_COLORS: Record<ButtonColor, string> = {
  default: 'fill-gray-800 dark:fill-gray-300',
  primary: 'fill-blue-800 dark:fill-blue-500',
  secondary: 'fill-indigo-800 dark:fill-indigo-500',
  success: 'fill-green-800 dark:fill-green-500',
  warning: 'fill-yellow-800 dark:fill-yellow-500',
  danger: 'fill-red-800 dark:fill-red-500'
}

const HOVER_COLORS: Record<ButtonColor, string> = {
  default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10',
  primary: 'hover:bg-blue-500/30',
  secondary: 'hover:bg-indigo-500/40',
  success: 'hover:bg-green-500/50',
  warning: 'hover:bg-yellow-500/60',
  danger: 'hover:bg-red-500/30'
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ color }) => (
  <svg
    className={clsx('animate-spin h-5 w-5', ICON_COLORS[color])}
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    aria-hidden='true'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth={4}
    />
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    />
  </svg>
)

const Button: FC<ButtonProps> = ({
  variant = 'default',
  disabled = false,
  size = 'md',
  rounded = 'md',
  color = 'default',
  isLoading = false,
  onClick,
  children,
  className,
  ...props
}) => {
  const isDisabled = disabled || isLoading

  const buttonClasses = useMemo(
    () =>
      clsx(
        'group inline-flex items-center justify-center font-medium text-center',
        'transition-all duration-300',
        VARIANTS[variant],
        SIZES[size],
        ROUNDEDS[rounded],
        {
          [COLORS[color]]: !['bordered', 'light'].includes(variant),
          [SHADOW_COLORS[color]]: variant === 'complete',
          [TEXT_COLORS[color]]: variant !== 'complete',
          'text-black dark:text-white': variant === 'complete',
          'bg-transparent': ['bordered', 'light'].includes(variant),
          [HOVER_COLORS[color]]: !isDisabled,
          'opacity-50 cursor-not-allowed': isDisabled,
          'gap-2': isLoading
        },
        className
      ),
    [variant, size, rounded, color, isDisabled, isLoading, className]
  )

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClasses}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      aria-label={isLoading ? 'Cargando...' : undefined}
      {...props}
    >
      {isLoading && <LoadingSpinner color={color} />}
      {children}
    </button>
  )
}

export default memo(Button)
