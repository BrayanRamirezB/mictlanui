import Tabs from '@/components/react/Tabs/Tabs'
import Tab from '@/components/react/Tabs/Tab'

const CustomTab = ({
  variant,
  color,
  size,
  radius,
  placement,
  orientation,
  disabled,
  isDisabled,
  href
}) => {
  return (
    <div className='p-8'>
      <Tabs
        variant={variant}
        color={color}
        size={size}
        radius={radius}
        placement={placement}
        orientation={orientation}
        disabled={disabled}
      >
        <Tab label='Tab 1'>
          <div>Contenido de la pestaña 1</div>
        </Tab>
        <Tab label='Tab 2' disabled={isDisabled}>
          <div>Contenido de la pestaña 2</div>
        </Tab>
        <Tab label='Tab 3' href={href}>
          <div>Contenido de la pestaña 3</div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default CustomTab
