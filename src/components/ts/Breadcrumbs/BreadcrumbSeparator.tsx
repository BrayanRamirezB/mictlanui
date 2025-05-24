import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'

type BreadcrumbSeparatorProps = {
  separator?: ReactNode
  colorClass?: string
  ariaLabel?: string
  className?: string
}

const BreadcrumbSeparator = forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(
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
