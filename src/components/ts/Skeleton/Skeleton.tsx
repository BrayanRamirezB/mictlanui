import { memo, type ReactNode, type FC } from 'react'
import clsx from 'clsx'

export interface SkeletonProps {
  isLoaded?: boolean
  children: ReactNode
  className?: string
}

const Skeleton: FC<SkeletonProps> = ({
  isLoaded = false,
  children,
  className = '',
  ...props
}) => {
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
      {...props}
    >
      {!isLoaded && <div className={overlayClasses} aria-hidden='true' />}
      <div className={contentClasses}>{children}</div>
    </div>
  )
}

export default memo(Skeleton)
