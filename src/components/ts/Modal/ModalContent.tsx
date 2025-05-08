import { type ReactNode } from 'react'

interface ModalContentProps {
  children: ReactNode
}

const ModalContent = ({ children }: ModalContentProps) => {
  return (
    <div className='p-6' role='dialog' aria-modal='true'>
      {children}
    </div>
  )
}

export default ModalContent
