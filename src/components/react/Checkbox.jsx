import { useState } from 'react'

const Checkbox = ({
  id,
  label,
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'lg',
  checked = false,
  disabled = false
}) => {
  const [isChecked, setIsChecked] = useState(checked)

  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const checkColors = {
    default: 'bg-neutral-100/50 dark:bg-zinc-700/50',
    primary: 'bg-blue-500/30 ',
    secondary: 'bg-indigo-500/30 ',
    success: 'bg-green-500/40 ',
    warning: 'bg-yellow-500/50 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/30 '
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
    default: 'hover:bg-neutral-100 dark:hover:bg-zinc-700/20 ',
    primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
    secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
    success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
    warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
    danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
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
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const handleCheckboxChange = () => {
    !disabled && setIsChecked(!isChecked)
  }

  return (
    <div
      className={`flex items-center ${roundeds[rounded]} ${variants[variant]} ${
        variant === 'default' && colors[color]
      } ${variant !== 'light' && sizes[size]}
      ${variant === 'bordered' && borderColors[color]}`}
    >
      <div
        id={id}
        className={`relative w-5 h-5 flex items-center justify-center transition duration-300 ease-in-out ${
          checkColors[color]
        } ${roundeds[rounded]} ${textColors[color]} cursor-pointer ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : !isChecked && hoverColors[color]
        }`}
        role='checkbox'
        aria-checked={isChecked}
        aria-labelledby={`${id}-label`}
        tabIndex={disabled ? -1 : 0}
        onClick={handleCheckboxChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleCheckboxChange()
          }
        }}
      >
        {isChecked && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
            className='animate-fade-in'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M5 12l5 5l10 -10' />
          </svg>
        )}
      </div>
      <label
        id={`${id}-label`}
        htmlFor={id}
        onClick={handleCheckboxChange}
        className={`ms-2 cursor-pointer ${textColors[color]}`}
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox
