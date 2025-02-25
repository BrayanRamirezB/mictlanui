const Button = ({
  variant = 'default',
  disabled = false,
  size = 'md',
  rounded = 'md',
  color = 'default',
  isLoading = false,
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
      group inline-flex items-center justify-center font-medium text-center 
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
          className={`animate-spin h-5 w-5 ${iconColors[color]}`}
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

      {children}
    </button>
  )
}

export default Button
