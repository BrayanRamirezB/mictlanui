const PopoverTrigger = ({ children, onClick, ariaLabel }) => {
  return (
    <div
      className='cursor-pointer'
      onClick={onClick}
      role='button'
      tabIndex={0}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(e)
        }
      }}
    >
      {children}
    </div>
  )
}

export default PopoverTrigger
