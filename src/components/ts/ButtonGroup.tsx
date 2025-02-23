import { type FC } from 'react'

interface ButtonGroupButton {
  label: string
  icon?: boolean
  onClick?: () => void
}

interface ButtonGroupProps {
  buttons: ButtonGroupButton[]
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  disabled?: boolean
}

const ButtonGroup: FC<ButtonGroupProps> = ({
  buttons,
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md',
  disabled = false
}) => {
  const variants = {
    default: 'border-0 shadow-md backdrop-blur-sm',
    bordered: 'border border-current',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 ',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/20 ',
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
    primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
    secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/20',
    success: 'hover:bg-green-500/60 dark:hover:bg-green-500/30',
    warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/30',
    danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
  }

  const shadowColors = {
    default:
      'shadow-md shadow-zinc-700/30 shadow-current dark:shadow-neutral-100/20',
    primary: 'shadow-md shadow-blue-500/20 ',
    secondary: 'shadow-md shadow-indigo-500/20 ',
    success: 'shadow-md shadow-green-500/30  ',
    warning: 'shadow-md shadow-yellow-500/30 ',
    danger: 'shadow-md shadow-red-500/20 '
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

  const roundedS = {
    none: 'rounded-s-none',
    sm: 'rounded-s-sm',
    md: 'rounded-s-md',
    lg: 'rounded-s-lg',
    full: 'rounded-s-full'
  }

  const roundedE = {
    none: 'rounded-e-none',
    sm: 'rounded-e-sm',
    md: 'rounded-e-md',
    lg: 'rounded-e-lg',
    full: 'rounded-e-full'
  }

  const groupClass = `
    ${variants[variant]} 
    ${sizes[size]}
    ${
      variant === 'bordered' || variant === 'light'
        ? `bg-transparent`
        : colors[color]
    }
      ${variant === 'default' && shadowColors[color]}
      ${textColors[color]}
      ${hoverColors[color]}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `

  return (
    <div
      className={`inline-flex overflow-hidden ${
        variant === 'default' && shadowColors[color]
      } ${roundeds[rounded]}`}
      role='group'
    >
      {buttons.map((button, index) => {
        return (
          <button
            key={index}
            type='button'
            className={`inline-flex gap-x-1 items-center font-medium transition duration-300 ${groupClass}
                ${
                  index === 0
                    ? roundedS[rounded]
                    : index === buttons.length - 1
                    ? roundedE[rounded]
                    : 'border-l-0'
                }
                `}
            onClick={button.onClick}
          >
            {button.icon && (
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
            )}
            {button.label}
          </button>
        )
      })}
    </div>
  )
}

export default ButtonGroup
