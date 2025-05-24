import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
  memo,
  type ReactNode,
  type RefObject
} from 'react'
import clsx from 'clsx'

type DropdownContextValue = {
  isOpen: boolean
  toggleDropdown: () => void
  closeDropdown: () => void
  closeOnSelect: boolean
}

type DropdownProps = {
  closeOnSelect?: boolean
  className?: string
  children: ReactNode
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

export const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) throw new Error('useDropdown must be used within a Dropdown')
  return context
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className, closeOnSelect = true, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef =
      (ref as RefObject<HTMLDivElement>) || useRef<HTMLDivElement>(null)

    const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), [])
    const closeDropdown = useCallback(() => setIsOpen(false), [])

    useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
        if (
          isOpen &&
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          closeDropdown()
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, closeDropdown])

    useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape' && isOpen) closeDropdown()
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, closeDropdown])

    return (
      <DropdownContext.Provider
        value={{ isOpen, toggleDropdown, closeDropdown, closeOnSelect }}
      >
        <div
          ref={containerRef}
          role='menu'
          aria-expanded={isOpen}
          aria-haspopup='true'
          className={clsx('relative inline-block', className)}
          {...props}
        >
          {children}
        </div>
      </DropdownContext.Provider>
    )
  }
)

export default memo(Dropdown)
