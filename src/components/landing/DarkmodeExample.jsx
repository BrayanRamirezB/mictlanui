import Card from '@/components/react/Card/Card'
import CardContent from '@/components/react/Card/CardContent'
import CardHeader from '@/components/react/Card/CardHeader'
import Button from '@/components/react/Button'
import Image from '@/components/react/Image'
import Slider from '@/components/react/Slider'
import { useState } from 'react'

const DarkmodeExample = () => {
  const [play, setPlay] = useState(false)
  const [like, setLike] = useState(false)

  const handlePlay = () => {
    setPlay(!play)
  }

  const handleLike = () => {
    setLike(!like)
  }

  return (
    <Card maxWidth='xs' shadow='lg' rounded='lg'>
      <CardHeader padding='lg'>
        <Image
          imageSrc='/img-preview1.webp'
          alt='Card image'
          filter='blur'
          zoomedWrapper
          className='w-full h-40'
        />
      </CardHeader>
      <CardContent textSize='sm'>
        <div className='flex flex-row items-center justify-between px-2 pt-0 pb-2'>
          <div className='flex flex-col'>
            <span className='font-semibold text-base'>Mictlan Mix</span>
            <span className='font-normal'>Mexican Album</span>
          </div>
          <div className='flex self-end'>
            <Button
              rounded='full'
              size='sm'
              variant='light'
              color='danger'
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
                  <path d='M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z' />
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
                  <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
                </svg>
              )}
            </Button>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center pb-4 gap-y-1'>
          <h1 className='font-semibold text-center text-xl'>
            MictlanUI best comp
          </h1>

          <div className='w-full'>
            <Slider
              color='default'
              value={70}
              showThumb={false}
              showValue={false}
              size='sm'
            />
          </div>
        </div>

        <div className='flex gap-x-1'>
          <Button rounded='full' size='sm' variant='light'>
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
              <path d='M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3' />
              <path d='M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3' />
              <path d='M11 11l1 -1v4' />
            </svg>
          </Button>
          <Button rounded='full' variant='light'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M19.496 4.136l-12 7a1 1 0 0 0 0 1.728l12 7a1 1 0 0 0 1.504 -.864v-14a1 1 0 0 0 -1.504 -.864z' />
              <path d='M4 4a1 1 0 0 1 .993 .883l.007 .117v14a1 1 0 0 1 -1.993 .117l-.007 -.117v-14a1 1 0 0 1 1 -1z' />
            </svg>
          </Button>
          <Button rounded='full' onClick={handlePlay}>
            {play ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z' />
                <path d='M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z' />
              </svg>
            )}
          </Button>
          <Button rounded='full' variant='light'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M3 5v14a1 1 0 0 0 1.504 .864l12 -7a1 1 0 0 0 0 -1.728l-12 -7a1 1 0 0 0 -1.504 .864z' />
              <path d='M20 4a1 1 0 0 1 .993 .883l.007 .117v14a1 1 0 0 1 -1.993 .117l-.007 -.117v-14a1 1 0 0 1 1 -1z' />
            </svg>
          </Button>
          <Button rounded='full' size='sm' variant='light'>
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
              <path d='M18 4l3 3l-3 3' />
              <path d='M18 20l3 -3l-3 -3' />
              <path d='M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5' />
              <path d='M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3' />
            </svg>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default DarkmodeExample
