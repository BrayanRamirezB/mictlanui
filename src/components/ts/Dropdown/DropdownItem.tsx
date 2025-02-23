import { type ReactNode, type MouseEvent } from 'react'

interface DropdownItemProps {
  children?: ReactNode
  title: string
  description?: string
  selected?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg'
  disabled?: boolean
  [key: string]: any
}

const DropdownItem = ({
  children,
  title,
  description,
  selected = false,
  onClick,
  variant = 'light',
  color = 'default',
  rounded = 'md',
  disabled = false,
  ...props
}: DropdownItemProps) => {
  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/20 ',
    warning: 'bg-yellow-500/20 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const selectedColors = {
    default: 'bg-neutral-100/50 dark:bg-zinc-700/60 ',
    primary: 'bg-blue-500/40 dark:bg-blue-500/40',
    secondary: 'bg-indigo-500/40 dark:bg-indigo-500/40',
    success: 'bg-green-500/40 dark:bg-green-500/40',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/40',
    danger: 'bg-red-500/40 dark:bg-red-500/40'
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
    default: 'hover:bg-neutral-100/30 dark:hover:bg-zinc-700/50 ',
    primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
    secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/10',
    success: 'hover:bg-green-500/30 dark:hover:bg-green-500/10',
    warning: 'hover:bg-yellow-500/30 dark:hover:bg-yellow-500/10',
    danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg'
  }

  return (
    <button
      className={`flex w-full px-7 py-2 text-sm ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${roundeds[rounded]} ${variants[variant]} ${textColors[color]} ${
        variant === 'default' && !selected && colors[color]
      } ${variant === 'bordered' && borderColors[color]} ${
        !disabled && hoverColors[color]
      } ${selected && selectedColors[color]}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <div className='flex flex-col text-left'>
        <span className='text-sm font-medium'>{title}</span>
        {description && <p className='text-sm'>{description}</p>}
      </div>
      {children}
    </button>
  )
}

export default DropdownItem
