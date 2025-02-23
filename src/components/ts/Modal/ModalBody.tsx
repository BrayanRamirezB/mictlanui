import { type ReactNode } from 'react'

interface ModalBodyProps {
  children: ReactNode
}

const ModalBody = ({ children }: ModalBodyProps) => {
  return <div className='mb-4'>{children}</div>
}

export default ModalBody
