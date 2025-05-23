import { useState } from 'react'
import clsx from 'clsx'

const STYLES = {
  variants: {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: ''
  },
  colors: {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
    primary: 'bg-blue-500/20',
    secondary: 'bg-indigo-500/20',
    success: 'bg-green-500/30',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
    danger: 'bg-red-500/20'
  },
  checkColors: {
    default: 'bg-neutral-100/50 dark:bg-zinc-700/50',
    primary: 'bg-blue-500/30',
    secondary: 'bg-indigo-500/30',
    success: 'bg-green-500/40',
    warning: 'bg-yellow-500/50 dark:bg-yellow-500/20',
    danger: 'bg-red-500/30'
  },
  textColors: {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-800 dark:text-blue-500',
    secondary: 'text-indigo-800 dark:text-indigo-500',
    success: 'text-green-800 dark:text-green-500',
    warning: 'text-yellow-800 dark:text-yellow-500',
    danger: 'text-red-800 dark:text-red-500'
  },
  borderColors: {
    default: 'border-gray-800 dark:border-gray-300',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
  },
  hoverColors: {
    default: 'hover:bg-neutral-100 dark:hover:bg-zinc-700/20',
    primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
    secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
    success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
    warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
    danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
  },
  sizes: {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
    xl: 'px-6 py-3.5 text-lg'
  },
  roundeds: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }
}

const Checkbox = ({
  id,
  label,
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'lg',
  checked,
  disabled = false,
  onChange
}) => {
  const [internalChecked, setInternalChecked] = useState(checked)

  const handleChange = () => {
    if (disabled) return
    const newChecked = !internalChecked
    setInternalChecked(newChecked)
    onChange?.()
  }

  const containerClasses = clsx(
    'flex items-center transition-colors',
    STYLES.roundeds[rounded],
    STYLES.variants[variant],
    variant === 'default' && STYLES.colors[color],
    variant !== 'light' && STYLES.sizes[size],
    variant === 'bordered' && STYLES.borderColors[color],
    disabled ? 'opacity-50' : ''
  )

  const checkboxClasses = clsx(
    'relative w-5 h-5 flex items-center justify-center transition-all',
    STYLES.checkColors[color],
    STYLES.roundeds[rounded],
    STYLES.textColors[color],
    !disabled && !internalChecked && STYLES.hoverColors[color],
    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
  )

  return (
    <div className={containerClasses}>
      <div
        id={id}
        role='checkbox'
        aria-checked={internalChecked}
        aria-labelledby={`${id}-label`}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={checkboxClasses}
        onClick={handleChange}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            handleChange()
          }
        }}
      >
        {internalChecked && (
          <svg
            aria-hidden='true'
            className='w-full h-full animate-fade-in'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5 13l4 4L19 7'
            />
          </svg>
        )}
      </div>
      <label
        id={`${id}-label`}
        htmlFor={id}
        onClick={handleChange}
        className={clsx(
          'ms-2 select-none',
          !disabled && 'cursor-pointer',
          STYLES.textColors[color],
          disabled && 'cursor-not-allowed'
        )}
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox
