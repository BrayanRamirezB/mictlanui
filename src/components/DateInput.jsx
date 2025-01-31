import { useState, useRef } from 'react'

const DateInput = ({
  label = '',
  value = '',
  variant = 'default',
  color = 'default',
  rounded = 'md',
  size = 'md',
  icon = true,
  disabled = false
}) => {
  const [selectedDate, setSelectedDate] = useState(value)
  const datePickerRef = useRef(null)

  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
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

  const hoverColors = {
    default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/50 ',
    primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
    secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
    success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
    warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
    danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
  }

  const sizes = {
    sm: 'text-xs p-2',
    md: 'text-sm p-3',
    lg: 'text-base p-4'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const handleDateChange = (e) => {
    const newDate = e.target.value
    setSelectedDate(newDate)
  }

  return (
    <div
      className={`flex flex-col gap-2 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${sizes[size]} ${variants[variant]} ${
        variant === 'default' && colors[color]
      }
      ${variant === 'bordered' && borderColors[color]}
      ${roundeds[rounded]}
      transition duration-300 ease-in 
      ${hoverColors[color]}
      `}
    >
      {label && <label className={`${textColors[color]}`}>{label}</label>}
      <div
        className={`w-full flex items-center cursor-pointer ${textColors[color]} `}
        onClick={() => !disabled && datePickerRef.current?.showPicker()}
      >
        <input
          type='date'
          ref={datePickerRef}
          value={selectedDate}
          onChange={handleDateChange}
          disabled={disabled}
          className={`w-full bg-transparent focus:outline-none custom-date-input cursor-pointer`}
        />
        {icon && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='size-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8 7V3m8 4V3m-9 9h10m-4 8h4a2 2 0 002-2v-7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2h4z'
            />
          </svg>
        )}
      </div>
    </div>
  )
}

export default DateInput
