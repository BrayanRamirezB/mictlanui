import { type ReactNode, type FC } from 'react'
import Card from '@/components/ts/Card/Card'
import CardHeader from '@/components/ts/Card/CardHeader'
import CardContent from '@/components/ts/Card/CardContent'

interface CustomCardProps {
  title?: string
  description?: string
  imageUrl?: string
  actions?: ReactNode
}

const CustomCard: FC<CustomCardProps> = ({
  title,
  description,
  imageUrl,
  actions
}) => {
  return (
    <Card maxWidth='xs' shadow='md' rounded='lg' color='default'>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title || 'Card image'}
          className='w-full h-40 object-cover rounded-t-lg'
        />
      )}
      <CardHeader textSize='lg' padding='md' font='bold'>
        <h3>{title}</h3>
      </CardHeader>
      <CardContent textSize='sm'>
        <p>{description}</p>
        {actions && <div className='mt-4 flex gap-2'>{actions}</div>}
      </CardContent>
    </Card>
  )
}

export default CustomCard
