const ModalFooter = ({ children }) => {
  return (
    <div
      className='flex justify-end space-x-2'
      role='contentinfo'
      aria-label='Modal Footer'
    >
      {children}
    </div>
  )
}

export default ModalFooter
