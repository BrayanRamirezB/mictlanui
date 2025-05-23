import { memo, type FC } from 'react'
import clsx from 'clsx'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
export type AvatarRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type AvatarColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type DotPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export interface UserIconProps {
  className?: string
}

export interface AvatarProps {
  src?: string
  name?: string
  alt?: string
  size?: AvatarSize
  rounded?: AvatarRounded
  bordered?: boolean
  color?: AvatarColor
  dot?: boolean
  dotColor?: AvatarColor
  dotPosition?: DotPosition
}

const SIZES: Record<AvatarSize, string> = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-14',
  xxl: 'size-16',
  xxxl: 'size-20'
}

const ROUNDED: Record<AvatarRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-2xl',
  full: 'rounded-full'
}

const BORDER_COLORS: Record<AvatarColor, string> = {
  default: 'border-neutral-100 dark:border-zinc-700',
  primary: 'border-blue-500',
  secondary: 'border-indigo-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  danger: 'border-red-500'
}

const BACKGROUND_COLORS: Record<AvatarColor, string> = {
  default: 'bg-neutral-500/20 dark:bg-zinc-700/60 dark:shadow-zinc-700/20',
  primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
  secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
  success: 'bg-green-500/40 dark:shadow-green-500/20',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 dark:shadow-yellow-500/20',
  danger: 'bg-red-500/20 dark:shadow-red-500/20'
}

const DOT_COLORS: Record<AvatarColor, string> = {
  default: 'bg-neutral-500',
  primary: 'bg-blue-500',
  secondary: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
}

const DOT_POSITIONS: Record<DotPosition, string> = {
  'top-left': 'top-0 left-0 transform -translate-x-1/4 -translate-y-1/4',
  'top-right': 'top-0 right-0 transform translate-x-1/4 -translate-y-1/4',
  'bottom-left': 'bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4',
  'bottom-right': 'bottom-0 right-0 transform translate-x-1/4 translate-y-1/4'
}

const UserIcon: FC<UserIconProps> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={clsx(
      'icon icon-tabler icons-tabler-filled icon-tabler-user',
      className
    )}
    aria-hidden='true'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z' />
    <path d='M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z' />
  </svg>
)

const Avatar: FC<AvatarProps> = ({
  src,
  name = '',
  alt = '',
  size = 'lg',
  rounded = 'full',
  bordered = false,
  color = 'default',
  dot = false,
  dotColor = 'default',
  dotPosition = 'top-right'
}) => {
  const ariaLabel = alt || (name ? `Avatar of ${name}` : 'User avatar')
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const containerClasses = clsx(
    'inline-flex items-center justify-center overflow-hidden',
    SIZES[size],
    ROUNDED[rounded],
    {
      [`border-2 ${BORDER_COLORS[color]}`]: bordered,
      [`backdrop-blur-xl shadow-lg ${BACKGROUND_COLORS[color]}`]: !src
    }
  )

  return (
    <div className='relative inline-flex'>
      <div className={containerClasses} aria-label={ariaLabel} role='img'>
        {src ? (
          <img
            src={src}
            alt={ariaLabel}
            className='w-full h-full object-cover'
          />
        ) : name ? (
          <span className='font-medium text-gray-800 dark:text-gray-300 text-center'>
            {initials}
          </span>
        ) : (
          <UserIcon className='w-2/3 h-2/3' />
        )}
      </div>
      {dot && (
        <span
          className={clsx(
            'absolute w-3 h-3 rounded-full',
            DOT_COLORS[dotColor],
            DOT_POSITIONS[dotPosition]
          )}
          aria-hidden='true'
        />
      )}
    </div>
  )
}

export default memo(Avatar)
