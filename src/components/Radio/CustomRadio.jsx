import { useState } from 'react'
import RadioGroup from '@/components/Radio/RadioGroup.jsx'
import Radio from '@/components/Radio/Radio.jsx'

const CustomRadio = ({
  orientation,
  label,
  description,
  errorMessage,
  IsInvalid,
  isDisabled,
  variant,
  color,
  rounded,
  itemDescription,
  itemDisabled
}) => {
  const [selectedValue, setSelectedValue] = useState(null)

  const handleChange = (value) => {
    setSelectedValue(value)
  }

  const validOptions = ['option2']

  const isInvalid = !validOptions.includes(selectedValue)

  return (
    <div className='p-4'>
      <RadioGroup
        label={label}
        description={description && `Selected value: ${selectedValue}`}
        errorMessage={errorMessage}
        orientation={orientation}
        selectedValue={selectedValue}
        onChange={handleChange}
        isInvalid={IsInvalid && isInvalid}
        isDisabled={isDisabled}
        variant={variant}
        color={color}
        rounded={rounded}
      >
        <Radio
          value='option1'
          description={itemDescription && 'This is option 1'}
        >
          Option 1
        </Radio>
        <Radio
          value='option2'
          description={itemDescription && 'This is option 2'}
        >
          Option 2
        </Radio>
        <Radio
          value='option3'
          description={itemDescription && 'This is option 3'}
          isDisabled={itemDisabled}
        >
          Option 3
        </Radio>
      </RadioGroup>
    </div>
  )
}

export default CustomRadio
