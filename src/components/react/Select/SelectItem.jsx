import { memo } from 'react'
import clsx from 'clsx'

const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-600',
  secondary: 'text-indigo-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600'
}

const SelectItem = memo(
  ({
    value,
    children,
    onSelect,
    selectedValue,
    isDisabled = false,
    color = 'default'
  }) => {
    const isSelected = selectedValue === value
    const handleClick = () => {
      if (!isDisabled) onSelect(value, children)
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
            : `hover:bg-neutral-100/50 dark:hover:bg-zinc-700/50 ${TEXT_COLORS[color]}`,
          { 'opacity-50 cursor-not-allowed': isDisabled }
        )}
        onClick={handleClick}
      >
        {children}
      </li>
    )
  }
)

export default memo(SelectItem)
