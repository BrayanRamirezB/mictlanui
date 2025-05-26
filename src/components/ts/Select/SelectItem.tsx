import { memo, type ReactNode } from 'react'
import clsx from 'clsx'

export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export interface SelectItemProps {
  value: string
  onSelect: (value: string, label: ReactNode) => void
  selectedValue?: string | null
  isDisabled?: boolean
  color?: Color
  children: ReactNode
  className?: string
}

const TEXT_COLORS: Record<Color, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-600',
  secondary: 'text-indigo-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600'
}

const SelectItem: React.FC<SelectItemProps> = ({
  value,
  children,
  onSelect,
  selectedValue,
  isDisabled = false,
  color = 'default',
  className,
  ...props
}) => {
  const isSelected = selectedValue === value
  const handleClick = () => {
    if (!isDisabled) {
      onSelect(value, children)
    }
  }

  return (
    <li
      role='option'
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      className={clsx(
        'p-2 cursor-pointer',
        isSelected
          ? 'bg-zinc-700/30 dark:bg-neutral-100/50 text-gray-200 dark:text-gray-800'
          : clsx(
              'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/50',
              TEXT_COLORS[color]
            ),
        {
          'opacity-50 cursor-not-allowed': isDisabled
        },
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </li>
  )
}

export default memo(SelectItem)
