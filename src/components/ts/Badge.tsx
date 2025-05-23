import { useMemo, memo } from 'react'
import type { FC, ReactNode } from 'react'
import clsx from 'clsx'

export type BadgeType = 'default' | 'bordered' | 'icon'
export type BadgeSize = 'sm' | 'md' | 'lg'
export type BadgeRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type BadgeColor =
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

export interface DotProps {
  color: BadgeColor
  position: DotPosition
  text?: string
}

export interface BadgeContentProps {
  type: BadgeType
  text: string
  icon?: ReactNode
}

export interface BadgeProps {
  type?: BadgeType
  text?: string
  color?: BadgeColor
  size?: BadgeSize
  rounded?: BadgeRounded
  dot?: boolean
  dotColor?: BadgeColor
  dotPosition?: DotPosition
  dotText?: string
  icon?: ReactNode
  ariaLabel?: string
}

const BADGE_TYPES: Record<BadgeType, string> = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border border-current shadow-lg',
  icon: 'p-1 shadow-lg backdrop-blur-sm'
}

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5'
}

const ROUNDED_CLASSES: Record<BadgeRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-2xl',
  full: 'rounded-full'
}

const COLOR_CLASSES: Record<BadgeColor, string> = {
  default: 'bg-neutral-100/20 dark:shadow-zinc-700/30',
  primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
  secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
  success: 'bg-green-500/40 dark:shadow-green-500/20',
  warning: 'bg-yellow-500/40 dark:shadow-yellow-500/20',
  danger: 'bg-red-500/20 dark:shadow-red-500/20'
}

const TEXT_COLORS: Record<BadgeColor, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const DOT_COLORS: Record<BadgeColor, string> = {
  default: 'bg-neutral-500',
  primary: 'bg-blue-500',
  secondary: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
}

const DOT_POSITIONS: Record<DotPosition, string> = {
  'top-left': 'top-0 left-0 -translate-x-1/3 -translate-y-1/3',
  'top-right': 'top-0 right-0 translate-x-1/3 -translate-y-1/3',
  'bottom-left': 'bottom-0 left-0 -translate-x-1/3 translate-y-1/3',
  'bottom-right': 'bottom-0 right-0 translate-x-1/3 translate-y-1/3'
}

const DefaultIcon: FC = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='currentColor'
    aria-hidden='true'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z' />
    <path d='M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z' />
  </svg>
)

const Dot: FC<DotProps> = ({ color, position, text }) => {
  const dotClasses = useMemo(
    () =>
      clsx(
        'absolute transform',
        DOT_COLORS[color],
        DOT_POSITIONS[position],
        text ? 'px-1 rounded-md' : 'w-2.5 h-2.5 rounded-full'
      ),
    [color, position, text]
  )

  return (
    <span className={dotClasses} aria-hidden={!text}>
      {text}
    </span>
  )
}

const BadgeContent: FC<BadgeContentProps> = ({ type, text, icon }) => {
  if (type === 'icon') {
    return icon ? (
      <span className='inline-block' aria-hidden='true'>
        {icon}
      </span>
    ) : (
      <DefaultIcon />
    )
  }
  return <>{text}</>
}

const Badge: FC<BadgeProps> = ({
  type = 'default',
  text = 'text',
  color = 'default',
  size = 'md',
  rounded = 'full',
  dot = false,
  dotColor = 'default',
  dotPosition = 'top-right',
  dotText,
  icon,
  ariaLabel
}) => {
  const badgeClasses = useMemo(
    () =>
      clsx(
        'relative inline-flex items-center justify-center font-medium',
        SIZE_CLASSES[size],
        ROUNDED_CLASSES[rounded],
        TEXT_COLORS[color],
        BADGE_TYPES[type],
        type !== 'bordered' && COLOR_CLASSES[color]
      ),
    [type, color, size, rounded]
  )

  return (
    <span className={badgeClasses} role='status' aria-label={ariaLabel || text}>
      <BadgeContent type={type} text={text!} icon={icon} />
      {dot && <Dot color={dotColor} position={dotPosition} text={dotText} />}
    </span>
  )
}

export default memo(Badge)
