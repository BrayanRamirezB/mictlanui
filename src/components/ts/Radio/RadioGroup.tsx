import {
  type ReactNode,
  Children,
  cloneElement,
  type ReactElement,
  isValidElement
} from 'react'
import { type RadioProps } from '@/components/ts/Radio/Radio'

interface RadioGroupProps {
  children: ReactNode
  orientation?: 'vertical' | 'horizontal'
  label?: string
  description?: string
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  selectedValue?: string | number
  onChange?: (value: string | number) => void
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  id?: string
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
  id
}: RadioGroupProps) => {
  const variants = {
    default: 'border-0 backdrop-blur-sm shadow-md',
    bordered: 'border shadow-md',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/20 ',
    warning: 'bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const borderColors = {
    default: 'border-zinc-700/30 dark:border-neutral-100/20',
    primary: 'border-blue-500',
    secondary: 'border-indigo-500 ',
    success: 'border-green-500 ',
    warning: 'border-yellow-500',
    danger: 'border-red-500 '
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-600',
    secondary: 'text-indigo-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-xl',
    xl: 'rounded-3xl'
  }

  return (
    <div
      className={`flex flex-col gap-3 px-4 py-3 ${variants[variant]} ${
        variant === 'default' && colors[color]
      } ${roundeds[rounded]} ${variant === 'bordered' && borderColors[color]}`}
      data-orientation={orientation}
      role='radiogroup'
      aria-labelledby={label ? `${id}-label` : undefined}
      aria-describedby={description ? `${id}-description` : undefined}
      aria-invalid={isInvalid || undefined}
      aria-disabled={isDisabled || undefined}
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
        className={`flex ${
          orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2'
        } ${textColors[color]}`}
      >
        {Children.toArray(children).map((child) => {
          if (isValidElement(child)) {
            const radioChild = child as ReactElement<RadioProps>
            return cloneElement(radioChild, {
              isSelected: radioChild.props.value === selectedValue,
              onChange: onChange,
              color: color,
              isDisabled: isDisabled || radioChild.props.isDisabled
            })
          }
          return child
        })}
      </div>

      {description && (
        <p id={`${id}-description`} className='text-sm text-gray-500'>
          {description}
        </p>
      )}

      {isInvalid && errorMessage && (
        <p className='text-sm text-red-600'>{errorMessage}</p>
      )}
    </div>
  )
}

export default RadioGroup
