import { memo } from 'react'

const SpinnerConfig = {
  variants: {
    default: 'backdrop-blur-sm shadow-lg',
    light: ''
  },
  sizes: {
    xs: 'size-4',
    sm: 'size-6',
    md: 'size-8',
    lg: 'size-10',
    xl: 'size-12'
  },
  colors: {
    default: {
      firstCircle: 'border-zinc-500',
      secondCircle: 'border-zinc-400',
      text: 'text-gray-800 dark:text-gray-300'
    },
    primary: {
      firstCircle: 'border-blue-500',
      secondCircle: 'border-blue-300',
      text: 'text-blue-800 dark:text-blue-600'
    },
    secondary: {
      firstCircle: 'border-indigo-500',
      secondCircle: 'border-indigo-300',
      text: 'text-indigo-800 dark:text-indigo-600'
    },
    success: {
      firstCircle: 'border-green-500',
      secondCircle: 'border-green-300',
      text: 'text-green-800 dark:text-green-600'
    },
    warning: {
      firstCircle: 'border-yellow-500',
      secondCircle: 'border-yellow-300',
      text: 'text-yellow-800 dark:text-yellow-600'
    },
    danger: {
      firstCircle: 'border-red-500',
      secondCircle: 'border-red-300',
      text: 'text-red-800 dark:text-red-500'
    }
  }
}

const Spinner = ({
  label,
  variant = 'default',
  size = 'md',
  color = 'default',
  textColor = color
}) => {
  const { variants, sizes, colors } = SpinnerConfig

  return (
    <div
      className='flex flex-col items-center justify-center space-y-2'
      role='status'
      aria-live='polite'
      aria-label={label || 'Loading'}
    >
      <div
        className={`relative rounded-full ${variants[variant]} ${sizes[size]}`}
      >
        <div
          className={`absolute w-full h-full rounded-full border-4 border-t-transparent border-r-transparent border-l-transparent ${colors[color].firstCircle} animate-spin`}
        />
        <div
          className={`absolute w-full h-full rounded-full border-4 border-t-transparent border-b-transparent border-l-transparent ${colors[color].secondCircle} animate-spin`}
        />
      </div>
      {label && (
        <span className={`text-sm ${colors[textColor].text}`}>{label}</span>
      )}
    </div>
  )
}

export default memo(Spinner)
