const Avatar = ({
  src,
  name = '',
  alt = '',
  size = 'lg',
  rounded = 'full',
  bordered = false,
  color = 'default',
  dot = false,
  dotColor = 'default',
  dotPosition = 'top-right'
}) => {
  const sizes = {
    xs: 'size-6',
    sm: 'size-8',
    md: 'size-10',
    lg: 'size-12',
    xl: 'size-14',
    xxl: 'size-16',
    xxxl: 'size-20'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-2xl',
    full: 'rounded-full'
  }

  const borderColors = {
    default: 'border-neutral-100 dark:border-zinc-700',
    primary: 'border-blue-500',
    secondary: 'border-indigo-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    danger: 'border-red-500'
  }

  const backgroundColors = {
    default: 'bg-neutral-500/20 dark:bg-zinc-700/60 dark:shadow-zinc-700/20',
    primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
    secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
    success: 'bg-green-500/40 dark:shadow-green-500/20',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 dark:shadow-yellow-500/20',
    danger: 'bg-red-500/20 dark:shadow-red-500/20'
  }

  const dotColors = {
    default: 'bg-neutral-500',
    primary: 'bg-blue-500',
    secondary: 'bg-indigo-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  }

  const dotPositions = {
    'top-left': 'top-0 left-0 transform -translate-x-1/4 -translate-y-1/4',
    'top-right': 'top-0 right-0 transform translate-x-1/4 -translate-y-1/4',
    'bottom-left': 'bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4',
    'bottom-right': 'bottom-0 right-0 transform translate-x-1/4 translate-y-1/4'
  }

  const backgroundClass = backgroundColors[color]
  const borderClass = borderColors[color]
  const sizeClass = sizes[size]
  const roundedClass = roundeds[rounded]
  const dotPositionClass = dotPositions[dotPosition]
  const dotColorClass = dotColors[dotColor]

  return (
    <div className='relative inline-flex'>
      <div
        className={`inline-flex items-center justify-center overflow-hidden ${
          bordered ? `border-2 ${borderClass}` : ''
        } ${sizeClass} ${roundedClass} ${
          src ? '' : `backdrop-blur-xl shadow-lg ${backgroundClass}`
        }`}
        aria-label={alt || `Avatar of ${name}`}
      >
        {src ? (
          <img
            src={src}
            alt={alt || `Avatar of ${name}`}
            className='w-full h-full object-cover'
          />
        ) : name ? (
          <span className='font-medium text-gray-800 dark:text-gray-300 text-center'>
            {name}
          </span>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='icon icon-tabler icons-tabler-filled icon-tabler-user'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z' />
            <path d='M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z' />
          </svg>
        )}
      </div>
      {dot && (
        <span
          className={`absolute w-3 h-3 ${dotColorClass} ${dotPositionClass} rounded-full`}
        ></span>
      )}
    </div>
  )
}

export default Avatar
