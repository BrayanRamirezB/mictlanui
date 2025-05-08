import { type FC } from 'react'
import Avatar, { type AvatarProps } from '@/components/ts/Avatar'

interface UserProps {
  avatarSrc?: string
  avatarAlt?: string
  avatarSize?: AvatarProps['size']
  avatarRounded?: AvatarProps['rounded']
  avatarBordered?: AvatarProps['bordered']
  avatarColor?: AvatarProps['color']
  avatarDot?: AvatarProps['dot']
  avatarDotColor?: AvatarProps['dotColor']
  avatarDotPosition?: AvatarProps['dotPosition']
  name?: string
  description?: string
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

const User: FC<UserProps> = ({
  avatarSrc,
  avatarAlt,
  avatarSize,
  avatarRounded,
  avatarBordered = false,
  avatarColor,
  avatarDot = false,
  avatarDotColor,
  avatarDotPosition,
  name = '',
  description = '',
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md'
}) => {
  const variants = {
    default: 'border-0 shadow-md backdrop-blur-sm',
    bordered: 'border border-current',
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

  const sizes = {
    xs: 'p-1 space-x-2',
    sm: 'p-2 space-x-3',
    md: 'p-3 space-x-4',
    lg: 'p-4 space-x-5',
    xl: 'p-5 space-x-6'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-2xl',
    full: 'rounded-full'
  }

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div
      className={`base flex items-center ${variants[variant]} 
        ${sizes[size]} 
        ${roundeds[rounded]} 
        ${textColors[color]}
        ${variant === 'default' && colors[color]}
        ${textSizes[size]}
      `}
      role='group'
      aria-labelledby='user-name'
      aria-describedby='user-description'
    >
      <Avatar
        src={avatarSrc}
        name={name}
        alt={avatarAlt || `Avatar of ${name}`}
        size={avatarSize}
        rounded={avatarRounded}
        bordered={avatarBordered}
        color={avatarColor}
        dot={avatarDot}
        dotColor={avatarDotColor}
        dotPosition={avatarDotPosition}
      />
      <div className='wrapper'>
        <div id='user-name' className={`font-semibold`} aria-label='User name'>
          {name}
        </div>
        <div
          id='user-description'
          className={`font-normal`}
          aria-label='User description'
        >
          {description}
        </div>
      </div>
    </div>
  )
}

export default User
