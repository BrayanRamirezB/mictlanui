import {
  useState,
  useEffect,
  type ChangeEvent,
  type ReactNode,
  type FC
} from 'react'

interface SwitchProps {
  label?: string
  startContent?: ReactNode
  endContent?: ReactNode
  thumbIcon?: ReactNode
  isSelected?: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  textColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  id?: string
}

const Switch: FC<SwitchProps> = ({
  label,
  startContent,
  endContent,
  thumbIcon,
  isSelected: initialSelected = false,
  isReadOnly = false,
  isDisabled = false,
  color = 'default',
  textColor = 'default',
  rounded = 'full',
  size = 'md',
  id = 'switch'
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(initialSelected)

  useEffect(() => {
    setIsSelected(initialSelected)
  }, [initialSelected])

  const handleToggle = () => {
    if (!isReadOnly && !isDisabled) {
      setIsSelected(!isSelected)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isReadOnly && !isDisabled) {
      setIsSelected(e.target.checked)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isReadOnly && !isDisabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      setIsSelected(!isSelected)
    }
  }

  const colors = {
    default: 'bg-zinc-700/30 dark:bg-neutral-100/30 dark:shadow-zinc-700/20',
    primary: 'bg-blue-500/50',
    secondary: 'bg-indigo-500/50 ',
    success: 'bg-green-500/50 ',
    warning: 'bg-yellow-500/50 ',
    danger: 'bg-red-500/50 '
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-800 dark:text-blue-600',
    secondary: 'text-indigo-800 dark:text-indigo-600',
    success: 'text-green-800 dark:text-green-600',
    warning: 'text-yellow-800 dark:text-yellow-600',
    danger: 'text-red-800 dark:text-red-500'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const sizes = {
    sm: 'h-6 w-11',
    md: 'h-8 w-16',
    lg: 'h-9 w-16',
    xl: 'h-10 w-20'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const circleSizes = {
    sm: 'size-5',
    md: 'size-6',
    lg: 'size-7',
    xl: 'size-9'
  }

  const circleTranslate = {
    sm: 'translate-x-4',
    md: 'translate-x-8',
    lg: 'translate-x-7',
    xl: 'translate-x-9'
  }

  const contentSizes = {
    sm: 'text-sm size-5',
    md: 'text-base size-6',
    lg: 'text-lg size-7',
    xl: 'text-xl size-9'
  }

  return (
    <div
      className={`flex items-center space-x-2 ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role='switch'
      aria-checked={isSelected}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
    >
      {label && (
        <label
          htmlFor={id}
          className={`${textSizes[size]} ${textColors[textColor]}`}
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-center border-0 shadow-xl backdrop-blur-md duration-500 ease-in-out transition-colors ${
          isSelected ? colors[color] : 'bg-gray-300'
        }
        ${roundeds[rounded]} 
        ${sizes[size]} `}
      >
        <input
          type='checkbox'
          id={id}
          className='hidden'
          checked={isSelected}
          onChange={handleInputChange}
          readOnly={isReadOnly}
          disabled={isDisabled}
        />
        <div className='flex items-center justify-between w-full px-1'>
          {startContent && (
            <span
              className={`flex items-center justify-center ${contentSizes[size]}`}
            >
              {startContent}
            </span>
          )}
          <div
            className={`absolute bg-neutral-100 shadow-lg transform duration-500 ease-in-out transition-transform ${
              isSelected ? circleTranslate[size] : 'translate-x-0'
            } ${circleSizes[size]} ${roundeds[rounded]}`}
          >
            {thumbIcon && (
              <span
                className={`flex items-center justify-center ${contentSizes[size]}`}
              >
                {thumbIcon}
              </span>
            )}
          </div>
          {endContent && (
            <span
              className={`flex items-center justify-center ${contentSizes[size]}`}
            >
              {endContent}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Switch
