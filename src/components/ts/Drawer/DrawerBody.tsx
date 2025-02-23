import { type ReactNode, type FC } from 'react'

interface DrawerBodyProps {
  children: ReactNode
}

const DrawerBody: FC<DrawerBodyProps> = ({ children }) => {
  return <div className='flex-1 overflow-y-auto p-2'>{children}</div>
}

export default DrawerBody
