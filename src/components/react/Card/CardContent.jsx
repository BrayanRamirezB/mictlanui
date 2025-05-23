import { forwardRef, memo } from 'react'
import clsx from 'clsx'

const TEXT_COLOR_STYLES = {
  default: 'text-zinc-700/80 dark:text-neutral-100/70',
  primary: 'text-blue-500/80',
  secondary: 'text-indigo-500/80',
  success: 'text-green-500/80',
  warning: 'text-yellow-500/80',
  danger: 'text-red-500/80'
}

const FONT_STYLES = {
  extrabold: 'font-extrabold',
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
  normal: 'font-normal',
  light: 'font-light'
}

const TEXT_SIZE_STYLES = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  xxl: 'text-2xl'
}

const TEXT_ALIGN_STYLES = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

const PADDING_STYLES = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
}

const CardContent = forwardRef(
  (
    {
      children,
      textColor = 'default',
      font = 'normal',
      textSize = 'sm',
      textAlign = 'left',
      padding = 'md',
      className,
      role = 'region',
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      TEXT_COLOR_STYLES[textColor],
      FONT_STYLES[font],
      TEXT_SIZE_STYLES[textSize],
      TEXT_ALIGN_STYLES[textAlign],
      PADDING_STYLES[padding],
      className
    )

    return (
      <div
        ref={ref}
        role={role}
        aria-label={ariaLabel}
        className={classes}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export default memo(CardContent)
