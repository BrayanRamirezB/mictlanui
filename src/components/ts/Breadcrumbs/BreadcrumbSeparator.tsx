import { type FC } from 'react'

interface BreadcrumbSeparatorProps {
  separator: React.ReactNode
  colorClass?: string
}

const BreadcrumbSeparator: FC<BreadcrumbSeparatorProps> = ({
  separator,
  colorClass
}) => <span className={`mx-1 ${colorClass}`}>{separator}</span>

export default BreadcrumbSeparator
