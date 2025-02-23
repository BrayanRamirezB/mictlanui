import { type ReactNode } from 'react'

interface ModalFooterProps {
  children: ReactNode
}

const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div className='flex justify-end space-x-2'>{children}</div>
}

export default ModalFooter
