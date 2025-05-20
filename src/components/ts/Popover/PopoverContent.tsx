import { forwardRef, type ReactNode, type Ref } from 'react'

interface PopoverContentProps {
  children: ReactNode
  isOpen: boolean
  backdrop?: 'transparent' | 'opaque' | 'blur'
  placement?: 'top' | 'bottom' | 'left' | 'right'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  ref?: Ref<HTMLDivElement>
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      children,
      isOpen,
      backdrop = 'transparent',
      placement = 'bottom',
      color = 'default',
      rounded = 'md'
    },
    ref
  ) => {
    if (!isOpen) return null

    // Definimos los estilos basados en las props
    const backdropClass = {
      transparent: 'bg-transparent',
      opaque: 'bg-gray-200/50 dark:bg-black/50',
      blur: 'backdrop-blur-sm'
    }

    const placementStyles = {
      top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
    }

    const roundeds = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full'
    }

    const colors = {
      default: 'bg-neutral-100/80 dark:bg-zinc-800/80 dark:shadow-zinc-700/10',
      primary: 'bg-blue-500/80 ',
      secondary: 'bg-indigo-500/80 ',
      success: 'bg-green-500/80 dark:bg-green-600/80 ',
      warning: 'bg-yellow-500/80 ',
      danger: 'bg-red-500/80 '
    }

    return (
      <>
        <div
          className={`fixed inset-0 ${backdropClass[backdrop]}`}
          aria-hidden='true'
        ></div>

        <div
          className={`absolute z-10 ${placementStyles[placement]}`}
          ref={ref}
          role='dialog'
        >
          <div
            className={`border-0 animate-fade-in backdrop-blur-md shadow-lg p-4 whitespace-nowrap text-gray-800 dark:text-gray-300 ${colors[color]} ${roundeds[rounded]}`}
          >
            {children}
          </div>
        </div>
      </>
    )
  }
)

export default PopoverContent
