import { forwardRef, useId } from 'react'
import clsx from 'clsx'
import Avatar from '@/components/react/Avatar'

const VARIANT_STYLES = {
  default: 'border-0 shadow-md backdrop-blur-sm',
  bordered: 'border border-current',
  light: ''
}

const COLOR_STYLES = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLOR_STYLES = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const SIZE_STYLES = {
  xs: 'p-1 space-x-2 text-xs',
  sm: 'p-2 space-x-3 text-sm',
  md: 'p-3 space-x-4 text-base',
  lg: 'p-4 space-x-5 text-lg',
  xl: 'p-5 space-x-6 text-xl'
}

const ROUNDING_STYLES = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-2xl',
  full: 'rounded-full'
}

const User = forwardRef(
  (
    {
      avatarSrc,
      avatarAlt,
      avatarSize,
      avatarRounded,
      avatarBordered,
      avatarColor,
      avatarDot,
      avatarDotColor,
      avatarDotPosition,
      name = '',
      description = '',
      variant = 'default',
      color = 'default',
      size = 'md',
      rounded = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const nameId = `user-name-${autoId}`
    const descId = `user-desc-${autoId}`

    const containerClasses = clsx(
      'flex items-center',
      VARIANT_STYLES[variant],
      variant === 'default' && COLOR_STYLES[color],
      TEXT_COLOR_STYLES[color],
      SIZE_STYLES[size],
      ROUNDING_STYLES[rounded],
      className
    )

    return (
      <div
        ref={ref}
        className={containerClasses}
        role='group'
        aria-labelledby={nameId}
        aria-describedby={descId}
        {...props}
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

        <div className='flex flex-col'>
          <span id={nameId} className='font-semibold'>
            {name}
          </span>
          <span id={descId} className='font-normal'>
            {description}
          </span>
        </div>
      </div>
    )
  }
)

User.displayName = 'User'

export default User
