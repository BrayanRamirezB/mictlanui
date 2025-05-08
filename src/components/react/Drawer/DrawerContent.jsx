const DrawerContent = ({ children }) => (
  <div
    className='flex-1 flex flex-col overflow-hidden'
    role='region'
    aria-label='Drawer Content'
  >
    {children}
  </div>
)

export default DrawerContent
