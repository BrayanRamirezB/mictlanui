import { memo, type FC, type ReactNode } from 'react'
import clsx from 'clsx'

type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export interface TableHeaderProps {
  children: ReactNode
  color?: Color
  className?: string
}

const COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TableHeader: FC<TableHeaderProps> = ({
  children,
  color = 'default',
  className,
  ...props
}) => {
  return (
    <thead
      className={clsx(
        'border-0 backdrop-blur-md shadow-md',
        COLORS[color],
        className
      )}
      role='rowgroup'
      {...props}
    >
      <tr>{children}</tr>
    </thead>
  )
}

export default memo(TableHeader)
