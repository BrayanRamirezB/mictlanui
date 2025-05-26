import { memo, type FC, type ReactNode } from 'react'
import clsx from 'clsx'

export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export interface TableCellProps {
  isSelected?: boolean
  isFocusVisible?: boolean
  selectColor?: Color
  role?: 'cell' | 'columnheader' | 'rowheader'
  tabIndex?: number
  ariaSelected?: boolean
  children: ReactNode
  className?: string
}

const SELECTED_COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/70 dark:bg-zinc-700/80',
  primary: 'bg-blue-500/70',
  secondary: 'bg-indigo-500/70',
  success: 'bg-green-500/80',
  warning: 'bg-yellow-500/90 dark:bg-yellow-500/70',
  danger: 'bg-red-500/70'
}

const TableCell: FC<TableCellProps> = ({
  isSelected = false,
  isFocusVisible = false,
  selectColor = 'default',
  children,
  role = 'cell',
  tabIndex = 0,
  ariaSelected,
  className,
  ...props
}) => {
  return (
    <td
      role={role}
      tabIndex={tabIndex}
      aria-selected={ariaSelected}
      className={clsx(
        'px-6 py-4 whitespace-nowrap text-sm',
        isSelected && SELECTED_COLORS[selectColor],
        isFocusVisible && 'ring-2 ring-blue-500',
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}

export default memo(TableCell)
