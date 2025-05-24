import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'

export type BreadcrumbItemProps = {
  label: string
  href?: string
  icon?: ReactNode
  selected?: boolean
  sizeClass?: string
  roundedClass?: string
  colorClass?: string
  onClick?: () => void
  className?: string
}

const BreadcrumbItem = forwardRef<
  HTMLAnchorElement & HTMLButtonElement,
  BreadcrumbItemProps
>(
  (
    {
      label,
      href,
      icon,
      selected = false,
      sizeClass = '',
      roundedClass = '',
      colorClass = '',
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses = clsx(
      'inline-flex items-center gap-1 cursor-pointer transition duration-300 hover:text-opacity-50 dark:hover:text-opacity-50',
      sizeClass,
      roundedClass,
      colorClass,
      selected ? 'font-bold' : 'font-normal',
      className
    )

    const commonProps = {
      className: baseClasses,
      'aria-label': label,
      ...(selected ? { 'aria-current': 'page' as 'page' } : {}),
      onClick,
      ref,
      ...props
    }

    const content = (
      <>
        {icon && (
          <span className='inline-block' aria-hidden='true'>
            {icon}
          </span>
        )}
        {label}
      </>
    )

    return href ? (
      <a href={href} {...commonProps}>
        {content}
      </a>
    ) : (
      <button type='button' {...commonProps}>
        {content}
      </button>
    )
  }
)

export default memo(BreadcrumbItem)
