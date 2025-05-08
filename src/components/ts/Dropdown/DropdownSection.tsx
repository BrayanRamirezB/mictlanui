import { type ReactNode } from 'react'

interface DropdownSectionProps {
  children: ReactNode
  heading?: string
  showDivider?: boolean
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  font?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg'
  [key: string]: any
}

const DropdownSection = ({
  children,
  heading,
  showDivider = false,
  variant = 'light',
  color = 'default',
  font = 'md',
  rounded = 'md',
  ...props
}: DropdownSectionProps) => {
  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/5 dark:shadow-zinc-700/10',
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

  const fonts = {
    sm: 'font-normal',
    md: 'font-medium',
    lg: 'font-semibold',
    xl: 'font-bold'
  }

  const dividerColors = {
    default: 'bg-zinc-700 dark:bg-neutral-100/70',
    primary: 'bg-blue-500',
    secondary: 'bg-indigo-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg'
  }

  return (
    <div
      className='flex flex-col'
      role='region'
      aria-label={heading || 'Dropdown Section'}
      {...props}
    >
      {heading && (
        <h3
          className={`px-4 ${variants[variant]} ${
            variant !== 'light' && roundeds[rounded]
          } ${textColors[color]} ${fonts[font]} ${
            variant === 'default' && colors[color]
          } ${variant === 'bordered' && borderColors[color]}`}
        >
          {heading}
        </h3>
      )}
      {children}
      {showDivider && (
        <div
          className={`my-2 h-px ${dividerColors[color]}`}
          role='separator'
        ></div>
      )}
    </div>
  )
}

export default DropdownSection
