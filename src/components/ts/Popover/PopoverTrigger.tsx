import { type ReactNode, type MouseEvent } from 'react'

interface PopoverTriggerProps {
  children: ReactNode
  onClick: (event: MouseEvent<HTMLDivElement>) => void
  ariaLabel: string
}

const PopoverTrigger = ({
  children,
  onClick,
  ariaLabel
}: PopoverTriggerProps) => {
  return (
    <div
      className='cursor-pointer'
      onClick={onClick}
      role='button'
      tabIndex={0}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(e as unknown as MouseEvent<HTMLDivElement>)
        }
      }}
    >
      {children}
    </div>
  )
}

export default PopoverTrigger
