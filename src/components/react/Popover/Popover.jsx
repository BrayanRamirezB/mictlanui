import {
  useState,
  useRef,
  useEffect,
  Children,
  cloneElement,
  useCallback,
  memo,
  useId
} from 'react'
import clsx from 'clsx'
import PopoverContent from '@/components/react/Popover/PopoverContent'
import PopoverTrigger from '@/components/react/Popover/PopoverTrigger'

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
  const id = useId()

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), [])

  const handleClickOutside = useCallback((event) => {
    if (contentRef.current && !contentRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }, [])

  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') setIsOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [handleClickOutside, handleEscape])

  return (
    <div className='relative' ref={popoverRef} role='dialog'>
      {Children.map(children, (child) => {
        if (child.type === PopoverTrigger) {
          return cloneElement(child, {
            onClick: handleToggle,
            'aria-haspopup': 'dialog',
            'aria-expanded': isOpen,
            'aria-controls': id
          })
        }

        if (child.type === PopoverContent) {
          return cloneElement(child, {
            id,
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

export default memo(Popover)
