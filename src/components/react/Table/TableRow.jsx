import { memo } from 'react'
import clsx from 'clsx'

const SELECTED_COLORS = {
  default: 'bg-neutral-100/60 dark:bg-zinc-700/70',
  primary: 'bg-blue-500/60',
  secondary: 'bg-indigo-500/60',
  success: 'bg-green-500/70',
  warning: 'bg-yellow-500/80 dark:bg-yellow-500/60',
  danger: 'bg-red-500/60'
}

const HOVER_COLORS = {
  default: 'hover:bg-neutral-100/40 dark:hover:bg-zinc-700/50',
  primary: 'hover:bg-blue-500/40',
  secondary: 'hover:bg-indigo-500/40',
  success: 'hover:bg-green-500/50',
  warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/40',
  danger: 'hover:bg-red-500/40'
}

const ODD_COLORS = {
  default: 'bg-neutral-200/20 dark:bg-zinc-800/30',
  primary: 'bg-blue-600/20',
  secondary: 'bg-indigo-600/20',
  success: 'bg-green-600/30',
  warning: 'bg-yellow-600/40 dark:bg-yellow-600/20',
  danger: 'bg-red-600/20'
}

const TableRow = ({
  isSelected = false,
  isDisabled = false,
  isHovered = false,
  isFocusVisible = false,
  isFirst = false,
  isLast = false,
  isOdd = false,
  selectedColor = 'default',
  hoverColor = 'default',
  oddColor = 'default',
  children,
  ...props
}) => {
  return (
    <tr
      role='row'
      aria-selected={isSelected}
      tabIndex={isDisabled ? -1 : 0}
      className={clsx(
        'transition-colors duration-200',
        { [SELECTED_COLORS[selectedColor]]: isSelected },
        { 'opacity-50 cursor-not-allowed': isDisabled },
        HOVER_COLORS[hoverColor],
        { 'ring-2 ring-blue-500': isFocusVisible },
        { 'rounded-t-lg': isFirst },
        { 'rounded-b-lg': isLast },
        { [ODD_COLORS[oddColor]]: isOdd }
      )}
      {...props}
    >
      {children}
    </tr>
  )
}

export default memo(TableRow)
