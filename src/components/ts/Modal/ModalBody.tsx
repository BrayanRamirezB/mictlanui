import { type ReactNode } from 'react'

interface ModalBodyProps {
  children: ReactNode
}

const ModalBody = ({ children }: ModalBodyProps) => {
  return (
    <div className='mb-4' role='region' aria-label='Modal Content'>
      {children}
    </div>
  )
}

export default ModalBody
