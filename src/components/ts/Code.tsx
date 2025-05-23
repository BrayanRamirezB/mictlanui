import { useState, useCallback, memo, type FC } from 'react'
import clsx from 'clsx'

export type CodeVariant = 'default' | 'bordered' | 'light'
export type CodeColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type CodeSize = 'sm' | 'md' | 'lg' | 'xl'
export type CodeRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'

export interface CodeProps {
  codeString: string
  language?: string
  variant?: CodeVariant
  color?: CodeColor
  size?: CodeSize
  rounded?: CodeRounded
}

interface IconProps {
  colorClass: string
}

const VARIANTS: Record<CodeVariant, string> = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const COLORS: Record<CodeColor, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS: Record<CodeColor, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const HOVER_COLORS: Record<CodeColor, string> = {
  default: 'hover:bg-neutral-100 dark:hover:bg-zinc-700/50',
  primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
  secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
  success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
  warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
  danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
}

const BORDER_COLORS: Record<CodeColor, string> = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const SIZES: Record<CodeSize, string> = {
  sm: 'text-xs px-1 py-1',
  md: 'text-sm px-2 py-1.5',
  lg: 'text-base px-4 py-2',
  xl: 'text-base px-6 py-2.5'
}

const ROUNDED: Record<CodeRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const CopyIcon: FC<IconProps> = memo(({ colorClass }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={clsx('size-4', colorClass)}
    role='img'
    aria-hidden='true'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' />
    <path d='M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1' />
  </svg>
))

const CheckIcon: FC<IconProps> = memo(({ colorClass }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={clsx('size-4', colorClass)}
    role='img'
    aria-hidden='true'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' />
    <path d='M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1' />
    <path d='M11 14l2 2l4 -4' />
  </svg>
))

const Code: FC<CodeProps> = ({
  codeString,
  language = 'bash',
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md'
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }, [codeString])

  const containerClasses = clsx(
    'inline-flex justify-between items-center gap-x-4 overflow-x-auto',
    VARIANTS[variant],
    SIZES[size],
    ROUNDED[rounded],
    variant === 'bordered' && BORDER_COLORS[color],
    variant === 'default' && COLORS[color],
    TEXT_COLORS[color],
    'font-mono'
  )

  const buttonClasses = clsx(
    'flex text-white px-1.5 py-1 rounded-lg transition-opacity duration-200',
    'hover:animate-squeeze duration-300 ease-out',
    HOVER_COLORS[color]
  )

  return (
    <div className={containerClasses} role='region' aria-label='Code block'>
      <pre className='flex-1' aria-live='polite'>
        <code className={`language-${language}`}>{codeString}</code>
      </pre>

      <button
        onClick={handleCopy}
        className={buttonClasses}
        aria-label={copied ? 'Copied!' : 'Copy code'}
        disabled={copied}
      >
        {copied ? (
          <CheckIcon colorClass={TEXT_COLORS[color]} />
        ) : (
          <CopyIcon colorClass={TEXT_COLORS[color]} />
        )}
      </button>
    </div>
  )
}

export default memo(Code)
