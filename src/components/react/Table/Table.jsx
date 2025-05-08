const Table = ({
  children,
  variant = 'default',
  color = 'default',
  rounded = 'md'
}) => {
  const variants = {
    default: 'border-0 backdrop-blur-sm shadow-lg',
    bordered: 'border shadow-md',
    light: ''
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 ',
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

  return (
    <div
      className={`w-full overflow-auto ${variants[variant]} ${
        roundeds[rounded]
      } ${textColors[color]} ${variant === 'bordered' && borderColors[color]}`}
      role='region'
      aria-label='Data Table'
    >
      <table
        className={`w-full ${variant === 'default' && colors[color]}`}
        role='table'
      >
        {children}
      </table>
    </div>
  )
}

export default Table
