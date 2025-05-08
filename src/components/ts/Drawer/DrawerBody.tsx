import { type ReactNode, type FC } from 'react'

interface DrawerBodyProps {
  children: ReactNode
}

const DrawerBody: FC<DrawerBodyProps> = ({ children }) => {
  return (
    <div
      className='flex-1 overflow-y-auto p-2'
      role='region'
      aria-label='Drawer Content'
    >
      {children}
    </div>
  )
}

export default DrawerBody
