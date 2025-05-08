import { type ReactNode } from 'react'
import { useDropdown } from '@/components/ts/Dropdown/Dropdown'

interface DropdownTriggerProps {
  children: ReactNode
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg'
  [key: string]: any
}

const DropdownTrigger = ({
  children,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  size = 'md',
  ...props
}: DropdownTriggerProps) => {
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

  const sizes = {
    sm: 'font-light text-xs px-2 py-1.5',
    md: 'font-medium text-sm px-4 py-2',
    lg: 'font-medium text-base px-8 py-2.5'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const { toggleDropdown, isOpen } = useDropdown()

  return (
    <button
      className={`inline-flex justify-center items-center
        ${variants[variant]} 
        ${sizes[size]} 
        ${textColors[color]} 
        ${variant === 'bordered' && borderColors[color]}
        ${variant === 'default' && colors[color]}
        ${roundeds[rounded]} 
        ${hoverColors[color]}
      `}
      aria-haspopup='menu'
      aria-expanded={isOpen}
      role='button'
      onClick={toggleDropdown}
      {...props}
    >
      {children}
    </button>
  )
}

export default DropdownTrigger
