import { type ReactNode } from 'react'

interface DrawerContentProps {
  children: ReactNode
}

const DrawerContent: React.FC<DrawerContentProps> = ({ children }) => {
  return <div className='flex-1 flex flex-col overflow-hidden'>{children}</div>
}

export default DrawerContent
