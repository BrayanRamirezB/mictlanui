import clsx from 'clsx'

const COLOR_STYLES = {
  default: 'bg-zinc-700/30 dark:bg-neutral-100/50',
  primary: 'bg-blue-500/50',
  secondary: 'bg-indigo-500/50',
  success: 'bg-green-500/60',
  warning: 'bg-yellow-500/60',
  danger: 'bg-red-500/50'
}

const Radio = ({
  value,
  isSelected = false,
  isDisabled = false,
  isReadOnly = false,
  children,
  description,
  onChange,
  color = 'default',
  className = '',
  ...props
}) => {
  const isInteractive = !isDisabled && !isReadOnly

  const handleChange = () => {
    if (isInteractive && onChange) {
      onChange(value)
    }
  }

  const handleKeyUp = (e) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      handleChange()
    }
  }

  const radioClasses = clsx(
    'flex items-center gap-3 transition-opacity',
    {
      'opacity-50 cursor-not-allowed': isDisabled,
      'cursor-pointer': isInteractive
    },
    className
  )

  const indicatorClasses = clsx(
    'size-5 rounded-full flex items-center justify-center',
    'transition-all duration-300 ease-in-out border-2',
    isSelected
      ? `${COLOR_STYLES[color]} border-transparent`
      : 'border-zinc-700/50 dark:border-neutral-100/50',
    {
      'hover:bg-zinc-700/20 dark:hover:bg-neutral-100/20':
        isInteractive && !isSelected
    }
  )

  return (
    <button
      {...props}
      role='radio'
      type='button'
      aria-checked={isSelected}
      aria-disabled={isDisabled || isReadOnly}
      tabIndex={isInteractive ? 0 : -1}
      onClick={handleChange}
      onKeyUp={handleKeyUp}
      className={radioClasses}
      disabled={isDisabled || isReadOnly}
    >
      <div className={indicatorClasses}>
        {isSelected && (
          <div
            className={clsx(
              'size-3 border-2 rounded-full border-transparent',
              COLOR_STYLES[color]
            )}
          />
        )}
      </div>

      <div className='text-left'>
        <span className='text-sm font-medium'>{children}</span>
        {description && (
          <p className='mt-1 text-sm font-light'>{description}</p>
        )}
      </div>
    </button>
  )
}

export default Radio
