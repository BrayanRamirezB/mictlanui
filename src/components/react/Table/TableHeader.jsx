import { memo } from 'react'
import clsx from 'clsx'

const COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TableHeader = ({ children, color = 'default' }) => {
  return (
    <thead
      className={clsx('border-0 backdrop-blur-md shadow-md', COLORS[color])}
      role='rowgroup'
    >
      <tr>{children}</tr>
    </thead>
  )
}

export default memo(TableHeader)
