import { useState, useCallback, forwardRef } from 'react'
import clsx from 'clsx'
import AccordionItem from '@/components/react/Accordion/AccordionItem'

const Accordion = forwardRef(
  (
    {
      items = [],
      multiple = false,
      styleVariant = 'default',
      color = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const [activeIndexes, setActiveIndexes] = useState([])

    const toggleAccordion = useCallback(
      (index) => {
        setActiveIndexes((prev) => {
          const isActive = prev.includes(index)
          if (multiple) {
            return isActive ? prev.filter((i) => i !== index) : [...prev, index]
          }
          return isActive ? [] : [index]
        })
      },
      [multiple]
    )

    return (
      <div
        ref={ref}
        className={clsx('w-full', className)}
        role='tablist'
        aria-multiselectable={multiple}
        {...props}
      >
        {items.map((item, idx) => (
          <AccordionItem
            key={item.id ?? idx}
            index={idx}
            title={item.title}
            subtitle={item.subtitle}
            content={item.content}
            isActive={activeIndexes.includes(idx)}
            toggle={toggleAccordion}
            styleVariant={styleVariant}
            color={color}
          />
        ))}
      </div>
    )
  }
)

export default Accordion
