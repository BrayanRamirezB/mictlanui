import React, { useState, useRef, useEffect } from 'react'
import PopoverContent from '@/components/Popover/PopoverContent'
import PopoverTrigger from '@/components/Popover/PopoverTrigger'

const Popover = ({
  children,
  backdrop = 'transparent',
  placement = 'bottom',
  color = 'default',
  rounded = 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className='relative' ref={popoverRef}>
      {React.Children.map(children, (child) => {
        if (child.type === PopoverTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen)
          })
        }
        if (child.type === PopoverContent) {
          return React.cloneElement(child, {
            isOpen,
            backdrop,
            placement,
            color,
            rounded,
            ref: contentRef
          })
        }
        return child
      })}
    </div>
  )
}

export default Popover
