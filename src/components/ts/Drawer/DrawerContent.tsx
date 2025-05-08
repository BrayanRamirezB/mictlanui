import { type ReactNode } from 'react'

interface DrawerContentProps {
  children: ReactNode
}

const DrawerContent: React.FC<DrawerContentProps> = ({ children }) => {
  return (
    <div
      className='flex-1 flex flex-col overflow-hidden'
      role='region'
      aria-label='Drawer Content'
    >
      {children}
    </div>
  )
}

export default DrawerContent
