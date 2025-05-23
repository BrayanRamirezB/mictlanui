import { forwardRef, memo, useId, useCallback } from 'react'
import clsx from 'clsx'

const VARIANT_STYLES = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const BG_COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const BORDER_COLORS = {
  default: 'border-gray-600',
  primary: 'border-blue-600',
  secondary: 'border-indigo-600',
  success: 'border-green-600',
  warning: 'border-yellow-600',
  danger: 'border-red-600'
}

const SIZE_STYLES = {
  sm: 'text-xs px-2 py-1.5',
  md: 'text-sm px-3 py-2',
  lg: 'text-base px-4 py-2.5'
}

const ROUNDINGS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const Input = forwardRef(
  (
    {
      label,
      placeholder,
      type = 'text',
      isRequired = false,
      isClearable = false,
      isInvalid = false,
      errorMessage = '',
      description = '',
      value = '',
      onValueChange,
      minLength,
      maxLength,
      pattern,
      isReadOnly = false,
      isDisabled = false,
      variant = 'default',
      color = 'default',
      rounded = 'md',
      size = 'md',
      id,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || `input-${generatedId}`
    const descId = description ? `${inputId}-desc` : undefined
    const errorId = isInvalid && errorMessage ? `${inputId}-error` : undefined

    const handleChange = useCallback(
      (e) => {
        onValueChange(e.target.value)
      },
      [onValueChange]
    )

    const handleClear = useCallback(() => {
      onValueChange('')
    }, [onValueChange])

    const containerClasses = clsx(
      'flex flex-col space-y-2',
      TEXT_COLORS[color],
      className
    )

    const wrapperClasses = clsx(
      'relative flex items-center',
      VARIANT_STYLES[variant],
      variant === 'default' && BG_COLORS[color],
      BORDER_COLORS[color] && variant === 'bordered'
        ? BORDER_COLORS[color]
        : '',
      ROUNDINGS[rounded]
    )

    const inputClasses = clsx(
      'w-full focus:outline-none',
      SIZE_STYLES[size],
      variant === 'light' && 'border-b-2',
      isInvalid && 'border-2 border-red-500',
      ROUNDINGS[rounded]
    )

    const clearButtonClasses =
      'absolute inset-y-0 right-0 pr-3 flex items-center'

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className='text-sm font-medium'>
            {label}
            {isRequired && <span className='text-red-500'> *</span>}
          </label>
        )}

        <div className={wrapperClasses}>
          <input
            id={inputId}
            ref={ref}
            type={type}
            value={value}
            onChange={handleChange}
            required={isRequired}
            minLength={minLength}
            maxLength={maxLength}
            pattern={pattern}
            readOnly={isReadOnly}
            disabled={isDisabled}
            placeholder={placeholder}
            aria-invalid={isInvalid}
            aria-describedby={descId}
            aria-errormessage={errorId}
            className={inputClasses}
            {...props}
          />

          {type !== 'password' && isClearable && value && (
            <button
              type='button'
              onClick={handleClear}
              className={clearButtonClasses}
              aria-label='Clear input'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path
                  d='M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z'
                  fill='currentColor'
                  strokeWidth='0'
                />
              </svg>
            </button>
          )}
        </div>

        <div className='text-sm'>
          {description && (
            <p id={descId} className='font-normal'>
              {description}
            </p>
          )}
          {isInvalid && errorMessage && (
            <p id={errorId} className='text-red-500'>
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    )
  }
)

export default memo(Input)
