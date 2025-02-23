import { type ReactNode, type FC } from 'react'

interface DrawerFooterProps {
  children: ReactNode
}

const DrawerFooter: FC<DrawerFooterProps> = ({ children }) => {
  return <div className='flex-shrink-0 p-2'>{children}</div>
}

export default DrawerFooter
