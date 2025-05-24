import {
  useState,
  useRef,
  useEffect,
  type FC,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type CSSProperties,
  type ReactNode
} from 'react'
import clsx from 'clsx'

export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type Size = 'sm' | 'md' | 'lg'
export type Orientation = 'horizontal' | 'vertical'
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type LengthKey = Size | 'full'

interface SliderProps {
  min?: number
  max?: number
  step?: number
  value?: number
  showValue?: boolean
  onChange?: (value: number) => void
  label?: string
  startContent?: ReactNode
  endContent?: ReactNode
  disabled?: boolean
  orientation?: Orientation
  color?: Color
  textColor?: Color
  size?: Size
  sliderLength?: LengthKey
  thumbRadius?: Radius
  showThumb?: boolean
}

const COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/90 dark:bg-zinc-700/90',
  primary: 'bg-blue-500/40',
  secondary: 'bg-indigo-500/40',
  success: 'bg-green-500/40',
  warning: 'bg-yellow-500/40',
  danger: 'bg-red-500/40'
}

const THUMB_COLORS: Record<Color, string> = {
  default: 'bg-neutral-100 dark:bg-zinc-700',
  primary: 'bg-blue-500',
  secondary: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
}

const TEXT_COLORS: Record<Color, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-600',
  secondary: 'text-indigo-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600'
}

const THUMB_SIZES: Record<Size, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-7 h-7'
}

const VERTICAL_BAR_SIZES: Record<Size, string> = {
  sm: 'w-4',
  md: 'w-5',
  lg: 'w-7'
}

const HORIZONTAL_BAR_SIZES: Record<Size, string> = {
  sm: 'h-4',
  md: 'h-5',
  lg: 'h-7'
}

const THUMB_RADII: Record<Radius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const SLIDER_WIDTH: Record<LengthKey, string> = {
  sm: 'w-40',
  md: 'w-64',
  lg: 'w-96',
  full: 'w-full'
}

const SLIDER_HEIGHT: Record<LengthKey, string> = {
  sm: 'h-40',
  md: 'h-64',
  lg: 'h-96',
  full: 'h-full'
}

const Slider: FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value: initialValue = 0,
  showValue = true,
  onChange,
  label,
  startContent,
  endContent,
  disabled = false,
  orientation = 'horizontal',
  color = 'default',
  textColor = 'default',
  size = 'md',
  sliderLength = 'md',
  thumbRadius = 'full',
  showThumb = true
}) => {
  const [value, setValue] = useState<number>(initialValue ?? min)
  const [isDragging, setIsDragging] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [thumbHovering, setThumbHovering] = useState(false)
  const [thumbPressed, setThumbPressed] = useState(false)
  const [thumbFocused, setThumbFocused] = useState(false)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const thumbRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue)
    }
  }, [initialValue])

  const handleValueChange = (newValue: number) => {
    if (disabled) return
    setValue(newValue)
    onChange?.(newValue)
  }

  const calculatePercentage = () => ((value - min) / (max - min)) * 100

  const handleTrackClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (disabled || !trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const length = orientation === 'horizontal' ? rect.width : rect.height
    const clickPos =
      orientation === 'horizontal'
        ? e.clientX - rect.left
        : rect.bottom - e.clientY
    const percent = Math.max(0, Math.min(1, clickPos / length))
    let raw = min + percent * (max - min)
    let newValue = Math.round((raw - min) / step) * step + min
    newValue = Math.max(min, Math.min(max, parseFloat(newValue.toFixed(10))))
    handleValueChange(newValue)
  }

  const handleThumbDrag = (e: MouseEvent | TouchEvent) => {
    if (disabled || !trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const length = orientation === 'horizontal' ? rect.width : rect.height
    const clientPos =
      orientation === 'horizontal'
        ? ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left
        : rect.bottom - ('clientY' in e ? e.clientY : e.touches[0].clientY)
    const percent = Math.max(0, Math.min(1, clientPos / length))
    let raw = min + percent * (max - min)
    let newValue = Math.round((raw - min) / step) * step + min
    newValue = Math.max(min, Math.min(max, parseFloat(newValue.toFixed(10))))
    handleValueChange(newValue)
  }

  const handleThumbMouseUp = () => {
    if (disabled) return
    setIsDragging(false)
    setThumbPressed(false)
    document.removeEventListener('mousemove', handleThumbDrag)
    document.removeEventListener('mouseup', handleThumbMouseUp)
    document.removeEventListener('touchmove', handleThumbDrag)
    document.removeEventListener('touchend', handleThumbMouseUp)
  }

  const handleThumbMouseDown = (e: ReactMouseEvent) => {
    if (disabled) return
    setIsDragging(true)
    setThumbPressed(true)
    document.addEventListener('mousemove', handleThumbDrag)
    document.addEventListener('mouseup', handleThumbMouseUp)
  }

  const handleThumbTouchStart = (e: ReactTouchEvent) => {
    if (disabled) return
    setIsDragging(true)
    setThumbPressed(true)
    document.addEventListener('touchmove', handleThumbDrag)
    document.addEventListener('touchend', handleThumbMouseUp)
  }

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    let newValue = value
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        newValue = Math.min(value + step, max)
        break
      case 'ArrowDown':
      case 'ArrowLeft':
        newValue = Math.max(value - step, min)
        break
      default:
        return
    }
    handleValueChange(newValue)
  }

  const thumbStyle: CSSProperties = {
    [orientation === 'horizontal' ? 'left' : 'top']: `${
      orientation === 'vertical'
        ? 100 - calculatePercentage()
        : calculatePercentage()
    }%`
  }

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        orientation === 'horizontal' ? 'flex-col' : 'flex-col-reverse gap-y-4',
        TEXT_COLORS[textColor]
      )}
    >
      <div className='flex items-center'>
        {label && <span className='text-sm mr-2'>{label}</span>}
        {showValue && <span className='text-sm'>{value}</span>}
      </div>
      <div
        className={clsx(
          'flex justify-between items-center',
          orientation === 'horizontal'
            ? 'flex-row space-x-2'
            : 'flex-col space-y-2'
        )}
      >
        {startContent && (
          <span className='flex items-center justify-center'>
            {startContent}
          </span>
        )}
        <div
          className={clsx(
            'relative',
            orientation === 'horizontal'
              ? [SLIDER_WIDTH[sliderLength], 'h-10']
              : [SLIDER_HEIGHT[sliderLength], 'w-10'],
            hovering && 'data-hover',
            disabled && 'opacity-50'
          )}
          ref={trackRef}
          onClick={handleTrackClick}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          data-orientation={orientation}
        >
          <div
            className={clsx(
              'absolute',
              'backdrop-blur-sm',
              'shadow-md',
              'bg-neutral-100/20',
              'dark:bg-zinc-700/30',
              'dark:shadow-neutral-100/10',
              'rounded-md',
              orientation === 'horizontal'
                ? [
                    'top-1/2',
                    'left-0',
                    'w-full',
                    HORIZONTAL_BAR_SIZES[size],
                    '-translate-y-1/2'
                  ]
                : [
                    'left-1/2',
                    'top-0',
                    'h-full',
                    VERTICAL_BAR_SIZES[size],
                    '-translate-x-1/2'
                  ],
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            )}
          >
            <div
              className={clsx('absolute', COLORS[color], 'rounded-md', {
                'left-0 top-0 h-full': orientation === 'horizontal',
                'bottom-0 left-0 w-full': orientation === 'vertical'
              })}
              style={{
                [orientation === 'horizontal'
                  ? 'width'
                  : 'height']: `${calculatePercentage()}%`
              }}
            />
          </div>

          <div
            className={clsx(
              'absolute',
              'shadow-sm',
              orientation === 'horizontal'
                ? ['top-1/2', '-translate-y-1/2', '-translate-x-1/2', 'left-0']
                : ['left-1/2', '-translate-x-1/2', '-translate-y-1/2', 'top-0'],
              THUMB_SIZES[size],
              THUMB_RADII[thumbRadius],
              showThumb && [
                THUMB_COLORS[color],
                'border-2',
                'border-zinc-700/30',
                'dark:border-neutral-100/20'
              ],
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            )}
            style={thumbStyle}
            ref={thumbRef}
            onMouseDown={handleThumbMouseDown}
            onTouchStart={handleThumbTouchStart}
            onMouseEnter={() => setThumbHovering(true)}
            onMouseLeave={() => setThumbHovering(false)}
            onFocus={() => setThumbFocused(true)}
            onBlur={() => setThumbFocused(false)}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            role='slider'
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-orientation={orientation}
            aria-disabled={disabled}
            data-dragging={isDragging}
            data-hover={thumbHovering}
            data-pressed={thumbPressed}
            data-focus-visible={thumbFocused}
          />
        </div>
        {endContent && (
          <span className='flex items-center justify-center'>{endContent}</span>
        )}
      </div>
    </div>
  )
}

export default Slider
