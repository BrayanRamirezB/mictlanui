import type { FC } from 'react'
import clsx from 'clsx'

export type ImageFilter = 'none' | 'blur' | 'grayscale' | 'sepia'
export type ImageRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ImageShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface ImageProps {
  imageSrc: string
  alt?: string
  zoomedWrapper?: boolean
  filter?: ImageFilter
  rounded?: ImageRounded
  shadow?: ImageShadow
  className?: string
}

const FILTERS: Record<ImageFilter, string> = {
  none: '',
  blur: 'blur-lg',
  grayscale: 'grayscale',
  sepia: 'sepia'
}

const ROUNDEDS: Record<ImageRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
}

const SHADOWS: Record<ImageShadow, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl'
}

const ZOOM_EFFECT =
  'transition-transform duration-500 ease-in-out transform group-hover:scale-110'

const Image: FC<ImageProps> = ({
  imageSrc,
  alt = 'Image preview',
  zoomedWrapper = false,
  filter = 'none',
  rounded = 'md',
  shadow = 'md',
  className
}) => {
  const imageClasses = clsx(
    'object-cover',
    FILTERS[filter],
    ROUNDEDS[rounded],
    {
      [ZOOM_EFFECT]: zoomedWrapper && filter !== 'blur',
      'w-full h-full': !className
    },
    className
  )

  return (
    <div className={clsx('relative')}>
      <div
        className={clsx(
          'overflow-hidden group',
          ROUNDEDS[rounded],
          SHADOWS[shadow],
          'dark:shadow-neutral-100/20'
        )}
      >
        <img src={imageSrc} alt={alt} className={imageClasses} />

        {filter === 'blur' && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <img
              src={imageSrc}
              alt=''
              className={clsx(
                'size-6/7 object-cover shadow-lg',
                ROUNDEDS[rounded],
                { [ZOOM_EFFECT]: zoomedWrapper }
              )}
              aria-hidden='true'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Image
