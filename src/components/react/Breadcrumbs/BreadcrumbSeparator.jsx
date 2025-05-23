import { forwardRef, memo } from 'react'
import clsx from 'clsx'

const BreadcrumbSeparator = forwardRef(
  (
    {
      separator = '/',
      colorClass = 'text-gray-500',
      ariaLabel = 'breadcrumb separator',
      className,
      ...props
    },
    ref
  ) => (
    <span
      ref={ref}
      role='separator'
      aria-label={ariaLabel}
      className={clsx('mx-1', colorClass, className)}
      {...props}
    >
      {separator}
    </span>
  )
)

export default memo(BreadcrumbSeparator)
