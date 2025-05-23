import { memo } from 'react'
import clsx from 'clsx'

const SELECTED_COLORS = {
  default: 'bg-neutral-100/70 dark:bg-zinc-700/80 ',
  primary: 'bg-blue-500/70 ',
  secondary: 'bg-indigo-500/70 ',
  success: 'bg-green-500/80 ',
  warning: 'bg-yellow-500/90 dark:bg-yellow-500/70 ',
  danger: 'bg-red-500/70 '
}

const TableCell = ({
  isSelected,
  isFocusVisible,
  selectColor = 'default',
  children,
  role = 'cell',
  tabIndex = 0,
  ariaSelected
}) => {
  return (
    <td
      role={role}
      tabIndex={tabIndex}
      aria-selected={ariaSelected}
      className={clsx(
        'px-6 py-4 whitespace-nowrap text-sm',
        { [SELECTED_COLORS[selectColor]]: isSelected },
        { 'ring-2 ring-blue-500': isFocusVisible }
      )}
    >
      {children}
    </td>
  )
}

export default memo(TableCell)
