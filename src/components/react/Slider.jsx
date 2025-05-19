import { useState, useRef, useEffect } from 'react'

const Slider = ({
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
  const [value, setValue] = useState(initialValue ?? min)
  const [isDragging, setIsDragging] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [thumbHovering, setThumbHovering] = useState(false)
  const [thumbPressed, setThumbPressed] = useState(false)
  const [thumbFocused, setThumbFocused] = useState(false)
  const trackRef = useRef(null)
  const thumbRef = useRef(null)

  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue)
    }
  }, [initialValue])

  const handleValueChange = (newValue) => {
    if (disabled) return
    setValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleTrackClick = (e) => {
    if (disabled) return
    if (!trackRef.current) return
    const trackRect = trackRef.current.getBoundingClientRect()
    const trackLength =
      orientation === 'horizontal' ? trackRect.width : trackRect.height
    const clickPos =
      orientation === 'horizontal'
        ? e.clientX - trackRect.left
        : trackRect.bottom - e.clientY
    const percent = Math.max(0, Math.min(1, clickPos / trackLength))
    let rawValue = min + percent * (max - min)
    let newValue = Math.round((rawValue - min) / step) * step + min
    newValue = Math.max(min, Math.min(max, parseFloat(newValue.toFixed(10))))
    handleValueChange(newValue)
  }

  const handleThumbMouseDown = (e) => {
    if (disabled) return
    setIsDragging(true)
    setThumbPressed(true)
    document.addEventListener('mousemove', handleThumbDrag)
    document.addEventListener('mouseup', handleThumbMouseUp)
  }

  const handleThumbTouchStart = (e) => {
    if (disabled) return
    setIsDragging(true)
    setThumbPressed(true)
    document.addEventListener('touchmove', handleThumbDrag)
    document.addEventListener('touchend', handleThumbMouseUp)
  }

  const handleThumbDrag = (e) => {
    if (disabled) return
    if (!trackRef.current) return
    const trackRect = trackRef.current.getBoundingClientRect()
    const trackLength =
      orientation === 'horizontal' ? trackRect.width : trackRect.height
    const clientPos =
      orientation === 'horizontal'
        ? (e.clientX ?? e.touches[0].clientX) - trackRect.left
        : trackRect.bottom - (e.clientY ?? e.touches[0].clientY)
    const percent = Math.max(0, Math.min(1, clientPos / trackLength))
    let rawValue = min + percent * (max - min)
    let newValue = Math.round((rawValue - min) / step) * step + min
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

  const handleKeyDown = (e) => {
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

  const calculatePercentage = () => {
    return ((value - min) / (max - min)) * 100
  }

  const thumbStyle = {
    [orientation === 'horizontal' ? 'left' : 'top']: `${
      orientation === 'vertical'
        ? 100 - calculatePercentage()
        : calculatePercentage()
    }%`
  }

  const colors = {
    default: 'bg-neutral-100/90 dark:bg-zinc-700/90',
    primary: 'bg-blue-500/40 ',
    secondary: 'bg-indigo-500/40 ',
    success: 'bg-green-500/40 ',
    warning: 'bg-yellow-500/40',
    danger: 'bg-red-500/40 '
  }

  const thumbColors = {
    default: 'bg-neutral-100 dark:bg-zinc-700',
    primary: 'bg-blue-500',
    secondary: 'bg-indigo-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-600',
    secondary: 'text-indigo-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  }

  const thumbSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  }

  const verticalBarSizes = {
    sm: 'w-4',
    md: 'w-5',
    lg: 'w-7'
  }

  const horizontalBarSizes = {
    sm: 'h-4',
    md: 'h-5',
    lg: 'h-7'
  }

  const thumbRadiuses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const sliderWidth = {
    sm: 'w-40',
    md: 'w-64',
    lg: 'w-96',
    full: 'w-full'
  }

  const sliderHeight = {
    sm: 'h-40',
    md: 'h-64',
    lg: 'h-96',
    full: 'h-full'
  }

  return (
    <div
      className={`flex items-center justify-center ${
        orientation === 'horizontal' ? 'flex-col' : 'flex-col-reverse gap-y-4'
      } ${textColors[textColor]}`}
    >
      <div className='flex items-center'>
        {label && <span className='text-sm mr-2'>{label}</span>}
        {showValue && <span className='text-sm'>{value}</span>}
      </div>
      <div
        className={`flex justify-between items-center  ${
          orientation === 'horizontal'
            ? 'flex-row space-x-2'
            : 'flex-col space-y-2'
        }`}
      >
        {startContent && (
          <span className='flex items-center justify-center'>
            {startContent}
          </span>
        )}
        <div
          className={`relative ${
            orientation === 'horizontal'
              ? `${sliderWidth[sliderLength]} h-10`
              : `${sliderHeight[sliderLength]} w-10`
          } ${hovering ? 'data-hover' : ''} ${disabled ? 'opacity-50' : ''}`}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          data-orientation={orientation}
        >
          <div
            className={`absolute ${
              orientation === 'horizontal'
                ? `top-1/2 left-0 w-full ${horizontalBarSizes[size]} -translate-y-1/2`
                : `left-1/2 top-0 h-full ${verticalBarSizes[size]} -translate-x-1/2`
            } backdrop-blur-sm shadow-md bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10 rounded-md ${
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            ref={trackRef}
            onClick={handleTrackClick}
          >
            <div
              className={`absolute ${
                orientation === 'horizontal'
                  ? 'left-0 top-0 h-full'
                  : 'bottom-0 left-0 w-full'
              } ${colors[color]} rounded-md`}
              style={{
                [orientation === 'horizontal'
                  ? 'width'
                  : 'height']: `${calculatePercentage()}%`
              }}
            ></div>
          </div>

          <div
            className={`absolute ${
              orientation === 'horizontal'
                ? 'top-1/2 -translate-y-1/2 -translate-x-1/2 left-0'
                : 'left-1/2 -translate-x-1/2 -translate-y-1/2 top-0'
            } ${thumbSizes[size]} ${thumbRadiuses[thumbRadius]} ${
              showThumb &&
              `${thumbColors[color]} border-2 border-zinc-700/30 dark:border-neutral-100/20`
            } shadow-sm ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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
          ></div>
        </div>
        {endContent && (
          <span className='flex items-center justify-center'>{endContent}</span>
        )}
      </div>
    </div>
  )
}

export default Slider
