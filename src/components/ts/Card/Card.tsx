import { type FC, type ReactNode, type CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  imgBackground?: string
  isLink?: boolean
  href?: string
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  border?: boolean
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  maxWidth?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    | 'xxxl'
    | 'ivxl'
    | 'vxl'
    | 'vixl'
  padding?:
    | 'none'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    | 'xxxl'
    | 'ivxl'
    | 'vxl'
    | 'vixl'
  height?: 'auto' | 'screen' | 'fit' | 'full' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const Card: FC<CardProps> = ({
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
  className = ''
}) => {
  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 ',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const hoverColors = {
    default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10 ',
    primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
    secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/20',
    success: 'hover:bg-green-500/60 dark:hover:bg-green-500/30',
    warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/30',
    danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
  }

  const shadowSizes = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    xxl: 'shadow-2xl'
  }

  const borderColors = {
    default: 'border-neutral-100/40 dark:border-zinc-700/60',
    primary: 'border-blue-500',
    secondary: 'border-indigo-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    danger: 'border-red-500'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const maxWidths = {
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

  const paddings = {
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

  const heights = {
    auto: 'h-auto',
    screen: 'h-screen',
    fit: 'h-fit',
    full: 'h-full',
    sm: 'h-20',
    md: 'h-60',
    lg: 'h-80',
    xl: 'h-96'
  }

  const Component = isLink ? 'a' : 'div'

  const cardStyle: CSSProperties = imgBackground
    ? {
        backgroundImage: `url('${imgBackground}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    : {}

  return (
    <Component
      href={isLink ? href : undefined}
      className={` 
          w-full overflow-hidden backdrop-blur-sm
          ${heights[height]}
          ${paddings[padding]}
          ${isLink ? hoverColors[color] : ''}
          ${shadowSizes[shadow]}
          ${roundeds[rounded]}
          ${border ? `border ${borderColors[color]}` : ''}
          ${maxWidths[maxWidth]}
          ${!imgBackground && colors[color]}
          ${className}
        `}
      style={cardStyle}
    >
      {children}
    </Component>
  )
}

export default Card
