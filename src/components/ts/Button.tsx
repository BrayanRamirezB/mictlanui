import { type FC } from 'react'

interface ButtonProps {
  text?: string
  variant?: 'default' | 'bordered' | 'light' | 'complete'
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  isLoading?: boolean
  icon?: boolean
  iconOnly?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

const Button: FC<ButtonProps> = ({
  text,
  variant = 'default',
  disabled = false,
  size = 'md',
  rounded = 'md',
  color = 'default',
  isLoading = false,
  icon = false,
  iconOnly = false,
  onClick,
  children
}) => {
  const variants = {
    default: 'border-0 shadow-md backdrop-blur-sm',
    bordered: 'border border-current shadow-md',
    light: '',
    complete: 'backdrop-blur-xl'
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

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/5',
    primary: 'bg-blue-500/20',
    secondary: 'bg-indigo-500/20',
    success: 'bg-green-500/20',
    warning: 'bg-yellow-500/30',
    danger: 'bg-red-500/20'
  }

  const shadowColors = {
    default:
      'shadow-lg shadow-zinc-700/30 shadow-current dark:shadow-neutral-100/20',
    primary: 'shadow-lg shadow-blue-500/20',
    secondary: 'shadow-lg shadow-indigo-500/20 shadow-current',
    success: 'shadow-lg shadow-green-500/30 shadow-current ',
    warning: 'shadow-lg shadow-yellow-500/20 shadow-current',
    danger: 'shadow-lg shadow-red-500/20 shadow-current'
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-800 dark:text-blue-600',
    secondary: 'text-indigo-800 dark:text-indigo-600',
    success: 'text-green-800 dark:text-green-600',
    warning: 'text-yellow-800 dark:text-yellow-600',
    danger: 'text-red-800 dark:text-red-500'
  }

  const iconColors = {
    default: 'fill-gray-800 dark:fill-gray-300',
    primary: 'fill-blue-800 dark:fill-blue-500',
    secondary: 'fill-indigo-800 dark:fill-indigo-500',
    success: 'fill-green-800 dark:fill-green-500',
    warning: 'fill-yellow-800 dark:fill-yellow-500',
    danger: 'fill-red-800 dark:fill-red-500'
  }

  const hoverColors = {
    default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10 ',
    primary: 'hover:bg-blue-500/30',
    secondary: 'hover:bg-indigo-500/40',
    success: 'hover:bg-green-500/50',
    warning: 'hover:bg-yellow-500/60',
    danger: 'hover:bg-red-500/30'
  }

  const buttonClasses = `
      inline-flex items-center justify-center font-medium text-center 
      transition duration-300 
      ${variants[variant]} 
      ${sizes[size]} 
      ${roundeds[rounded]} 
      ${
        variant === 'bordered' || variant === 'light'
          ? `bg-transparent`
          : colors[color]
      }
      ${
        variant === 'complete'
          ? `text-black dark:text-white ${shadowColors[color]}`
          : textColors[color]
      }
      ${hoverColors[color]}
      ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
    `

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses.trim()}
    >
      {isLoading && (
        <svg
          className={`animate-spin mr-2 h-5 w-5 ${iconColors[color]}`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      )}

      {icon && !iconOnly && (
        <span className={`mr-2 ${iconColors[color]}`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            className={`${iconColors[color]}`}
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M15 2a1 1 0 0 1 .117 1.993l-.117 .007c-.693 0 -1.33 .694 -1.691 1.552a5.1 5.1 0 0 1 1.982 -.544l.265 -.008c2.982 0 5.444 3.053 5.444 6.32c0 3.547 -.606 5.862 -2.423 8.578c-1.692 2.251 -4.092 2.753 -6.41 1.234a.31 .31 0 0 0 -.317 -.01c-2.335 1.528 -4.735 1.027 -6.46 -1.27c-1.783 -2.668 -2.39 -4.984 -2.39 -8.532l.004 -.222c.108 -3.181 2.526 -6.098 5.44 -6.098c.94 0 1.852 .291 2.688 .792c.419 -1.95 1.818 -3.792 3.868 -3.792m-7.034 6.154c-1.36 .858 -1.966 2.06 -1.966 3.846a1 1 0 0 0 2 0c0 -1.125 .28 -1.678 1.034 -2.154a1 1 0 1 0 -1.068 -1.692' />
          </svg>
        </span>
      )}

      {!iconOnly && text}

      {iconOnly && (
        <span className={`${iconColors[color]}`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            className={`${iconColors[color]}`}
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M15 2a1 1 0 0 1 .117 1.993l-.117 .007c-.693 0 -1.33 .694 -1.691 1.552a5.1 5.1 0 0 1 1.982 -.544l.265 -.008c2.982 0 5.444 3.053 5.444 6.32c0 3.547 -.606 5.862 -2.423 8.578c-1.692 2.251 -4.092 2.753 -6.41 1.234a.31 .31 0 0 0 -.317 -.01c-2.335 1.528 -4.735 1.027 -6.46 -1.27c-1.783 -2.668 -2.39 -4.984 -2.39 -8.532l.004 -.222c.108 -3.181 2.526 -6.098 5.44 -6.098c.94 0 1.852 .291 2.688 .792c.419 -1.95 1.818 -3.792 3.868 -3.792m-7.034 6.154c-1.36 .858 -1.966 2.06 -1.966 3.846a1 1 0 0 0 2 0c0 -1.125 .28 -1.678 1.034 -2.154a1 1 0 1 0 -1.068 -1.692' />
          </svg>
        </span>
      )}
      {children}
    </button>
  )
}

export default Button
