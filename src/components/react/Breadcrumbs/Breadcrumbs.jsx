import { forwardRef, useState, useId, useCallback, memo } from 'react'
import clsx from 'clsx'
import BreadcrumbItem from '@/components/react/Breadcrumbs/BreadcrumbItem'
import BreadcrumbSeparator from '@/components/react/Breadcrumbs/BreadcrumbSeparator'

const VARIANT_STYLES = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-lg bg-transparent',
  light: 'border-0 bg-transparent'
}

const SIZE_STYLES = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2'
}

const ROUNDING_STYLES = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const COLOR_BG_STYLES = {
  default: 'bg-neutral-200/30 dark:bg-zinc-700/30 dark:shadow-zinc-700/20',
  primary: 'bg-blue-500/20 dark:shadow-blue-500/20',
  secondary: 'bg-indigo-500/20 dark:shadow-indigo-500/20',
  success: 'bg-green-500/20 dark:shadow-green-500/20',
  warning: 'bg-yellow-500/10 dark:bg-yellow-500/20 dark:shadow-yellow-500/20',
  danger: 'bg-red-500/20 dark:shadow-red-500/20'
}

const TEXT_COLOR_STYLES = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const BORDER_COLOR_STYLES = {
  default: 'border-neutral-100/40 dark:border-zinc-700/60',
  primary: 'border-blue-500',
  secondary: 'border-indigo-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  danger: 'border-red-500'
}

const Breadcrumbs = forwardRef(
  (
    {
      items = [],
      variant = 'default',
      size = 'md',
      color = 'default',
      rounded = 'md',
      separator = '/',
      collapsible = false,
      className,
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const navId = `breadcrumbs-${autoId}`

    const [selected, setSelected] = useState(items[0]?.label)
    const handleClick = useCallback((label) => setSelected(label), [])

    const variantClass = VARIANT_STYLES[variant]
    const sizeClass = SIZE_STYLES[size]
    const roundingClass = ROUNDING_STYLES[rounded]
    const bgClass = COLOR_BG_STYLES[color]
    const textClass = TEXT_COLOR_STYLES[color]
    const borderClass = BORDER_COLOR_STYLES[color]

    const renderItem = (item, isLast) => (
      <li key={item.id ?? item.label} className='flex items-center'>
        <BreadcrumbItem
          label={item.label}
          href={item.href}
          icon={item.icon}
          selected={item.label === selected}
          sizeClass={sizeClass}
          roundedClass={roundingClass}
          colorClass={textClass}
          onClick={() => handleClick(item.label)}
        />
        {!isLast && (
          <BreadcrumbSeparator
            separator={separator}
            colorClass={textClass}
            aria-hidden='true'
          />
        )}
      </li>
    )

    const renderCollapsed = () => {
      const first = items[0]
      const last = items[items.length - 1]
      return [
        renderItem(first, false),
        <li
          key='ellipsis'
          className={clsx('mx-2', textClass)}
          aria-hidden='true'
        >
          …
        </li>,
        renderItem(last, true)
      ]
    }

    const displayItems =
      collapsible && items.length > 2
        ? renderCollapsed()
        : items.map((item, idx) => renderItem(item, idx === items.length - 1))

    return (
      <nav
        id={navId}
        ref={ref}
        role='navigation'
        aria-label='Breadcrumb'
        className={clsx('flex mx-auto p-2', className)}
        {...props}
      >
        <ul
          className={clsx(
            'flex items-center gap-2 px-2 mx-auto',
            variantClass,
            roundingClass,
            variant === 'bordered' ? borderClass : bgClass
          )}
          role='list'
        >
          {displayItems}
        </ul>
      </nav>
    )
  }
)

export default memo(Breadcrumbs)
