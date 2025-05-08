const DrawerBody = ({ children }) => (
  <div
    className='flex-1 overflow-y-auto p-2'
    role='region'
    aria-label='Drawer Content'
  >
    {children}
  </div>
)

export default DrawerBody
