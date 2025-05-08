import { type FC, type ReactNode } from 'react'

interface CardContentProps {
  children: ReactNode
  textColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  font?: 'bold' | 'semibold' | 'medium' | 'normal' | 'light' | 'extrabold'
  textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  textAlign?: 'left' | 'center' | 'right'
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  role?: string
  ariaLabel?: string
}

const CardContent: FC<CardContentProps> = ({
  children,
  textColor = 'default',
  font,
  textSize = 'sm',
  textAlign = 'left',
  padding = 'md',
  className = '',
  role = 'region',
  ariaLabel = ''
}) => {
  const textColors = {
    default: 'text-zinc-700/80 dark:text-neutral-100/70',
    primary: 'text-blue-500/80',
    secondary: 'text-indigo-500/80',
    success: 'text-green-500/80',
    warning: 'text-yellow-500/80',
    danger: 'text-red-500/80'
  }

  const fonts = {
    bold: 'font-bold',
    semibold: 'font-semibold',
    medium: 'font-medium',
    normal: 'font-normal',
    light: 'font-light',
    extrabold: 'font-extrabold'
  }

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    xxl: 'text-2xl'
  }

  const textAligns = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  const paddings = {
    none: 'p-0',
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  }

  return (
    <div
      className={`
        ${textColors[textColor]} 
        ${font ? fonts[font] : ''} 
        ${textSizes[textSize]} 
        ${textAligns[textAlign]} 
        ${paddings[padding]}
        ${className}`}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  )
}

export default CardContent
