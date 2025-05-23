import { memo } from 'react'
import clsx from 'clsx'

const Skeleton = ({ isLoaded = false, children, className = '' }) => {
  const containerClasses = clsx(
    'relative overflow-hidden',
    !isLoaded && 'backdrop-blur-sm shadow-lg animate-pulse',
    className
  )

  const overlayClasses = clsx(
    'absolute inset-0 transform bg-zinc-700/30 dark:bg-gray-600 animate-pulse'
  )

  const contentClasses = clsx(!isLoaded && 'opacity-0')

  return (
    <div
      className={containerClasses}
      data-loaded={isLoaded}
      role='status'
      aria-busy={!isLoaded}
      aria-live='polite'
    >
      {!isLoaded && <div className={overlayClasses} aria-hidden='true' />}
      <div className={contentClasses}>{children}</div>
    </div>
  )
}

export default memo(Skeleton)
