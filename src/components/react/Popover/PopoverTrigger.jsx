const PopoverTrigger = ({ children, onClick }) => {
  return (
    <div className='cursor-pointer' onClick={onClick}>
      {children}
    </div>
  )
}

export default PopoverTrigger
