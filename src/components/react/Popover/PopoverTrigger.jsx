const PopoverTrigger = ({
  children,
  onClick,
  ariaLabel = 'toggle popover'
}) => {
  return (
    <div
      className='cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
      onClick={onClick}
      type='button'
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
