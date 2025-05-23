import { forwardRef, memo } from 'react'
import clsx from 'clsx'

const VARIANT_STYLES = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const BG_COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const SELECTED_BG_COLORS = {
  default: 'bg-neutral-100/50 dark:bg-zinc-700/60',
  primary: 'bg-blue-500/40 dark:bg-blue-500/40',
  secondary: 'bg-indigo-500/40 dark:bg-indigo-500/40',
  success: 'bg-green-500/40 dark:bg-green-500/40',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/40',
  danger: 'bg-red-500/40 dark:bg-red-500/40'
}

const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
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

const HOVER_BG_COLORS = {
  default: 'hover:bg-neutral-100/30 dark:hover:bg-zinc-700/50',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/10',
  success: 'hover:bg-green-500/30 dark:hover:bg-green-500/10',
  warning: 'hover:bg-yellow-500/30 dark:hover:bg-yellow-500/10',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
}

const ROUNDINGS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg'
}

const DropdownItem = forwardRef(
  (
    {
      children,
      title,
      description,
      selected = false,
      onClick,
      variant = 'light',
      color = 'default',
      rounded = 'md',
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      'flex w-full px-7 py-2 text-sm transition',
      ROUNDINGS[rounded],
      VARIANT_STYLES[variant],
      TEXT_COLORS[color],
      !disabled && HOVER_BG_COLORS[color],
      variant === 'default' && !selected && BG_COLORS[color],
      variant === 'bordered' && BORDER_COLORS[color],
      selected && SELECTED_BG_COLORS[color],
      disabled && 'opacity-50 cursor-not-allowed',
      className
    )

    return (
      <button
        ref={ref}
        type='button'
        className={classes}
        onClick={onClick}
        disabled={disabled}
        aria-pressed={selected}
        aria-disabled={disabled}
        aria-label={title}
        {...props}
      >
        <div className='flex flex-col text-left flex-1'>
          <span className='text-sm font-medium'>{title}</span>
          {description && <p className='text-sm'>{description}</p>}
        </div>
        {children}
      </button>
    )
  }
)

export default memo(DropdownItem)
