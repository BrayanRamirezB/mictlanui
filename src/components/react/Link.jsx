import { useMemo, memo } from 'react'
import clsx from 'clsx'

const VARIANTS = {
  default: 'border-0 shadow-md backdrop-blur-sm px-3 py-1',
  bordered: 'border shadow-lg px-3 py-1',
  light: ''
}

const COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-600',
  secondary: 'text-indigo-800 dark:text-indigo-600',
  success: 'text-green-800 dark:text-green-600',
  warning: 'text-yellow-800 dark:text-yellow-600',
  danger: 'text-red-800 dark:text-red-500'
}

const BORDER_COLORS = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const SIZE_STYLES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

const ICON_SIZE_STYLES = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6'
}

const ROUNDEDS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const UNDERLINE_STYLES = {
  none: 'no-underline',
  hover: 'hover:underline',
  always: 'underline',
  active: 'active:underline'
}

const DefaultIcon = ({ size }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={ICON_SIZE_STYLES[size || 'md']}
    aria-hidden='true'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M9 15l6 -6' />
    <path d='M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464' />
    <path d='M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463' />
  </svg>
)

const Link = ({
  variant = 'light',
  color = 'default',
  rounded = 'md',
  isDisabled = false,
  size = 'md',
  underline = 'hover',
  isExternal = false,
  defaultIcon = false,
  children,
  href = '#',
  ariaLabel = ''
}) => {
  const className = useMemo(
    () =>
      clsx(
        'flex items-center justify-center text-center gap-2 transition-colors duration-200',
        VARIANTS[variant],
        SIZE_STYLES[size],
        TEXT_COLORS[color],
        UNDERLINE_STYLES[underline],
        {
          [COLORS[color]]: variant === 'default',
          [BORDER_COLORS[color]]: variant === 'bordered',
          [ROUNDEDS[rounded]]: variant !== 'light',
          'opacity-50 cursor-not-allowed': isDisabled
        }
      ),
    [variant, color, size, rounded, underline, isDisabled]
  )

  return (
    <a
      className={className}
      href={isDisabled ? undefined : href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel || undefined}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
    >
      {children}
      {defaultIcon && <DefaultIcon size={size} />}
    </a>
  )
}

export default memo(Link)
