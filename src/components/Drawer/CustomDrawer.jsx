import { useState } from 'react'
import Drawer from './Drawer.jsx'
import DrawerHeader from './DrawerHeader.jsx'
import DrawerBody from './DrawerBody.jsx'
import DrawerFooter from './DrawerFooter.jsx'
import DrawerContent from './DrawerContent.jsx'
import Button from '../Button.jsx'

const CustomDrawer = ({
  isDismissable = true,
  position = 'right',
  effect = 'opaque',
  size = 'md',
  color = 'default',
  text = 'Open Drawer'
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setDrawerOpen(true)}>{text}</Button>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        isDismissable={isDismissable}
        position={position}
        effect={effect}
        size={size}
        color={color}
      >
        <DrawerContent>
          <DrawerHeader
            onClose={() => setDrawerOpen(false)}
            closeDrawer={() => setDrawerOpen(false)}
          >
            Drawer Title
          </DrawerHeader>
          <DrawerBody>
            <p>This is the body of the drawer.</p>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setDrawerOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default CustomDrawer
