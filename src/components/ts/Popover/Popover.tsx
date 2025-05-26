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
import PopoverContent from '@/components/ts/Popover/PopoverContent'
import PopoverTrigger from '@/components/ts/Popover/PopoverTrigger'

export type Backdrop = 'opaque' | 'blur' | 'transparent'
export type Placement = 'top' | 'right' | 'bottom' | 'left'
export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface PopoverProps {
  children: React.ReactNode
  backdrop?: Backdrop
  placement?: Placement
  color?: Color
  rounded?: Rounded
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
  const id = useId()

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      contentRef.current &&
      !contentRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }, [])

  const handleEscape = useCallback((event: KeyboardEvent) => {
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
        if (!child || typeof child !== 'object' || !('type' in child)) {
          return child
        }

        if ((child as any).type === PopoverTrigger) {
          return cloneElement(child as React.ReactElement<any>, {
            onClick: handleToggle,
            'aria-haspopup': 'dialog',
            'aria-expanded': isOpen,
            'aria-controls': id
          })
        }

        if ((child as any).type === PopoverContent) {
          return cloneElement(child as React.ReactElement<any>, {
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
