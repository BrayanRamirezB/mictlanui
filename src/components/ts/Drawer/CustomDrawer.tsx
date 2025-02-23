import { useState, type FC } from 'react'
import Drawer from '@/components/ts/Drawer/Drawer'
import DrawerHeader from '@/components/ts/Drawer/DrawerHeader'
import DrawerBody from '@/components/ts/Drawer/DrawerBody'
import DrawerFooter from '@/components/ts/Drawer/DrawerFooter'
import DrawerContent from '@/components/ts/Drawer/DrawerContent'
import Button from '@/components/ts/Button'

interface CustomDrawerProps {
  isDismissable?: boolean // Indica si el drawer se puede cerrar haciendo clic fuera o presionando Escape
  position?: 'top' | 'bottom' | 'left' | 'right' // Posición del drawer
  effect?: 'opaque' | 'blur' | 'transparent' // Efecto del fondo
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' // Tamaño del drawer
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' // Color del drawer
  text?: string // Texto del botón para abrir el drawer
}

const CustomDrawer: FC<CustomDrawerProps> = ({
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
      {/* Botón para abrir el drawer */}
      <Button onClick={() => setDrawerOpen(true)}>{text}</Button>

      {/* Drawer */}
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
          {/* Cabecera del drawer */}
          <DrawerHeader
            onClose={() => setDrawerOpen(false)}
            closeDrawer={() => setDrawerOpen(false)}
          >
            Drawer Title
          </DrawerHeader>

          {/* Cuerpo del drawer */}
          <DrawerBody>
            <p>This is the body of the drawer.</p>
          </DrawerBody>

          {/* Pie de página del drawer */}
          <DrawerFooter>
            <Button onClick={() => setDrawerOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default CustomDrawer
