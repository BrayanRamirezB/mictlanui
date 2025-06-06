import {
  isValidElement,
  Children,
  useState,
  useRef,
  useCallback,
  memo,
  useId,
  type ReactNode,
  type FC
} from 'react'
import clsx from 'clsx'

export type Variant = 'default' | 'bordered' | 'light'
export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type Size = 'sm' | 'md' | 'lg' | 'xl'
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type Placement = 'top' | 'bottom' | 'left' | 'right'
export type Orientation = 'horizontal' | 'vertical'

export interface TabChildProps {
  disabled?: boolean
  href?: string
  label?: string
}

export interface TabsProps {
  children: ReactNode
  variant?: Variant
  color?: Color
  size?: Size
  radius?: Radius
  placement?: Placement
  orientation?: Orientation
  disabled?: boolean
  className?: string
}

const VARIANTS: Record<Variant, string> = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: 'border-b'
}

const ACTIVE_VARIANTS: Record<Variant, string> = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border',
  light: 'border-b-2'
}

const COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS: Record<Color, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const INACTIVE_TEXT: Record<Color, string> = {
  default: 'text-gray-800/50 dark:text-gray-300/50',
  primary: 'text-blue-800/50 dark:text-blue-500/50',
  secondary: 'text-indigo-800/50 dark:text-indigo-500/50',
  success: 'text-green-800/50 dark:text-green-500/50',
  warning: 'text-yellow-800/50 dark:text-yellow-500/50',
  danger: 'text-red-800/50 dark:text-red-500/50'
}

const BORDER_COLORS: Record<Color, string> = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const HOVER_COLORS: Record<Color, string> = {
  default: 'hover:text-gray-800/80 dark:hover:text-gray-300/80',
  primary: 'hover:text-blue-500/50 dark:hover:text-blue-500/50',
  secondary: 'hover:text-indigo-500/50 dark:hover:text-indigo-500/50',
  success: 'hover:text-green-500/80 dark:hover:text-green-500/60',
  warning: 'hover:text-yellow-500/80 dark:hover:text-yellow-500/50',
  danger: 'hover:text-red-500/50 dark:hover:text-red-500/50'
}

const SIZES: Record<Size, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-lg'
}

const ROUNDS: Record<Radius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const PLACEMENTS: Record<Placement, string> = {
  top: 'flex-col',
  bottom: 'flex-col-reverse',
  left: 'flex-row',
  right: 'flex-row-reverse'
}

const ORIENTATIONS: Record<Orientation, string> = {
  horizontal: 'flex-row',
  vertical: 'flex-col'
}

const Tabs: FC<TabsProps> = ({
  children,
  variant = 'default',
  color = 'default',
  size = 'md',
  radius = 'md',
  placement = 'top',
  orientation = 'horizontal',
  disabled = false,
  className = '',
  ...props
}) => {
  const [activeIdx, setActiveIdx] = useState(0)
  const tabsRef = useRef<Array<HTMLElement | null>>([])
  const idBase = useId()

  const onKeyDown = useCallback(
    (e: KeyboardEvent, idx: number) => {
      if (disabled) return
      let newIdx = idx
      if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
        newIdx = (idx + 1) % Children.count(children)
      } else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
        newIdx = (idx - 1 + Children.count(children)) % Children.count(children)
      }
      if (newIdx !== idx) {
        setActiveIdx(newIdx)
        tabsRef.current[newIdx]?.focus()
      }
    },
    [children, disabled]
  )

  const onSelect = useCallback(
    (idx: number) => {
      if (!disabled) setActiveIdx(idx)
    },
    [disabled]
  )

  const wrapperClasses = clsx('flex', PLACEMENTS[placement], className)

  const listClasses = clsx(
    'flex',
    ORIENTATIONS[orientation],
    VARIANTS[variant],
    variant === 'default' ? COLORS[color] : BORDER_COLORS[color],
    SIZES[size],
    { [ROUNDS[radius]]: variant !== 'light' }
  )

  return (
    <div className={wrapperClasses} {...props}>
      <div
        role='tablist'
        aria-orientation={orientation}
        className={listClasses}
      >
        {Children.map(children, (child, idx) => {
          if (!isValidElement<TabChildProps>(child)) return child
          const { disabled: tabDisabled, href, label } = child.props
          const isActive = idx === activeIdx
          const TabTag = href && !tabDisabled ? 'a' : 'button'

          const tabClasses = clsx(
            'px-4 py-2 transition-transform duration-300 ease-in-out',
            isActive
              ? clsx(
                  ACTIVE_VARIANTS[variant],
                  BORDER_COLORS[color],
                  TEXT_COLORS[color],
                  { [ROUNDS[radius]]: variant !== 'light' },
                  'animate-flip-in-x'
                )
              : INACTIVE_TEXT[color],
            tabDisabled || disabled
              ? 'opacity-50 cursor-not-allowed'
              : HOVER_COLORS[color]
          )

          return (
            <TabTag
              key={idx}
              ref={(el) => (tabsRef.current[idx] = el)}
              className={tabClasses}
              role='tab'
              aria-selected={isActive}
              aria-controls={`${idBase}-panel-${idx}`}
              id={`${idBase}-tab-${idx}`}
              onClick={() => onSelect(idx)}
              onKeyDown={(e) => onKeyDown(e, idx)}
              disabled={tabDisabled}
              href={href}
            >
              {label || (child.props as any).children}
            </TabTag>
          )
        })}
      </div>
      <div className={clsx('p-4', TEXT_COLORS[color])}>
        {Children.map(children, (child, idx) => (
          <div
            key={idx}
            role='tabpanel'
            id={`${idBase}-panel-${idx}`}
            aria-labelledby={`${idBase}-tab-${idx}`}
            hidden={idx !== activeIdx}
          >
            {idx === activeIdx && child.props.children}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Tabs)
