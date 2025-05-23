import clsx from 'clsx'

const Image = ({
  imageSrc,
  alt = 'Image preview',
  zoomedWrapper = false,
  filter = 'none',
  rounded = 'md',
  shadow = 'md',
  className
}) => {
  const filters = {
    none: '',
    blur: 'blur-lg',
    grayscale: 'grayscale',
    sepia: 'sepia'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  }

  const shadows = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }

  const zoomEffect =
    'transition-transform duration-500 ease-in-out transform group-hover:scale-110'

  const imageClasses = clsx(
    'object-cover',
    filters[filter],
    roundeds[rounded],
    {
      [zoomEffect]: zoomedWrapper && filter !== 'blur',
      'w-full h-full': !className
    },
    className
  )

  return (
    <div className={clsx('relative')}>
      <div
        className={clsx(
          'overflow-hidden group',
          roundeds[rounded],
          shadows[shadow],
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
                roundeds[rounded],
                { [zoomEffect]: zoomedWrapper }
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
