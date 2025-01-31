import Dropdown from './Dropdown.jsx'
import DropdownTrigger from './DropdownTrigger.jsx'
import DropdownMenu from './DropdownMenu.jsx'
import DropdownItem from './DropdownItem.jsx'
import DropdownSection from './DropdownSection.jsx'

const CustomDropdown = () => {
  return (
    <Dropdown>
      <DropdownTrigger>Open Dropdown</DropdownTrigger>
      <DropdownMenu>
        <DropdownSection heading='Section 1'>
          <DropdownItem title='Titulo 1' description='decripcion 1' />
          <DropdownItem title='Titulo 2' description='decripcion 2' />
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

const CustomDropdown2 = () => {
  return (
    <div className='flex items-center justify-center gap-x-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger default' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger variant='bordered'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger bordered' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger variant='light'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger light' />
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown3 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger default' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger color='primary'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger primary' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger color='secondary'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger secondary' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger color='success'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger success' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger color='warning'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger warning' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger color='danger'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger danger' />
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown4 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger rounded='none'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger rounded none' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger rounded='sm'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger rounded sm' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger rounded='md'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger rounded md' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger rounded='lg'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger rounded lg' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger rounded='full'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger rounded full' />
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown5 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger size='sm'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger size sm' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger size='md'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger size md' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger size='lg'>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Trigger size lg' />
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown6 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu variant='default'>
          <DropdownItem title='Menu default' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu variant='bordered'>
          <DropdownItem title='Menu bordered' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu variant='light'>
          <DropdownItem title='Menu light' />
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown7 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu color='default'>
          <DropdownItem title='Menu default' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu color='primary'>
          <DropdownItem title='Menu primary' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu color='secondary'>
          <DropdownItem title='Menu secondary' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu color='success'>
          <DropdownItem title='Menu success' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu color='warning'>
          <DropdownItem title='Menu warning' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu color='danger'>
          <DropdownItem title='Menu danger' />
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown8 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu rounded='none'>
          <DropdownItem title='Menu rounded none' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu rounded='sm'>
          <DropdownItem title='Menu rounded sm' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu rounded='md'>
          <DropdownItem title='Menu rounded md' />
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu rounded='lg'>
          <DropdownItem title='Menu rounded lg' />
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown9 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' variant='default'>
            <DropdownItem title='Section default' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' variant='bordered'>
            <DropdownItem title='Section bordered' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' variant='light'>
            <DropdownItem title='Section light' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown10 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' color='default'>
            <DropdownItem title='Section default' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' color='primary'>
            <DropdownItem title='Section primary' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' color='secondary'>
            <DropdownItem title='Section secondary' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' color='success'>
            <DropdownItem title='Section success' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' color='warning'>
            <DropdownItem title='Section warning' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' color='danger'>
            <DropdownItem title='Section danger' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown11 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' font='sm'>
            <DropdownItem title='Section font sm' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' font='md'>
            <DropdownItem title='Section font md' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' font='lg'>
            <DropdownItem title='Section font lg' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' font='xl'>
            <DropdownItem title='Section font xl' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown12 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' variant='default' rounded='none'>
            <DropdownItem title='Section rounded none' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' variant='default' rounded='sm'>
            <DropdownItem title='Section rounded sm' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' variant='default' rounded='md'>
            <DropdownItem title='Section rounded md' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownSection heading='Section' variant='default' rounded='lg'>
            <DropdownItem title='Section rounded lg' />
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown13 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem title='Item' description='default' />
          <DropdownItem title='Item' description='selected' selected={true} />
          <DropdownItem title='Item' description='disabled' disabled={true} />
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown14 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            title='Item'
            description='variant default'
            variant='default'
          />
          <DropdownItem
            title='Item'
            description='variant bordered'
            variant='bordered'
          />
          <DropdownItem
            title='Item'
            description='variant light'
            variant='light'
          />
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown15 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            title='Item'
            description='color default'
            color='default'
          />
          <DropdownItem
            title='Item'
            description='color primary'
            color='primary'
          />
          <DropdownItem
            title='Item'
            description='color secondary'
            color='secondary'
          />
          <DropdownItem
            title='Item'
            description='color success'
            color='success'
          />
          <DropdownItem
            title='Item'
            description='color warning'
            color='warning'
          />
          <DropdownItem
            title='Item'
            description='color danger'
            color='danger'
          />
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const CustomDropdown16 = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full m-auto'>
      <Dropdown>
        <DropdownTrigger>Open Dropdown</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            title='Item'
            description='rounded none'
            rounded='none'
          />
          <DropdownItem
            title='Item'
            description='rounded sm'
            variant='default'
            rounded='sm'
          />
          <DropdownItem
            title='Item'
            description='rounded md'
            variant='default'
            rounded='md'
          />
          <DropdownItem
            title='Item'
            description='rounded lg'
            variant='default'
            rounded='lg'
          />
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export {
  CustomDropdown,
  CustomDropdown2,
  CustomDropdown3,
  CustomDropdown4,
  CustomDropdown5,
  CustomDropdown6,
  CustomDropdown7,
  CustomDropdown8,
  CustomDropdown9,
  CustomDropdown10,
  CustomDropdown11,
  CustomDropdown12,
  CustomDropdown13,
  CustomDropdown14,
  CustomDropdown15,
  CustomDropdown16
}
