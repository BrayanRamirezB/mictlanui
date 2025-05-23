import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  forwardRef,
  memo,
  useEffect
} from 'react'
import clsx from 'clsx'

const DropdownContext = createContext(null)

export const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('useDropdown must be used within a Dropdown')
  }
  return context
}

const Dropdown = forwardRef(
  ({ children, className, closeOnSelect = true, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = ref || useRef(null)

    const toggleDropdown = useCallback(() => {
      setIsOpen((prev) => !prev)
    }, [])

    const closeDropdown = useCallback(() => {
      setIsOpen(false)
    }, [])

    useEffect(() => {
      function handleClickOutside(e) {
        if (
          isOpen &&
          containerRef.current &&
          !containerRef.current.contains(e.target)
        ) {
          closeDropdown()
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, closeDropdown, containerRef])

    useEffect(() => {
      function handleKeyDown(e) {
        if (e.key === 'Escape' && isOpen) closeDropdown()
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, closeDropdown])

    const baseClasses = clsx('relative inline-block', className)

    return (
      <DropdownContext.Provider
        value={{ isOpen, toggleDropdown, closeDropdown, closeOnSelect }}
      >
        <div
          ref={containerRef}
          role='menu'
          aria-expanded={isOpen}
          aria-haspopup='true'
          className={baseClasses}
          {...props}
        >
          {children}
        </div>
      </DropdownContext.Provider>
    )
  }
)

export default memo(Dropdown)
