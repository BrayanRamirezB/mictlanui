import { Children, cloneElement } from 'react'
import clsx from 'clsx'

const VARIANTS = {
  default: 'border-0 backdrop-blur-sm shadow-md',
  bordered: 'border shadow-md',
  light: ''
}

const COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10',
  primary: 'bg-blue-500/20 dark:bg-blue-600/30',
  secondary: 'bg-indigo-500/20 dark:bg-indigo-600/30',
  success: 'bg-green-500/20 dark:bg-green-600/30',
  warning: 'bg-yellow-500/20 dark:bg-yellow-600/30',
  danger: 'bg-red-500/20 dark:bg-red-600/30'
}

const BORDER_COLORS = {
  default: 'border-zinc-700/30 dark:border-neutral-100/20',
  primary: 'border-blue-500 dark:border-blue-400',
  secondary: 'border-indigo-500 dark:border-indigo-400',
  success: 'border-green-500 dark:border-green-400',
  warning: 'border-yellow-500 dark:border-yellow-400',
  danger: 'border-red-500 dark:border-red-400'
}

const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-600 dark:text-blue-400',
  secondary: 'text-indigo-600 dark:text-indigo-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  danger: 'text-red-600 dark:text-red-400'
}

const ROUNDED = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-xl',
  xl: 'rounded-3xl'
}

const RadioGroup = ({
  children,
  orientation = 'vertical',
  label,
  description,
  errorMessage,
  isInvalid = false,
  isDisabled = false,
  selectedValue,
  onChange,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  id,
  className = '',
  ...props
}) => {
  const groupClasses = clsx(
    'flex flex-col gap-3 px-4 py-3',
    VARIANTS[variant],
    {
      [COLORS[color]]: variant === 'default',
      [BORDER_COLORS[color]]: variant === 'bordered'
    },
    ROUNDED[rounded],
    className
  )

  const ariaProps = {
    'aria-labelledby': label ? `${id}-label` : undefined,
    'aria-describedby':
      [
        description ? `${id}-description` : undefined,
        isInvalid ? `${id}-error` : undefined
      ]
        .filter(Boolean)
        .join(' ') || undefined,
    'aria-invalid': isInvalid,
    'aria-disabled': isDisabled
  }

  return (
    <div
      {...props}
      {...ariaProps}
      role='radiogroup'
      className={groupClasses}
      data-orientation={orientation}
      data-testid='radio-group'
    >
      {label && (
        <span
          id={`${id}-label`}
          className='text-sm font-medium text-gray-600 dark:text-gray-400'
        >
          {label}
        </span>
      )}

      <div
        className={clsx(
          'flex',
          orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2',
          TEXT_COLORS[color]
        )}
      >
        {Children.map(children, (child) =>
          cloneElement(child, {
            isSelected: child.props.value === selectedValue,
            onChange: onChange,
            color: color,
            isDisabled: isDisabled || child.props.isDisabled,
            name: id
          })
        )}
      </div>

      {description && (
        <p
          id={`${id}-description`}
          className='text-sm text-gray-500 dark:text-gray-400'
        >
          {description}
        </p>
      )}

      {isInvalid && errorMessage && (
        <p
          id={`${id}-error`}
          className='text-sm text-red-600 dark:text-red-400'
          role='alert'
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default RadioGroup
