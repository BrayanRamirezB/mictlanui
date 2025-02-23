import { useState, type ReactNode } from 'react'

export interface SelectItemProps {
  value: string | number
  children: ReactNode
  onSelect: (value: string | number, children: ReactNode) => void
  selectedValue?: string | number | null
  isDisabled?: boolean
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

const SelectItem = ({
  value,
  children,
  onSelect,
  selectedValue,
  isDisabled = false,
  color = 'default'
}: SelectItemProps) => {
  const isSelected = selectedValue === value
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    if (!isDisabled) {
      onSelect(value, children)
    }
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-600',
    secondary: 'text-indigo-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  }

  return (
    <li
      className={`p-2 cursor-pointer ${
        isSelected
          ? ` text-gray-200 dark:text-gray-800 bg-zinc-700/30 dark:bg-neutral-100/50`
          : `${textColors[color]} hover:bg-neutral-100/50 dark:hover:bg-zinc-700/50`
      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      data-disabled={isDisabled}
      data-selected={isSelected}
      data-hover={isHovered}
      data-pressed={isPressed}
    >
      {children}
    </li>
  )
}

export default SelectItem
