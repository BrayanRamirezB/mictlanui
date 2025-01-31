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
    default: 'text-gray-800 dark:text-gray-300',
    danger: 'text-red-800 dark:text-red-500'
  }

  const baseClasses = `
    flex flex-col space-y-2
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
  `

  const inputClasses = `
    w-full p-2 rounded-lg transition-colors
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
            className={`label text-sm font-medium ${textColors['default']}`}
          >
            {label}
            {isRequired && <span className={`${textColors['danger']}`}>*</span>}
          </label>
        )}
      </div>

      <div className='inputWrapper'>
        <textarea
          className={inputClasses}
          aria-invalid={isInvalid}
          aria-required={isRequired}
          aria-readonly={isReadOnly}
          aria-disabled={isDisabled}
          aria-describedby={description ? 'description' : undefined}
          aria-errormessage={errorMessage ? 'errorMessage' : undefined}
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
          id='description'
          className={`description text-sm ${textColors['default']}`}
        >
          {description}
        </div>
      )}

      {isInvalid && errorMessage && (
        <div
          id='errorMessage'
          className={`errorMessage text-sm ${textColors['danger']}`}
        >
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default Textarea
