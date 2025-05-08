import { type FC } from 'react'

interface BreadcrumbSeparatorProps {
  separator: React.ReactNode
  colorClass?: string
  ariaLabel?: string
}

const BreadcrumbSeparator: FC<BreadcrumbSeparatorProps> = ({
  separator,
  colorClass,
  ariaLabel
}) => (
  <span
    className={`mx-1 ${colorClass}`}
    role='separator'
    aria-label={ariaLabel || 'breadcrumb separator'}
  >
    {separator}
  </span>
)

export default BreadcrumbSeparator
