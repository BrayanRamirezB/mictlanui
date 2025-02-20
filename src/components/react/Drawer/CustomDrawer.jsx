import { useState } from 'react'
import Drawer from '@/components/react/Drawer/Drawer.jsx'
import DrawerHeader from '@/components/react/Drawer/DrawerHeader.jsx'
import DrawerBody from '@/components/react/Drawer/DrawerBody.jsx'
import DrawerFooter from '@/components/react/Drawer/DrawerFooter.jsx'
import DrawerContent from '@/components/react/Drawer/DrawerContent.jsx'
import Button from '@/components/react/Button.jsx'

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
