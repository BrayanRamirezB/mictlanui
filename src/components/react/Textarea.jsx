import { useState, useId, useCallback, forwardRef } from 'react'
import clsx from 'clsx'

const VARIANT_STYLES = {
  default:
    'border-0 shadow-md backdrop-blur-sm bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  bordered: 'border border-gray-800 dark:border-gray-300 bg-transparent',
  light: 'bg-transparent'
}

const COLOR_STYLES = {
  default:
    'text-zinc-800 dark:text-neutral-100 placeholder-zinc-800/30 dark:placeholder-neutral-100/30',
  danger: 'bg-red-500/20 text-red-800 dark:text-red-500'
}

const Textarea = forwardRef(
  (
    {
      label,
      placeholder = '',
      description,
      errorMessage,
      isRequired = false,
      isReadOnly = false,
      isDisabled = false,
      defaultValue = '',
      onChange: externalOnChange,
      variant = 'default',
      className,
      id,
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const textareaId = id || autoId

    const [value, setValue] = useState(defaultValue)
    const [isInvalid, setIsInvalid] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const handleChange = useCallback(
      (e) => {
        const newValue = e.target.value
        setValue(newValue)
        setIsInvalid(isRequired && newValue.trim() === '')
        externalOnChange?.(e)
      },
      [externalOnChange, isRequired]
    )

    const handleFocus = useCallback(() => setIsFocused(true), [])
    const handleBlur = useCallback(() => {
      setIsFocused(false)
      setIsInvalid(isRequired && value.trim() === '')
    }, [isRequired, value])

    const containerClasses = clsx(
      'flex flex-col space-y-2',
      isDisabled && 'opacity-50 cursor-not-allowed',
      className
    )

    const textareaClasses = clsx(
      'w-full p-2 rounded-lg transition focus:outline-none',
      VARIANT_STYLES[variant],
      COLOR_STYLES.default,
      isInvalid && COLOR_STYLES.danger,
      isFocused && 'ring-2 ring-blue-500',
      isDisabled && 'bg-gray-100'
    )

    return (
      <div
        className={containerClasses}
        data-invalid={isInvalid}
        data-required={isRequired}
        data-readonly={isReadOnly}
        data-focus={isFocused}
        data-disabled={isDisabled}
      >
        {label && (
          <label
            htmlFor={textareaId}
            className={clsx('text-sm font-medium', COLOR_STYLES.default)}
          >
            {label}
            {isRequired && <span className='text-red-500'> *</span>}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          className={textareaClasses}
          placeholder={placeholder}
          value={value}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-invalid={isInvalid}
          aria-required={isRequired}
          aria-readonly={isReadOnly}
          aria-disabled={isDisabled}
          aria-describedby={description ? `${textareaId}-desc` : undefined}
          aria-errormessage={
            isInvalid && errorMessage ? `${textareaId}-error` : undefined
          }
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {description && (
          <p id={`${textareaId}-desc`} className='text-sm'>
            {description}
          </p>
        )}

        {isInvalid && errorMessage && (
          <p
            id={`${textareaId}-error`}
            className='text-sm text-red-800 dark:text-red-500'
            aria-live='assertive'
          >
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

export default Textarea
