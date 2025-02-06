import { useState } from 'react'
import Input from './Input'

const CustomInput = ({
  label,
  placeholder,
  type,
  isRequired,
  isClearable,
  isInvalid,
  errorMessage,
  description,
  isMinLength,
  minLength,
  maxLength,
  pattern,
  isReadOnly,
  isDisabled,
  variant,
  color,
  rounded,
  size
}) => {
  const [value, setValue] = useState('')

  const rule = !value.includes('@')

  return (
    <div className='p-4'>
      <Input
        label={label}
        placeholder={placeholder}
        type={type}
        isRequired={isRequired}
        isClearable={isClearable}
        isInvalid={
          (!isMinLength && isInvalid && rule) ||
          (isRequired && value.length === 0) ||
          (isMinLength && value.length < minLength)
        }
        errorMessage={errorMessage}
        description={description}
        value={value}
        onValueChange={setValue}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        variant={variant}
        color={color}
        rounded={rounded}
        size={size}
      />
    </div>
  )
}

export default CustomInput
