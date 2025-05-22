import { useMemo, memo } from 'react'
import clsx from 'clsx'

const VARIANTS = {
  default: 'border-0 shadow-md backdrop-blur-sm',
  bordered: 'border border-current',
  light: ''
}

const COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const ICON_COLORS = {
  default: 'fill-gray-800 dark:fill-gray-300',
  primary: 'fill-blue-800 dark:fill-blue-500',
  secondary: 'fill-indigo-800 dark:fill-indigo-500',
  success: 'fill-green-800 dark:fill-green-500',
  warning: 'fill-yellow-800 dark:fill-yellow-500',
  danger: 'fill-red-800 dark:fill-red-500'
}

const HOVER_COLORS = {
  default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/30',
  success: 'hover:bg-green-500/60 dark:hover:bg-green-500/40',
  warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/30',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
}

const SHADOW_COLORS = {
  default: 'shadow-md shadow-zinc-700/30 dark:shadow-neutral-100/20',
  primary: 'shadow-md shadow-blue-500/20',
  secondary: 'shadow-md shadow-indigo-500/20',
  success: 'shadow-md shadow-green-500/30',
  warning: 'shadow-md shadow-yellow-500/30',
  danger: 'shadow-md shadow-red-500/20'
}

const SIZES = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-lg'
}

const ROUNDED = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const ROUNDED_START = {
  none: 'rounded-s-none',
  sm: 'rounded-s-sm',
  md: 'rounded-s-md',
  lg: 'rounded-s-lg',
  full: 'rounded-s-full'
}

const ROUNDED_END = {
  none: 'rounded-e-none',
  sm: 'rounded-e-sm',
  md: 'rounded-e-md',
  lg: 'rounded-e-lg',
  full: 'rounded-e-full'
}

const ButtonIcon = ({ color, icon: Icon }) => {
  if (!Icon || typeof Icon !== 'function') return null

  return (
    <Icon className={clsx('w-5 h-5', ICON_COLORS[color])} aria-hidden='true' />
  )
}

const ButtonGroup = ({
  buttons,
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md',
  disabled = false,
  ...props
}) => {
  const groupClasses = useMemo(
    () =>
      clsx(
        'inline-flex overflow-hidden',
        SHADOW_COLORS[color],
        ROUNDED[rounded],
        props.className
      ),
    [color, rounded, props.className]
  )

  const buttonClasses = useMemo(
    () =>
      clsx(
        'inline-flex gap-x-1 items-center font-medium transition-all duration-300',
        VARIANTS[variant],
        SIZES[size],
        TEXT_COLORS[color],
        HOVER_COLORS[color],
        {
          [COLORS[color]]: !['bordered', 'light'].includes(variant),
          'bg-transparent': ['bordered', 'light'].includes(variant),
          'opacity-50 cursor-not-allowed': disabled
        }
      ),
    [variant, color, size, disabled]
  )

  return (
    <div className={groupClasses} role='group' aria-label='Button group'>
      {buttons.map((button, index) => (
        <button
          key={button.id || index}
          type='button'
          className={clsx(
            buttonClasses,
            index === 0 ? ROUNDED_START[rounded] : 'border-l-0',
            index === buttons.length - 1 && ROUNDED_END[rounded]
          )}
          onClick={button.onClick}
          aria-label={button.label}
          disabled={disabled || button.disabled}
          aria-disabled={disabled || button.disabled}
        >
          {button.icon && <ButtonIcon color={color} icon={button.icon} />}
          {button.label}
        </button>
      ))}
    </div>
  )
}

export default memo(ButtonGroup)
