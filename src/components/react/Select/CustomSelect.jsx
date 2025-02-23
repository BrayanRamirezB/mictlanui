import Select from '@/components/react/Select/Select'
import SelectItem from '@/components/react/Select/SelectItem'
import { useState } from 'react'

const CustomSelect = ({
  label,
  description,
  errorMessage,
  isInvalid,
  disabled,
  placeholder,
  variant,
  color,
  rounded,
  isDisabled
}) => {
  const [selectedFruit, setSelectedFruit] = useState('')

  const handleFruitChange = (value) => {
    setSelectedFruit(value)
  }

  return (
    <Select
      label={label}
      description={description}
      errorMessage={errorMessage}
      isInvalid={!selectedFruit && isInvalid}
      onChange={handleFruitChange}
      isDisabled={disabled}
      placeholder={placeholder}
      variant={variant}
      color={color}
      rounded={rounded}
    >
      <SelectItem value='manzana'>Manzana 🍎</SelectItem>
      <SelectItem value='banana'>Banana 🍌</SelectItem>
      <SelectItem value='naranja'>Naranja 🍊</SelectItem>
      <SelectItem value='uva'>Uva 🍇</SelectItem>
      <SelectItem value='sandia' isDisabled={isDisabled}>
        Sandía 🍉
      </SelectItem>
    </Select>
  )
}

export default CustomSelect
