import { useState } from 'react'
import Input from '@/components/ts/Input/Input'

interface CustomInputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  isRequired?: boolean
  isClearable?: boolean
  isInvalid?: boolean
  errorMessage?: string
  description?: string
  isMinLength?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  isReadOnly?: boolean
  isDisabled?: boolean
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg'
}

const CustomInput = ({
  label,
  placeholder,
  type,
  isRequired = false,
  isClearable = false,
  isInvalid = false,
  errorMessage = '',
  description = '',
  isMinLength = false,
  minLength,
  maxLength,
  pattern,
  isReadOnly = false,
  isDisabled = false,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  size = 'md'
}: CustomInputProps) => {
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
          (isMinLength && value.length < (minLength || 0))
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
