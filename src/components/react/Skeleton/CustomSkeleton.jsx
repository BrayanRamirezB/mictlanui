import Skeleton from '@/components/react/Skeleton/Skeleton.jsx'
import Button from '@/components/react/Button.jsx'
import Card from '@/components/react/Card/Card.jsx'
import CardHeader from '@/components/react/Card/CardHeader.jsx'
import CardContent from '@/components/react/Card/CardContent.jsx'
import { useState } from 'react'

const CustomSkeleton = ({ onlyCard = true }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoaded = () => {
    setIsLoaded(!isLoaded)
  }

  return (
    <div className='flex flex-col justify-center items-center gap-y-4'>
      {onlyCard && (
        <>
          <Card maxWidth='xs' shadow='md' rounded='lg' color='default'>
            <Skeleton isLoaded={isLoaded}>
              <img
                src='/img-preview1.webp'
                alt='Card image'
                className='w-full h-40 object-cover rounded-t-lg'
              />
              <CardHeader textSize='lg' padding='md' font='bold'>
                <h3>Title</h3>
              </CardHeader>
              <CardContent textSize='sm'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Mollitia veniam at quaerat accusamus beatae, debitis nostrum
                  minima iure! Voluptas rem quo nihil inventore impedit harum?
                  Voluptatum minima iure blanditiis velit.
                </p>
              </CardContent>
            </Skeleton>
          </Card>
          <Button onClick={handleLoaded}>Click me</Button>
        </>
      )}

      {!onlyCard && (
        <div className='flex flex-col items-center justify-center gap-y-2'>
          <Skeleton className='flex w-20 h-20 rounded-lg' />
          <div className='flex flex-col gap-3'>
            <Skeleton className='flex w-40 h-3 rounded-lg' />
            <Skeleton className='flex w-40 h-3 rounded-lg' />
            <Skeleton className='flex w-40 h-3 rounded-lg' />
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomSkeleton
