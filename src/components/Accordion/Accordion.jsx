import { useState } from 'react'
import AccordionItem from './AccordionItem.jsx'

const Accordion = ({ items, multiple = false, styleVariant = 'default' }) => {
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
    <div id='accordion' className='w-full shadow-sm'>
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
        />
      ))}
    </div>
  )
}

export default Accordion
