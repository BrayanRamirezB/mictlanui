import { type FC, type ReactNode, useState } from 'react'
import BreadcrumbItem from '@/components/ts/Breadcrumbs/BreadcrumbItem'
import BreadcrumbSeparator from '@/components/ts/Breadcrumbs/BreadcrumbSeparator'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  variant?: 'default' | 'bordered' | 'light'
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  separator?: ReactNode
  collapsible?: boolean
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  items = [],
  variant = 'default',
  size = 'md',
  color = 'default',
  rounded = 'md',
  separator = '/',
  collapsible = false
}) => {
  const [selected, setSelected] = useState<string>(items[0]?.label || '')

  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-lg bg-transparent',
    light: 'border-0 bg-transparent'
  }

  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const colors = {
    default: 'bg-neutral-200/30 dark:bg-zinc-700/30 dark:shadow-zinc-700/20',
    primary: 'bg-blue-500/20 dark:shadow-blue-500/20',
    secondary: 'bg-indigo-500/20 dark:shadow-indigo-500/20',
    success: 'bg-green-500/20 dark:shadow-green-500/20',
    warning: 'bg-yellow-500/10 dark:bg-yellow-500/20 dark:shadow-yellow-500/20',
    danger: 'bg-red-500/20 dark:shadow-red-500/20'
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-800 dark:text-blue-500',
    secondary: 'text-indigo-800 dark:text-indigo-500',
    success: 'text-green-800 dark:text-green-500',
    warning: 'text-yellow-800 dark:text-yellow-500',
    danger: 'text-red-800 dark:text-red-500'
  }

  const borderColors = {
    default: 'border-neutral-100/40 dark:border-zinc-700/60',
    primary: 'border-blue-500',
    secondary: 'border-indigo-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    danger: 'border-red-500'
  }

  const sizeClass = sizes[size]
  const roundedClass = roundeds[rounded]
  const colorClass = colors[color]
  const variantClass = variants[variant]
  const textcolorClass = textColors[color]
  const borderClass = borderColors[color]

  const handleClick = (label: string) => {
    setSelected(label) // Actualiza el elemento seleccionado
  }

  const renderItem = (item: BreadcrumbItem, isLast: boolean) => (
    <div className='flex items-center' key={item.label}>
      <BreadcrumbItem
        label={item.label}
        href={item.href}
        icon={item.icon}
        selected={item.label === selected}
        sizeClass={sizeClass}
        roundedClass={roundedClass}
        colorClass={textcolorClass}
        onClick={() => handleClick(item.label)}
        aria-current={item.label === selected ? 'page' : undefined}
      />
      {!isLast && (
        <BreadcrumbSeparator
          separator={separator}
          colorClass={textcolorClass}
          aria-hidden='true'
        />
      )}
    </div>
  )

  const renderCollapsed = () => {
    const firstItem = items[0]
    const lastItem = items[items.length - 1]
    return (
      <>
        {renderItem(firstItem, false)}
        <span className={`mx-2 ${textcolorClass}`} aria-hidden='true'>
          ...
        </span>
        {renderItem(lastItem, true)}
      </>
    )
  }

  return (
    <nav className='flex flex-row mx-auto p-2' aria-label='Breadcrumb'>
      <ul
        className={`flex mx-auto items-center gap-2 px-2 ${variantClass}  ${roundedClass}
        ${variant === 'bordered' ? `${borderClass}` : `${colorClass}`}`}
        role='list'
      >
        {collapsible && items.length > 2
          ? renderCollapsed()
          : items.map((item, index) => (
              <li key={item.label} role='listitem'>
                {renderItem(item, index === items.length - 1)}
              </li>
            ))}
      </ul>
    </nav>
  )
}

export default Breadcrumbs
