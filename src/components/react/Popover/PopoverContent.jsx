import { forwardRef, useMemo } from 'react'

const BACKDROP_CLASSES = {
  transparent: 'bg-transparent',
  opaque: 'bg-gray-200/50 dark:bg-black/50',
  blur: 'backdrop-blur-sm bg-gray-200/50 dark:bg-black/50'
}

const PLACEMENT_STYLES = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2'
}

const ROUNDED_STYLES = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const COLOR_STYLES = {
  default: 'bg-neutral-100/80 dark:bg-zinc-800/80 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/80 dark:bg-blue-600/80',
  secondary: 'bg-indigo-500/80 dark:bg-indigo-600/80',
  success: 'bg-green-500/80 dark:bg-green-600/80',
  warning: 'bg-yellow-500/80 dark:bg-yellow-600/80',
  danger: 'bg-red-500/80 dark:bg-red-600/80'
}

const PopoverContent = forwardRef(
  (
    {
      children,
      isOpen,
      backdrop = 'transparent',
      placement = 'bottom',
      color = 'default',
      rounded = 'md',
      ariaLabel = 'Popover content',
      className = '',
      ...props
    },
    ref
  ) => {
    const placementClass = useMemo(
      () => PLACEMENT_STYLES[placement] || PLACEMENT_STYLES.bottom,
      [placement]
    )

    const backdropClass = useMemo(
      () => BACKDROP_CLASSES[backdrop] || BACKDROP_CLASSES.transparent,
      [backdrop]
    )

    const contentClasses = useMemo(
      () =>
        [
          'border-0 animate-fade-in backdrop-blur-md',
          'shadow-lg p-4 whitespace-nowrap',
          'text-gray-800 dark:text-gray-300',
          COLOR_STYLES[color] || COLOR_STYLES.default,
          ROUNDED_STYLES[rounded] || ROUNDED_STYLES.md,
          className
        ].join(' '),
      [color, rounded, className]
    )

    if (!isOpen) return null

    return (
      <>
        <div
          className={`fixed inset-0 ${backdropClass}`}
          aria-hidden='true'
          data-testid='popover-backdrop'
        />

        <div
          ref={ref}
          role='dialog'
          aria-label={ariaLabel}
          className={`absolute z-10 transform ${placementClass}`}
          {...props}
        >
          <div className={contentClasses}>{children}</div>
        </div>
      </>
    )
  }
)

export default PopoverContent
