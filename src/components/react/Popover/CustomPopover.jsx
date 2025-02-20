import Popover from '@/components/react/Popover/Popover'
import PopoverTrigger from '@/components/react/Popover/PopoverTrigger'
import PopoverContent from '@/components/react/Popover/PopoverContent'
import Button from '@/components/react/Button'

const CustomPopover = ({
  title = 'Mostrar Popover',
  backdrop,
  placement,
  color,
  rounded
}) => {
  return (
    <div className='flex items-center h-30'>
      <Popover
        backdrop={backdrop}
        placement={placement}
        color={color}
        rounded={rounded}
      >
        <PopoverTrigger>
          <Button variant='bordered' color={color}>
            {title}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>This is the popover content!</p>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default CustomPopover
