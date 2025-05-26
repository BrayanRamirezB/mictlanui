import { memo, type FC, type ReactNode } from 'react'
import clsx from 'clsx'

export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export interface TableRowProps {
  isSelected?: boolean
  isDisabled?: boolean
  isHovered?: boolean
  isFocusVisible?: boolean
  isFirst?: boolean
  isLast?: boolean
  isOdd?: boolean
  selectedColor?: Color
  hoverColor?: Color
  oddColor?: Color
  ariaSelected?: boolean
  children: ReactNode
  className?: string
}

const SELECTED_COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/60 dark:bg-zinc-700/70',
  primary: 'bg-blue-500/60',
  secondary: 'bg-indigo-500/60',
  success: 'bg-green-500/70',
  warning: 'bg-yellow-500/80 dark:bg-yellow-500/60',
  danger: 'bg-red-500/60'
}

const HOVER_COLORS: Record<Color, string> = {
  default: 'hover:bg-neutral-100/40 dark:hover:bg-zinc-700/50',
  primary: 'hover:bg-blue-500/40',
  secondary: 'hover:bg-indigo-500/40',
  success: 'hover:bg-green-500/50',
  warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/40',
  danger: 'hover:bg-red-500/40'
}

const ODD_COLORS: Record<Color, string> = {
  default: 'bg-neutral-200/20 dark:bg-zinc-800/30',
  primary: 'bg-blue-600/20',
  secondary: 'bg-indigo-600/20',
  success: 'bg-green-600/30',
  warning: 'bg-yellow-600/40 dark:bg-yellow-600/20',
  danger: 'bg-red-600/20'
}

const TableRow: FC<TableRowProps> = ({
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
  ariaSelected,
  className,
  ...props
}) => {
  return (
    <tr
      role='row'
      aria-selected={ariaSelected}
      tabIndex={isDisabled ? -1 : 0}
      className={clsx(
        'transition-colors duration-200',
        isSelected && SELECTED_COLORS[selectedColor],
        isDisabled && 'opacity-50 cursor-not-allowed',
        HOVER_COLORS[hoverColor],
        isFocusVisible && 'ring-2 ring-blue-500',
        isFirst && 'rounded-t-lg',
        isLast && 'rounded-b-lg',
        isOdd && ODD_COLORS[oddColor],
        className
      )}
      {...props}
    >
      {children}
    </tr>
  )
}

export default memo(TableRow)
