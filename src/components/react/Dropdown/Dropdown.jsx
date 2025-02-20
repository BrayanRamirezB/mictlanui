import { createContext, useContext, useState } from 'react'

const DropdownContext = createContext()

const Dropdown = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown }}>
      <div className='relative inline-block' {...props}>
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
