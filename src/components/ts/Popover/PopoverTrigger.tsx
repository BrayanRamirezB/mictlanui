import { type ReactNode, type MouseEvent } from 'react'

interface PopoverTriggerProps {
  children: ReactNode
  onClick: (event: MouseEvent<HTMLDivElement>) => void
}

const PopoverTrigger = ({ children, onClick }: PopoverTriggerProps) => {
  return (
    <div className='cursor-pointer' onClick={onClick}>
      {children}
    </div>
  )
}

export default PopoverTrigger
