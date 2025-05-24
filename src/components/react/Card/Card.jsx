import { forwardRef, memo } from 'react'
import clsx from 'clsx'

const BG_COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const HOVER_BG = {
  default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/20',
  success: 'hover:bg-green-500/60 dark:hover:bg-green-500/30',
  warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/30',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
}

const SHADOW_SIZES = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  xxl: 'shadow-2xl'
}

const BORDER_COLORS = {
  default: 'border-neutral-100/40 dark:border-zinc-700/60',
  primary: 'border-blue-500',
  secondary: 'border-indigo-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  danger: 'border-red-500'
}

const ROUNDINGS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const MAX_WIDTHS = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  xxl: 'max-w-2xl',
  xxxl: 'max-w-3xl',
  ivxl: 'max-w-4xl',
  vxl: 'max-w-5xl',
  vixl: 'max-w-6xl'
}

const PADDINGS = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
  xxl: 'p-12',
  xxxl: 'p-16',
  ivxl: 'p-20',
  vxl: 'p-24',
  vixl: 'p-28'
}

const HEIGHTS = {
  auto: 'h-auto',
  screen: 'h-screen',
  fit: 'h-fit',
  full: 'h-full',
  sm: 'h-20',
  md: 'h-60',
  lg: 'h-80',
  xl: 'h-96'
}

const Card = forwardRef(
  (
    {
      children,
      color = 'default',
      imgBackground,
      isLink = false,
      href,
      rounded = 'md',
      border = false,
      shadow = 'md',
      maxWidth = 'sm',
      padding = 'none',
      height = 'auto',
      className,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const role = isLink ? 'link' : 'region'
    const Tag = isLink ? 'a' : 'div'

    const computedClasses = clsx(
      'w-full overflow-hidden backdrop-blur-sm',
      HEIGHTS[height],
      PADDINGS[padding],
      SHADOW_SIZES[shadow],
      ROUNDINGS[rounded],
      MAX_WIDTHS[maxWidth],
      !imgBackground && BG_COLORS[color],
      isLink && HOVER_BG[color],
      border && 'border',
      border && BORDER_COLORS[color],
      className
    )

    const style = imgBackground
      ? {
          backgroundImage: `url('${imgBackground}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      : undefined

    return (
      <Tag
        ref={ref}
        href={isLink ? href : undefined}
        role={role}
        aria-label={ariaLabel || (isLink ? 'Link card' : 'Card')}
        tabIndex={isLink ? 0 : undefined}
        className={computedClasses}
        style={style}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)

export default memo(Card)
