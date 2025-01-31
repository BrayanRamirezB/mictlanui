import { useDropdown } from './Dropdown'

const DropdownMenu = ({
  children,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  ...props
}) => {
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

  const borderColors = {
    default: 'border-gray-800 dark:border-gray-300',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg'
  }

  const { isOpen } = useDropdown()

  return (
    <div
      className={`origin-top-right flex flex-col right-0 mt-2 w-full ${
        isOpen ? 'block' : 'hidden'
      }
        ${variants[variant]} 
        ${variant === 'default' && colors[color]}
        ${variant === 'bordered' && borderColors[color]}
        ${roundeds[rounded]}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default DropdownMenu
