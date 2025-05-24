import {
  useState,
  useCallback,
  useId,
  useMemo,
  type FC,
  type ReactNode,
  type ChangeEvent,
  type KeyboardEvent
} from 'react'

export type Color = keyof typeof COLOR_STYLES
export type TextColor = keyof typeof TEXT_COLORS
export type Rounded = keyof typeof ROUNDED_STYLES
export type Size = keyof typeof SIZE_STYLES

export interface SwitchProps {
  label?: string
  startContent?: ReactNode
  endContent?: ReactNode
  thumbIcon?: ReactNode
  isSelected?: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
  color?: Color
  textColor?: TextColor
  rounded?: Rounded
  size?: Size
  className?: string
  id?: string
  onChange?: (selected: boolean) => void
}

export const COLOR_STYLES = {
  default: 'bg-zinc-700/30 dark:bg-neutral-100/30 dark:shadow-zinc-700/20',
  primary: 'bg-blue-500/50',
  secondary: 'bg-indigo-500/50',
  success: 'bg-green-500/50',
  warning: 'bg-yellow-500/50',
  danger: 'bg-red-500/50'
} as const

export const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-600',
  secondary: 'text-indigo-800 dark:text-indigo-600',
  success: 'text-green-800 dark:text-green-600',
  warning: 'text-yellow-800 dark:text-yellow-600',
  danger: 'text-red-800 dark:text-red-500'
} as const

export const ROUNDED_STYLES = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
} as const

export const SIZE_STYLES = {
  sm: 'h-6 w-11',
  md: 'h-8 w-16',
  lg: 'h-9 w-16',
  xl: 'h-10 w-20'
} as const

export const TEXT_SIZES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
} as const

export const CIRCLE_SIZES = {
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-7',
  xl: 'size-9'
} as const

export const CIRCLE_TRANSLATE = {
  sm: 'translate-x-4',
  md: 'translate-x-8',
  lg: 'translate-x-7',
  xl: 'translate-x-9'
} as const

export const CONTENT_SIZES = {
  sm: 'text-sm size-5',
  md: 'text-base size-6',
  lg: 'text-lg size-7',
  xl: 'text-xl size-9'
} as const

const Switch: FC<SwitchProps> = ({
  label,
  startContent,
  endContent,
  thumbIcon,
  isSelected = false,
  isReadOnly = false,
  isDisabled = false,
  color = 'default',
  textColor = 'default',
  rounded = 'full',
  size = 'md',
  className = '',
  id = useId(),
  onChange
}) => {
  const [internalSelected, setInternalSelected] = useState(isSelected)

  const handleToggle = useCallback(() => {
    if (isReadOnly || isDisabled) return
    const newValue = !internalSelected
    setInternalSelected(newValue)
    onChange?.(newValue)
  }, [internalSelected, isDisabled, isReadOnly, onChange])

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (isReadOnly || isDisabled) return
      const newValue = e.target.checked
      setInternalSelected(newValue)
      onChange?.(newValue)
    },
    [isDisabled, isReadOnly, onChange]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!isReadOnly && !isDisabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        handleToggle()
      }
    },
    [handleToggle, isDisabled, isReadOnly]
  )

  const containerClasses = useMemo(
    () =>
      `flex items-center space-x-2 ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`,
    [className, isDisabled]
  )

  const trackClasses = useMemo(
    () =>
      `flex items-center border-0 shadow-xl backdrop-blur-md transition-colors duration-500 ease-in-out relative
      ${internalSelected ? COLOR_STYLES[color] : 'bg-gray-300'}
      ${ROUNDED_STYLES[rounded]}
      ${SIZE_STYLES[size]}`,
    [internalSelected, color, rounded, size]
  )

  const thumbClasses = useMemo(
    () =>
      `absolute bg-neutral-100 shadow-lg duration-500 ease-in-out transition-transform
      ${internalSelected ? CIRCLE_TRANSLATE[size] : 'translate-x-0'}
      ${CIRCLE_SIZES[size]}
      ${ROUNDED_STYLES[rounded]}`,
    [internalSelected, size, rounded]
  )

  return (
    <div
      className={containerClasses}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role='switch'
      aria-checked={internalSelected}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
    >
      {label && (
        <label
          htmlFor={id}
          className={`${TEXT_SIZES[size]} ${TEXT_COLORS[textColor]}`}
        >
          {label}
        </label>
      )}
      <div className={trackClasses}>
        <input
          type='checkbox'
          id={id}
          className='hidden'
          checked={internalSelected}
          onChange={handleInputChange}
          readOnly={isReadOnly}
          disabled={isDisabled}
        />
        <div className='flex items-center justify-between w-full px-1'>
          {startContent && (
            <span
              className={`flex items-center justify-center ${CONTENT_SIZES[size]}`}
            >
              {startContent}
            </span>
          )}
          <div className={thumbClasses}>
            {thumbIcon && (
              <span
                className={`flex items-center justify-center ${CONTENT_SIZES[size]}`}
              >
                {thumbIcon}
              </span>
            )}
          </div>
          {endContent && (
            <span
              className={`flex items-center justify-center ${CONTENT_SIZES[size]}`}
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
