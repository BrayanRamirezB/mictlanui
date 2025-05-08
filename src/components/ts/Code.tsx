import { type FC, useState } from 'react'

interface CodeProps {
  codeString: string
  language?: string
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

const Code: FC<CodeProps> = ({
  codeString,
  language = 'bash',
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md'
}) => {
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 ',
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
    default: 'hover:bg-neutral-100 dark:hover:bg-zinc-700/50 ',
    primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
    secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
    success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
    warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
    danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
  }

  const sizes = {
    sm: 'text-xs px-1 py-1',
    md: 'text-sm px-2 py-1.5',
    lg: 'text-base px-4 py-2',
    xl: 'text-base px-6 py-2.5'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  return (
    <div
      className={`inline-flex justify-around items-center gap-x-4 overflow-auto
        ${variants[variant]}
        ${sizes[size]}
        ${roundeds[rounded]}
        ${variant === 'bordered' && borderColors[color]}
        ${variant === 'default' && colors[color]}
        ${textColors[color]}
        `}
      role='region'
      aria-label='Code block with copy button'
    >
      <pre className='' aria-live='polite'>
        <code className={`language-${language}`}>{codeString}</code>
      </pre>

      <button
        onClick={handleCopy}
        className={`flex text-white px-1.5 py-1 rounded-lg transition duration-300 ease-out ${hoverColors[color]}`}
        aria-label={
          copied ? 'Code copied to clipboard' : 'Copy code to clipboard'
        }
      >
        {copied ? (
          <span className='inline-flex items-center'>
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
              className={`size-4 ${textColors[color]}`}
              role='img'
              aria-label='Copied icon'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path stroke='none' d='M0 0h24v24H0z' />
              <path d='M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' />
              <path d='M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1' />
              <path d='M11 14l2 2l4 -4' />
            </svg>
          </span>
        ) : (
          <span className='inline-flex items-center'>
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
              className={`size-4 ${textColors[color]}`}
              role='img'
              aria-label='Copy icon'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' />
              <path d='M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1' />
            </svg>
          </span>
        )}
      </button>
    </div>
  )
}

export default Code
