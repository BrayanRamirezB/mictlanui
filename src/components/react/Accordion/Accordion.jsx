import { useState } from 'react'
import AccordionItem from '@/components/react/Accordion/AccordionItem'

const Accordion = ({
  items,
  multiple = false,
  styleVariant = 'default',
  color
}) => {
  const [activeIndexes, setActiveIndexes] = useState([])

  const toggleAccordion = (index) => {
    if (multiple) {
      setActiveIndexes((prevIndexes) =>
        prevIndexes.includes(index)
          ? prevIndexes.filter((i) => i !== index)
          : [...prevIndexes, index]
      )
    } else {
      setActiveIndexes((prevIndexes) =>
        prevIndexes.includes(index) ? [] : [index]
      )
    }
  }

  return (
    <div
      id='accordion'
      className='w-full'
      role='tablist'
      aria-multiselectable={multiple}
    >
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={item.title}
          subtitle={item.subtitle}
          content={item.content}
          isActive={activeIndexes.includes(index)}
          toggle={toggleAccordion}
          styleVariant={styleVariant}
          color={color}
          aria-expanded={activeIndexes.includes(index)}
          aria-controls={`accordion-content-${index}`}
        />
      ))}
    </div>
  )
}

export default Accordion
