import { type ReactNode, type FC } from 'react'

type SelectColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

interface TableCellProps {
  isSelected?: boolean
  isFocusVisible?: boolean
  selectColor?: SelectColor
  children: ReactNode
  role?: string
  tabIndex?: number
  ariaSelected?: boolean
}

const TableCell: FC<TableCellProps> = ({
  isSelected = false,
  isFocusVisible = false,
  selectColor = 'default',
  children,
  role = 'cell',
  tabIndex = 0,
  ariaSelected
}) => {
  const selectedColors: Record<SelectColor, string> = {
    default: 'bg-neutral-100/70 dark:bg-zinc-700/80',
    primary: 'bg-blue-500/70',
    secondary: 'bg-indigo-500/70',
    success: 'bg-green-500/80',
    warning: 'bg-yellow-500/90 dark:bg-yellow-500/70',
    danger: 'bg-red-500/70'
  }

  return (
    <td
      className={`
        px-6 py-4 whitespace-nowrap text-sm
        ${isSelected ? selectedColors[selectColor] : ''}
        ${isFocusVisible ? 'ring-2 ring-blue-500' : ''}
      `}
      role={role}
      tabIndex={tabIndex}
      aria-selected={ariaSelected}
    >
      {children}
    </td>
  )
}

export default TableCell
