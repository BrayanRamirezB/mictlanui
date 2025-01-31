const CardHeader = ({
  children,
  textColor = 'default',
  textHoverColor,
  font = 'bold',
  textSize = 'lg',
  textAlign = 'left',
  padding = 'md',
  isLink = false,
  href = '#',
  className = ''
}) => {
  const textColors = {
    default: 'text-zinc-700 dark:text-neutral-100/80',
    primary: 'text-blue-500',
    secondary: 'text-indigo-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500'
  }

  const textHoverColors = {
    default: 'hover:text-zinc-900 dark:hover:text-neutral-100',
    primary: 'hover:text-blue-600 dark:hover:text-blue-500',
    secondary: 'hover:text-indigo-600 dark:hover:text-indigo-500',
    success: 'hover:text-green-600 dark:hover:text-green-500',
    warning: 'hover:text-yellow-600 dark:hover:text-yellow-500',
    danger: 'hover:text-red-600 dark:hover:text-red-500'
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

  const Component = isLink ? 'a' : 'div'

  return (
    <Component
      href={isLink ? href : undefined}
      className={`
        ${textColors[textColor]} 
        ${textHoverColor && textHoverColors[textHoverColor]} 
        ${fonts[font]} 
        ${textSizes[textSize]} 
        ${textAligns[textAlign]} 
        ${paddings[padding]}
        ${className}`}
    >
      {children}
    </Component>
  )
}

export default CardHeader
