import { useState, useRef, Children, cloneElement } from 'react'

const Select = ({
  label,
  description,
  errorMessage,
  isInvalid,
  children,
  onChange,
  isDisabled = false,
  placeholder = 'Selecciona una opción',
  variant = 'default',
  color = 'default',
  rounded = 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)
  const [selectedLabel, setSelectedLabel] = useState(null)
  const selectRef = useRef(null)

  const handleSelect = (value, label) => {
    if (isDisabled) return

    setSelectedValue(value)
    setSelectedLabel(label)
    setIsOpen(false)
    onChange(value)
  }

  const handleTriggerClick = () => {
    if (isDisabled) return

    setIsOpen(!isOpen)
  }

  const hasValue = selectedValue !== null
  const hasLabel = !!label
  const isFilled = hasValue || isOpen

  const variants = {
    default: 'border-0 backdrop-blur-sm shadow-md',
    bordered: 'border border-current shadow-md',
    light: 'border-b border-current'
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-600',
    secondary: 'text-indigo-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  }

  return (
    <div
      className={`relative w-full space-y-2 text-gray-600 dark:text-gray-500`}
      ref={selectRef}
      data-filled={isFilled}
      data-has-value={hasValue}
      data-has-label={hasLabel}
      data-invalid={isInvalid}
    >
      {label && (
        <label
          htmlFor='select-trigger'
          className='block text-sm font-medium mb-1'
        >
          {label}
        </label>
      )}

      <div
        id='select-trigger'
        role='button'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-disabled={isDisabled}
        className={`trigger flex items-center justify-between p-2 ${
          variants[variant]
        } ${variant === 'default' && colors[color]} ${textColors[color]} ${
          variant !== 'light' && roundeds[rounded]
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={handleTriggerClick}
        data-open={isOpen}
      >
        <div className='value'>
          {selectedValue ? selectedLabel : placeholder}
        </div>

        <div className='selector-icon' data-open={isOpen} aria-hidden='true'>
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div
          className={`listbox-wrapper absolute mt-1 w-full border-0 backdrop-blur-xl rounded-md shadow-lg z-10 ${colors[color]}`}
        >
          <ul
            className='listbox'
            role='listbox'
            aria-labelledby='select-trigger'
          >
            {Children.map(children, (child) =>
              cloneElement(child, {
                onSelect: handleSelect,
                selectedValue,
                color
              })
            )}
          </ul>
        </div>
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

export default Select
