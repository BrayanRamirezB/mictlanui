import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'

type TextColor = keyof typeof TEXT_COLOR_STYLES
type TextHoverColor = keyof typeof TEXT_HOVER_COLOR_STYLES
type Font = keyof typeof FONT_STYLES
type TextSize = keyof typeof TEXT_SIZE_STYLES
type TextAlign = keyof typeof TEXT_ALIGN_STYLES
type Padding = keyof typeof PADDING_STYLES

export interface CardHeaderProps {
  children: ReactNode
  textColor?: TextColor
  textHoverColor?: TextHoverColor
  font?: Font
  textSize?: TextSize
  textAlign?: TextAlign
  padding?: Padding
  isLink?: boolean
  href?: string
  className?: string
  ariaLabel?: string
  role?: string
}

export const TEXT_COLOR_STYLES = {
  default: 'text-zinc-700 dark:text-neutral-100/80',
  primary: 'text-blue-500',
  secondary: 'text-indigo-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  danger: 'text-red-500'
} as const

export const TEXT_HOVER_COLOR_STYLES = {
  default: 'hover:text-zinc-900 dark:hover:text-neutral-100',
  primary: 'hover:text-blue-600 dark:hover:text-blue-500',
  secondary: 'hover:text-indigo-600 dark:hover:text-indigo-500',
  success: 'hover:text-green-600 dark:hover:text-green-500',
  warning: 'hover:text-yellow-600 dark:hover:text-yellow-500',
  danger: 'hover:text-red-600 dark:hover:text-red-500'
} as const

export const FONT_STYLES = {
  extrabold: 'font-extrabold',
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
  normal: 'font-normal',
  light: 'font-light'
} as const

export const TEXT_SIZE_STYLES = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  xxl: 'text-2xl'
} as const

export const TEXT_ALIGN_STYLES = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
} as const

export const PADDING_STYLES = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
} as const

const CardHeader = forwardRef<HTMLElement, CardHeaderProps>(
  (
    {
      children,
      textColor = 'default',
      textHoverColor,
      font = 'bold',
      textSize = 'lg',
      textAlign = 'left',
      padding = 'md',
      isLink = false,
      href,
      className,
      ariaLabel,
      role,
      ...props
    },
    ref
  ) => {
    const Tag = isLink ? 'a' : 'div'
    const classes = clsx(
      TEXT_COLOR_STYLES[textColor],
      textHoverColor && TEXT_HOVER_COLOR_STYLES[textHoverColor],
      FONT_STYLES[font],
      TEXT_SIZE_STYLES[textSize],
      TEXT_ALIGN_STYLES[textAlign],
      PADDING_STYLES[padding],
      className
    )
    return (
      <Tag
        ref={ref}
        href={isLink ? href : undefined}
        role={role}
        aria-label={ariaLabel}
        className={classes}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)

export default memo(CardHeader)
