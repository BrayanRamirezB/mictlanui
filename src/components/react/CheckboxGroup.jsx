import { useState, useEffect, useCallback, useId, memo } from 'react'
import clsx from 'clsx'
import Checkbox from '@/components/react/Checkbox'

const variants = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const colors = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const textColors = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const borderColors = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const sizes = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-lg'
}

const roundeds = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg'
}

const CheckboxGroup = ({
  title = '',
  checkboxes = [],
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md',
  orientation = 'horizontal',
  onChange
}) => {
  const [checkboxStates, setCheckboxStates] = useState(checkboxes)
  const groupId = useId()
  const titleId = `${groupId}-label`

  useEffect(() => {
    setCheckboxStates(checkboxes)
  }, [checkboxes])

  const handleCheckboxChange = useCallback(
    (id) => {
      setCheckboxStates((prevStates) => {
        const updatedStates = prevStates.map((checkbox) =>
          checkbox.id === id
            ? { ...checkbox, checked: !checkbox.checked }
            : checkbox
        )
        onChange?.(updatedStates)
        return updatedStates
      })
    },
    [onChange]
  )

  const containerClasses = clsx(
    'flex flex-col gap-2',
    variants[variant],
    sizes[size],
    textColors[color],
    {
      [colors[color]]: variant === 'default',
      [borderColors[color]]: variant === 'bordered',
      [roundeds[rounded]]: variant !== 'light'
    }
  )

  return (
    <div
      className={containerClasses}
      role='group'
      aria-labelledby={title ? titleId : undefined}
    >
      {title && (
        <h3 id={titleId} className='text-lg font-semibold'>
          {title}
        </h3>
      )}

      <div
        className={`flex gap-2 ${
          orientation === 'vertical' ? 'flex-col' : 'flex-row'
        }`}
      >
        {checkboxStates.map(({ id, label, checked, disabled }) => (
          <Checkbox
            key={id}
            id={id}
            label={label}
            checked={checked}
            disabled={disabled}
            variant='light'
            color={color}
            size={size}
            onChange={() => handleCheckboxChange(id)}
            aria-checked={checked}
            aria-disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(CheckboxGroup)
