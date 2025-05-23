import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type FC,
  type ChangeEvent
} from 'react'
import clsx from 'clsx'

export type DateInputVariant = 'default' | 'bordered' | 'light'
export type DateInputColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type DateInputRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type DateInputSize = 'sm' | 'md' | 'lg'

export interface DateInputProps {
  label?: string
  value?: string
  variant?: DateInputVariant
  color?: DateInputColor
  rounded?: DateInputRounded
  size?: DateInputSize
  icon?: boolean
  disabled?: boolean
  onChange?: (newValue: string) => void
}

const VARIANTS: Record<DateInputVariant, string> = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const COLORS: Record<DateInputColor, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS: Record<DateInputColor, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const BORDER_COLORS: Record<DateInputColor, string> = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const HOVER_COLORS: Record<DateInputColor, string> = {
  default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/20',
  primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
  secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
  success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
  warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
  danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
}

const SIZES: Record<DateInputSize, string> = {
  sm: 'text-xs p-2',
  md: 'text-sm p-3',
  lg: 'text-base p-4'
}

const ROUNDEDS: Record<DateInputRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const DateInput: FC<DateInputProps> = ({
  label = '',
  value = '',
  variant = 'default',
  color = 'default',
  rounded = 'md',
  size = 'md',
  icon = true,
  disabled = false,
  onChange
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(value)
  const datePickerRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSelectedDate(value)
  }, [value])

  const handleDateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedDate(e.target.value)
      onChange?.(e.target.value)
    },
    [onChange]
  )

  const containerClasses = clsx(
    'flex flex-col gap-2 transition-all duration-300 ease-in-out',
    TEXT_COLORS[color],
    SIZES[size],
    VARIANTS[variant],
    ROUNDEDS[rounded],
    {
      [COLORS[color]]: variant === 'default',
      [BORDER_COLORS[color]]: variant === 'bordered',
      [HOVER_COLORS[color]]: !disabled && variant !== 'light',
      'opacity-50 cursor-not-allowed': disabled,
      'bg-transparent': variant === 'light'
    }
  )

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor='date-input' className='font-medium select-none'>
          {label}
        </label>
      )}

      <div
        className='w-full flex items-center gap-2 cursor-pointer'
        onClick={() => !disabled && datePickerRef.current?.showPicker()}
      >
        <input
          id='date-input'
          type='date'
          ref={datePickerRef}
          value={selectedDate}
          onChange={handleDateChange}
          disabled={disabled}
          aria-label={label || 'Select date'}
          aria-disabled={disabled}
          className={clsx(
            'w-full bg-transparent focus:outline-none',
            'text-inherit placeholder:text-current',
            '[&::-webkit-calendar-picker-indicator]:opacity-0',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        />

        {icon && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={clsx(
              'size-5 shrink-0',
              disabled && 'cursor-not-allowed'
            )}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
            role='img'
            aria-label='Date picker icon'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8 7V3m8 4V3m-9 9h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
        )}
      </div>
    </div>
  )
}

export default DateInput
