const Skeleton = ({ isLoaded, children, className }) => {
  return (
    <div
      className={`relative overflow-hidden  ${
        isLoaded ? '' : `backdrop-blur-sm shadow-lg animate-pulse ${className}`
      }`}
      data-loaded={isLoaded}
      role='status'
      aria-busy={!isLoaded}
      aria-live='polite'
    >
      {!isLoaded && (
        <div
          className='absolute inset-0 transform bg-zinc-700/30 dark:bg-gray-600 animate-pulse'
          aria-hidden='true'
        />
      )}
      <div className={isLoaded ? '' : 'opacity-0'}>{children}</div>
    </div>
  )
}

export default Skeleton
