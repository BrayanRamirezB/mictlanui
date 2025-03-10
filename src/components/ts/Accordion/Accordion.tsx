import { type FC, useState } from 'react'
import AccordionItem from '@/components/ts/Accordion/AccordionItem'

interface AccordionItemProps {
  title: string
  subtitle?: string
  content: string
}

interface AccordionProps {
  items: AccordionItemProps[]
  multiple?: boolean
  styleVariant?: 'default' | 'light' | 'bordered' | 'complete'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

const Accordion: FC<AccordionProps> = ({
  items,
  multiple = false,
  styleVariant = 'default',
  color
}) => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([])

  const toggleAccordion = (index: number) => {
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
    <div id='accordion' className='w-full'>
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
        />
      ))}
    </div>
  )
}

export default Accordion
