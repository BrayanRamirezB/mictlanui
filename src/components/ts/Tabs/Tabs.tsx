import {
  useState,
  Children,
  useRef,
  type ReactNode,
  type FC,
  type ReactElement
} from 'react'

interface TabProps {
  label: string
  children: ReactNode
  disabled?: boolean
  href?: string
}

interface TabsProps {
  children: ReactNode
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  placement?: 'top' | 'bottom' | 'left' | 'right'
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
}

const Tabs: FC<TabsProps> = ({
  children,
  variant = 'default',
  color = 'default',
  size = 'md',
  radius = 'md',
  placement = 'top',
  orientation = 'horizontal',
  disabled = false
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const orientationClass = orientation === 'vertical' ? 'flex-col' : 'flex-row'

  const placementClass = {
    top: 'flex-col',
    bottom: 'flex-col-reverse',
    left: 'flex-row',
    right: 'flex-row-reverse'
  }[placement]

  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: 'border-b'
  }

  const activeVariants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border',
    light: 'border-b-2'
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20',
    secondary: 'bg-indigo-500/20',
    success: 'bg-green-500/20',
    warning: 'bg-yellow-500/20',
    danger: 'bg-red-500/20'
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-800 dark:text-blue-500',
    secondary: 'text-indigo-800 dark:text-indigo-500',
    success: 'text-green-800 dark:text-green-500',
    warning: 'text-yellow-800 dark:text-yellow-500',
    danger: 'text-red-800 dark:text-red-500'
  }

  const noActiveTextColors = {
    default: 'text-gray-800/50 dark:text-gray-300/50',
    primary: 'text-blue-800/50 dark:text-blue-500/50',
    secondary: 'text-indigo-800/50 dark:text-indigo-500/50',
    success: 'text-green-800/50 dark:text-green-500/50',
    warning: 'text-yellow-800/50 dark:text-yellow-500/50',
    danger: 'text-red-800/50 dark:text-red-500/50'
  }

  const borderColors = {
    default: 'border-gray-800 dark:border-gray-300',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
  }

  const hoverColors = {
    default: 'hover:text-gray-800/80 dark:hover:text-gray-300/80',
    primary: 'hover:text-blue-500/50 dark:hover:text-blue-500/50',
    secondary: 'hover:text-indigo-500/50 dark:hover:text-indigo-500/50',
    success: 'hover:text-green-500/80 dark:hover:text-green-500/60',
    warning: 'hover:text-yellow-500/80 dark:hover:text-yellow-500/50',
    danger: 'hover:text-red-500/50 dark:hover:text-red-500/50'
  }

  const sizes = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
    xl: 'px-6 py-3.5 text-lg'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (disabled) return

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      const nextIndex = (index + 1) % Children.count(children)
      setActiveTab(nextIndex)
      tabsRef.current[nextIndex]?.focus()
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      const prevIndex =
        (index - 1 + Children.count(children)) % Children.count(children)
      setActiveTab(prevIndex)
      tabsRef.current[prevIndex]?.focus()
    }
  }

  return (
    <div className={`flex ${placementClass}`}>
      <div
        className={`flex ${orientationClass} ${variants[variant]} ${
          variant === 'default' && colors[color]
        } ${variant !== 'default' && borderColors[color]} 
        ${sizes[size]}
        ${variant !== 'light' && roundeds[radius]}
        `}
        role='tablist'
        aria-orientation={orientation}
      >
        {Children.map(children, (child, index) => {
          const tabChild = child as ReactElement<TabProps>
          const isDisabled = tabChild.props.disabled
          const isLink = tabChild.props.href

          return (
            <button
              key={index}
              ref={(el) => {
                tabsRef.current[index] = el
              }}
              onClick={() => !isDisabled && !disabled && setActiveTab(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`px-4 py-2 transition-colors duration-300 ease-in-out ${
                activeTab === index
                  ? `animate-flip-in-x ${activeVariants[variant]} ${
                      borderColors[color]
                    } ${textColors[color]} ${
                      variant !== 'light' && roundeds[radius]
                    }`
                  : noActiveTextColors[color]
              } ${
                isDisabled || disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : hoverColors[color]
              }`}
              disabled={isDisabled}
              role='tab'
              aria-selected={activeTab === index}
              aria-controls={`tabpanel-${index}`}
            >
              {isLink ? (
                <a
                  href={tabChild.props.href}
                  className={`block ${
                    isDisabled || disabled ? 'pointer-events-none' : ''
                  }`}
                >
                  {tabChild.props.label}
                </a>
              ) : (
                tabChild.props.label
              )}
            </button>
          )
        })}
      </div>

      <div className={`p-4 ${textColors[color]}`}>
        {Children.map(children, (child, index) => (
          <div
            id={`tabpanel-${index}`}
            role='tabpanel'
            hidden={activeTab !== index}
            aria-labelledby={`tab-${index}`}
          >
            {activeTab === index
              ? (child as ReactElement<TabProps>).props.children
              : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tabs
