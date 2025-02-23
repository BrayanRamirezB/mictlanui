import { type ReactNode } from 'react'

interface ModalContentProps {
  children: ReactNode
}

const ModalContent = ({ children }: ModalContentProps) => {
  return <div className='p-6'>{children}</div>
}

export default ModalContent
