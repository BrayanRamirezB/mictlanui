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
  color = 'default'
}) => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([])

  const toggleAccordion = (index: number) => {
    if (multiple) {
      setActiveIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      )
    } else {
      setActiveIndexes((prev) => (prev.includes(index) ? [] : [index]))
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
