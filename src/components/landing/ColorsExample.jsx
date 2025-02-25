import { useState } from 'react'
import Card from '@/components/react/Card/Card'
import CardContent from '@/components/react/Card/CardContent'
import Button from '@/components/react/Button'

const ColorsExample = () => {
  const [color, setColor] = useState('default')
  const [size, setSize] = useState('h-full')
  const [like, setLike] = useState(false)
  const [background, setBackground] = useState('complete')

  const handleLike = () => {
    setLike(!like)
  }

  const handleSize = (s) => {
    setSize(s)
  }

  const handleColor = (c) => {
    setColor(c)
  }

  const handleBackground = (b) => {
    setBackground(b)
  }

  const bgGradientColors = {
    default: 'bg-gradient-to-r from-slate-900 to-slate-700',
    primary: 'bg-gradient-to-r from-blue-500 to-blue-700',
    secondary: 'bg-gradient-to-r from-indigo-500 to-indigo-700',
    success: 'bg-gradient-to-r from-green-500 to-green-700',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-700',
    danger: 'bg-gradient-to-r from-red-500 to-red-700'
  }

  const borderColors = {
    default: 'border-neutral-100 dark:border-zinc-700',
    primary: 'border-blue-500',
    secondary: 'border-indigo-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    danger: 'border-red-500'
  }

  const backgroundFill = {
    complete: bgGradientColors[color],
    bordered: `border-2 ${borderColors[color]}`
  }

  return (
    <div className='flex flex-col gap-y-2 justify-center items-center'>
      <div className='flex items-center justify-center gap-2 flex-wrap md:flex-nowrap'>
        <Button variant='light' onClick={() => handleColor('default')}>
          <div className='flex flex-col gap-y-1 items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='size-10'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M14 3v4a1 1 0 0 0 1 1h4' />
              <path d='M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2zm-7 -7h.01m3.99 0h.01m-4.01 3h4' />
            </svg>
            <span className='text-base'>Default</span>
          </div>
        </Button>
        <Button
          variant='light'
          color='primary'
          onClick={() => handleColor('primary')}
        >
          <div className='flex flex-col gap-y-1 items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='size-10'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1' />
              <path d='M4 18l-1 -3h18l-1 3' />
              <path d='M11 12h7l-7 -9v9' />
              <path d='M8 7l-2 5' />
            </svg>
            <span className='text-base'>Primary</span>
          </div>
        </Button>
        <Button
          variant='light'
          color='secondary'
          onClick={() => handleColor('secondary')}
        >
          <div className='flex flex-col gap-y-1 items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='size-10 icon icon-tabler icons-tabler-outline icon-tabler-wand'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M6 21l15 -15l-3 -3l-15 15l3 3' />
              <path d='M15 6l3 3' />
              <path d='M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2' />
              <path d='M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2' />
            </svg>
            <span className='text-base'>Secondary</span>
          </div>
        </Button>
        <Button
          variant='light'
          color='success'
          onClick={() => handleColor('success')}
        >
          <div className='flex flex-col gap-y-1 items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='size-10 icon icon-tabler icons-tabler-outline icon-tabler-plant'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M7 15h10v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-4z' />
              <path d='M12 9a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3' />
              <path d='M12 11a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3' />
              <path d='M12 15l0 -6' />
            </svg>
            <span className='text-base'>Success</span>
          </div>
        </Button>
        <Button
          variant='light'
          color='warning'
          onClick={() => handleColor('warning')}
        >
          <div className='flex flex-col gap-y-1 items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='size-10 icon icon-tabler icons-tabler-outline icon-tabler-bolt'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11' />
            </svg>
            <span className='text-base'>Warning</span>
          </div>
        </Button>
        <Button
          variant='light'
          color='danger'
          onClick={() => handleColor('danger')}
        >
          <div className='flex flex-col gap-y-1 items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='size-10 icon icon-tabler icons-tabler-outline icon-tabler-brand-tinder'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M18.918 8.174c2.56 4.982 .501 11.656 -5.38 12.626c-7.702 1.687 -12.84 -7.716 -7.054 -13.229c.309 -.305 1.161 -1.095 1.516 -1.349c0 .528 .27 3.475 1 3.167c3 0 4 -4.222 3.587 -7.389c2.7 1.411 4.987 3.376 6.331 6.174z' />
            </svg>
            <span className='text-base'>Danger</span>
          </div>
        </Button>
      </div>
      <Card maxWidth='xl' shadow='xl' rounded='lg' color={color}>
        <CardContent textSize='sm'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-x-4'>
            <div
              className={`flex justify-center items-center h-40 w-3/4 p-4 rounded-xl ${backgroundFill[background]}`}
            >
              <img
                src='/mictlan-logo.webp'
                alt='Card image'
                className={`object-cover rounded-xl shadow-xl ${size}`}
              />
            </div>
            <div className='flex flex-col w-full'>
              <div className='flex flex-row items-center justify-between'>
                <span className='py-2 font-semibold text-base text-gray-800 dark:text-gray-300'>
                  Selección de tamaño
                </span>
                <Button
                  rounded='full'
                  size='sm'
                  variant='light'
                  color='warning'
                  onClick={handleLike}
                >
                  {like ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z' />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z' />
                    </svg>
                  )}
                </Button>
              </div>
              <p className='text-gray-700 dark:text-gray-300'>
                Establece el tamaño del componente
              </p>
              <div className='flex flex-row items-center justify-start py-3 gap-x-2'>
                <Button
                  rounded='full'
                  size='sm'
                  color={color}
                  onClick={() => handleSize('h-1/5')}
                >
                  XS
                </Button>
                <Button
                  rounded='full'
                  size='sm'
                  color={color}
                  onClick={() => handleSize('h-2/5')}
                >
                  S
                </Button>
                <Button
                  rounded='full'
                  size='sm'
                  color={color}
                  onClick={() => handleSize('h-3/5')}
                >
                  M
                </Button>
                <Button
                  rounded='full'
                  size='sm'
                  color={color}
                  onClick={() => handleSize('h-4/5')}
                >
                  L
                </Button>
                <Button
                  rounded='full'
                  size='sm'
                  color={color}
                  onClick={() => handleSize('h-full')}
                >
                  XL
                </Button>
              </div>
              <div className='flex flex-row items-center justify-start gap-x-3'>
                <Button
                  rounded='lg'
                  color={color}
                  onClick={() => handleBackground('complete')}
                >
                  Complete
                </Button>
                <Button
                  rounded='lg'
                  variant='bordered'
                  color={color}
                  onClick={() => handleBackground('bordered')}
                >
                  Bordered
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ColorsExample
