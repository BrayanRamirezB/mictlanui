import { createContext, useContext, useState, type ReactNode } from 'react'

interface DropdownContextType {
  isOpen: boolean
  toggleDropdown: () => void
}

const DropdownContext = createContext<DropdownContextType | null>(null)

interface DropdownProps {
  children: ReactNode
  [key: string]: any
}

const Dropdown = ({ children, ...props }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown }}>
      <div
        className='relative inline-block'
        role='menu'
        aria-expanded={isOpen}
        aria-haspopup='true'
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('useDropdown must be used within a Dropdown')
  }
  return context
}

export default Dropdown
