const ModalContent = ({ children }) => {
  return (
    <div className='p-6' role='dialog' aria-modal='true'>
      {children}
    </div>
  )
}

export default ModalContent
