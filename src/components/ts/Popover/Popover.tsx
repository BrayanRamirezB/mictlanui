import {
  useState,
  useRef,
  useEffect,
  Children,
  cloneElement,
  type ReactElement
} from 'react'
import PopoverContent from '@/components/ts/Popover/PopoverContent'
import PopoverTrigger from '@/components/ts/Popover/PopoverTrigger'

interface PopoverProps {
  children: ReactElement<any>[]
  backdrop?: 'transparent' | 'opaque' | 'blur'
  placement?: 'top' | 'bottom' | 'left' | 'right'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

const Popover = ({
  children,
  backdrop = 'transparent',
  placement = 'bottom',
  color = 'default',
  rounded = 'md'
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
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
      {Children.map(children, (child) => {
        if (child.type === PopoverTrigger) {
          return cloneElement(child, {
            onClick: () => setIsOpen(!isOpen)
          }) as ReactElement
        }
        if (child.type === PopoverContent) {
          return cloneElement(child, {
            isOpen,
            backdrop,
            placement,
            color,
            rounded,
            ref: contentRef
          }) as ReactElement
        }
        return child
      })}
    </div>
  )
}

export default Popover
