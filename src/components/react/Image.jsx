const Image = ({
  imageSrc,
  alt = 'img preview',
  zoomedWrapper,
  filter,
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
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-2xl',
    full: 'rounded-full'
  }

  const shadows = {
    none: 'shadow-none',
    sm: 'shadow-xs',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }

  const zoomed = zoomedWrapper
    ? 'transition-transform duration-500 ease-in-out transform group-hover:scale-110'
    : ''

  return (
    <div className={`relative`} role='img' aria-label={alt}>
      <div
        className={`overflow-hidden group ${roundeds[rounded]} ${shadows[shadow]} dark:shadow-neutral-100/20`}
      >
        <img
          src={imageSrc}
          alt={alt}
          className={`object-cover ${filters[filter]} ${
            filter !== 'blur' && zoomed
          } ${roundeds[rounded]} ${
            className === '' && 'w-full h-full'
          } ${className}`}
        />

        {filter === 'blur' && (
          <div className={`absolute inset-0 flex items-center justify-center`}>
            <img
              src={imageSrc}
              alt={alt}
              className={`size-6/7 object-cover shadow-lg ${
                roundeds[rounded]
              } ${filter === 'blur' && zoomed}`}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Image
