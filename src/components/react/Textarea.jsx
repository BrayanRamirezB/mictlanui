import { useState } from 'react'

const Textarea = ({
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
  ...props
}) => {
  const [value, setValue] = useState(defaultValue)
  const [isInvalid, setIsInvalid] = useState(false)

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)

    if (newValue === '' && isRequired) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }

    if (externalOnChange) {
      externalOnChange(e)
    }
  }

  const [isFocused, setFocused] = useState(false)
  const [isFocusVisible, setFocusVisible] = useState(false)

  const handleFocus = (e) => {
    setFocused(true)
    setFocusVisible(e.type === 'focus')
  }
  const handleBlur = () => {
    setFocused(false)
    setFocusVisible(false)
  }

  const variants = {
    default: 'border-0 shadow-md backdrop-blur-sm',
    bordered: 'border bg-transparent',
    light: 'bg-transparent'
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    danger: 'bg-red-500/20'
  }

  const borderColors = {
    default: 'border-gray-800 dark:border-gray-300'
  }

  const textColors = {
    default:
      'text-zinc-800 dark:text-neutral-100 placeholder-zinc-800/30 dark:placeholder-neutral-100/30',
    danger: 'text-red-800 dark:text-red-500'
  }

  const baseClasses = `
    flex flex-col space-y-2
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
  `

  const inputClasses = `
    w-full p-2 rounded-lg transition focus:outline-none
    ${variants[variant]}
    ${variant === 'default' && colors['default']}
    ${textColors['default']}
    ${variant === 'bordered' && borderColors['default']}
    ${isInvalid ? colors['danger'] : ''}
    ${isFocused && isFocusVisible ? 'ring-2 ring-blue-500' : ''}
    ${isDisabled ? 'bg-gray-100' : ''}
  `

  return (
    <div
      className={baseClasses}
      data-invalid={isInvalid}
      data-required={isRequired}
      data-readonly={isReadOnly}
      data-focus={isFocused}
      data-focus-visible={isFocusVisible}
      data-disabled={isDisabled}
    >
      <div className='headerWrapper'>
        {label && (
          <label
            htmlFor={props.id || 'textarea'}
            className={`label text-sm font-medium ${textColors['default']}`}
          >
            {label}
            {isRequired && <span className={`${textColors['danger']}`}>*</span>}
          </label>
        )}
      </div>

      <div className='inputWrapper'>
        <textarea
          id={props.id || 'textarea'}
          className={inputClasses}
          role='textbox'
          aria-invalid={isInvalid}
          aria-required={isRequired}
          aria-readonly={isReadOnly}
          aria-disabled={isDisabled}
          aria-describedby={
            description ? `${props.id || 'textarea'}-description` : undefined
          }
          aria-errormessage={
            isInvalid && errorMessage
              ? `${props.id || 'textarea'}-errorMessage`
              : undefined
          }
          disabled={isDisabled}
          readOnly={isReadOnly}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          {...props}
        />
      </div>

      {description && (
        <div
          id={`${props.id || 'textarea'}-description`}
          className={`description text-sm ${textColors['default']}`}
        >
          {description}
        </div>
      )}

      {isInvalid && errorMessage && (
        <div
          id={`${props.id || 'textarea'}-errorMessage`}
          className={`errorMessage text-sm ${textColors['danger']}`}
          aria-live='assertive'
        >
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default Textarea
