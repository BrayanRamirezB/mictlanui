import { type FC, type ReactNode } from 'react'

interface LinkProps {
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  isDisabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  underline?: 'none' | 'hover' | 'always' | 'active'
  isExternal?: boolean
  defaultIcon?: boolean
  children: ReactNode
  href?: string
}

const Link: FC<LinkProps> = ({
  variant = 'light',
  color = 'default',
  rounded = 'md',
  isDisabled = false,
  size = 'md',
  underline = 'hover',
  isExternal = false,
  defaultIcon = false,
  children,
  href = '#'
}) => {
  const variants = {
    default: 'border-0 shadow-md backdrop-blur-sm px-3 py-1',
    bordered: 'border shadow-lg px-3 py-1',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-800 dark:text-blue-600',
    secondary: 'text-indigo-800 dark:text-indigo-600',
    success: 'text-green-800 dark:text-green-600',
    warning: 'text-yellow-800 dark:text-yellow-600',
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

  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const iconSizeStyles = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const underlineStyles = {
    none: 'no-underline',
    hover: 'hover:underline',
    always: 'underline',
    active: 'active:underline'
  }

  const disabledStyles = isDisabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : ''

  const className = `flex items-center justify-center text-center gap-2 transition-colors duration-200 ${
    variants[variant]
  } ${variant === 'default' && colors[color]} ${sizeStyles[size]} ${
    textColors[color]
  } ${variant === 'bordered' && borderColors[color]} ${
    variant !== 'light' && roundeds[rounded]
  } ${underlineStyles[underline]} ${disabledStyles}`

  return (
    <a
      className={className}
      target={`${isExternal ? '_blank' : ''}`}
      rel={`${isExternal ? 'noopener noreferrer' : ''}`}
      href={href}
    >
      {children}
      {defaultIcon && (
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
          className={iconSizeStyles[size]}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M9 15l6 -6' />
          <path d='M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464' />
          <path d='M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463' />
        </svg>
      )}
    </a>
  )
}

export default Link
