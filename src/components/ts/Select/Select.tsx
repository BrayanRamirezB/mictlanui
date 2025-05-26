import {
  isValidElement,
  useState,
  useRef,
  useEffect,
  useCallback,
  Children,
  cloneElement,
  forwardRef,
  memo,
  type ReactNode,
  type RefObject
} from 'react'
import clsx from 'clsx'

export type Variant = 'default' | 'bordered' | 'light'
export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface SelectProps {
  label?: string
  description?: string
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  onChange?: (value: string) => void
  placeholder?: string
  variant?: Variant
  color?: Color
  rounded?: Rounded
  children: ReactNode
}

const VARIANTS: Record<Variant, string> = {
  default: 'border-0 backdrop-blur-sm shadow-md',
  bordered: 'border border-current shadow-md',
  light: 'border-b border-current'
}

const COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS: Record<Color, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-600',
  secondary: 'text-indigo-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600'
}

const ROUNDEDS: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      description,
      errorMessage,
      isInvalid = false,
      isDisabled = false,
      onChange,
      placeholder = 'Selecciona una opción',
      variant = 'default',
      color = 'default',
      rounded = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState<{
      value: string | null
      label: string | null
    }>({ value: null, label: null })
    const containerRef =
      (ref as RefObject<HTMLDivElement>) || useRef<HTMLDivElement>(null)

    const handleOutsideClick = useCallback(
      (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false)
        }
      },
      [containerRef]
    )

    useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick)
      return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [handleOutsideClick])

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false)
        if (e.key === 'Enter' && !isOpen) setIsOpen(true)
      },
      [isOpen]
    )

    useEffect(() => {
      if (!isOpen) return
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, handleKeyDown])

    const handleSelect = useCallback(
      (value: string, label: string) => {
        if (isDisabled) return
        setSelected({ value, label })
        setIsOpen(false)
        onChange?.(value)
      },
      [isDisabled, onChange]
    )

    return (
      <div
        ref={containerRef}
        className='relative w-full space-y-1 text-gray-600 dark:text-gray-400'
        data-invalid={isInvalid}
        {...props}
      >
        {label && (
          <label className='block text-sm font-medium mb-1'>{label}</label>
        )}

        <button
          type='button'
          role='combobox'
          aria-expanded={isOpen}
          aria-disabled={isDisabled}
          className={clsx(
            'flex items-center justify-between p-2 w-full',
            VARIANTS[variant],
            variant === 'default' && COLORS[color],
            TEXT_COLORS[color],
            variant !== 'light' && ROUNDEDS[rounded],
            {
              'opacity-50 cursor-not-allowed': isDisabled,
              'cursor-pointer': !isDisabled
            }
          )}
          onClick={() => !isDisabled && setIsOpen((o) => !o)}
        >
          <span>{selected.value ? selected.label : placeholder}</span>
          <svg
            className={clsx(
              'w-4 h-4 transition-transform',
              isOpen && 'rotate-180'
            )}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </button>

        {isOpen && (
          <ul
            role='listbox'
            aria-labelledby='select-trigger'
            className={clsx(
              'absolute mt-1 animate-fade-in-down w-full rounded-md shadow-lg z-10 max-h-60 overflow-auto',
              COLORS[color]
            )}
          >
            {Children.map(children, (child) => {
              if (!isValidElement(child)) return child
              return cloneElement(child, {
                onSelect: handleSelect,
                selectedValue: selected.value,
                color
              })
            })}
          </ul>
        )}

        {description && <p className='text-sm mt-1'>{description}</p>}
        {isInvalid && errorMessage && (
          <p className='text-sm text-red-500 mt-1' role='alert'>
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

export default memo(Select)
