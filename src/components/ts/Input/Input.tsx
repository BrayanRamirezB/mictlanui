import { type ChangeEvent } from 'react'

interface InputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  isRequired?: boolean
  isClearable?: boolean
  isInvalid?: boolean
  errorMessage?: string
  description?: string
  value?: string
  onValueChange: (value: string) => void
  minLength?: number
  maxLength?: number
  pattern?: string
  isReadOnly?: boolean
  isDisabled?: boolean
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg'
  id?: string
}

const Input = ({
  label,
  placeholder,
  type = 'text',
  isRequired = false,
  isClearable = false,
  isInvalid = false,
  errorMessage = '',
  description = '',
  value = '',
  onValueChange,
  minLength,
  maxLength,
  pattern,
  isReadOnly = false,
  isDisabled = false,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  size = 'md',
  id = ''
}: InputProps) => {
  const handleClear = () => {
    onValueChange('')
  }

  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-800 dark:text-blue-500',
    secondary: 'text-indigo-800 dark:text-indigo-500',
    success: 'text-green-800 dark:text-green-500',
    warning: 'text-yellow-800 dark:text-yellow-500',
    danger: 'text-red-800 dark:text-red-500'
  }

  const borderColors = {
    default: 'border-gray-600',
    primary: 'border-blue-600',
    secondary: 'border-indigo-600',
    success: 'border-green-600',
    warning: 'border-yellow-600',
    danger: 'border-red-600'
  }

  const sizes = {
    sm: 'text-xs px-2 py-1.5',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2.5'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  return (
    <div className={`flex flex-col space-y-2 ${textColors[color]}`}>
      {label && (
        <label htmlFor={id} className='text-sm font-medium'>
          {label}
          {isRequired && <span className='text-red-500'> *</span>}
        </label>
      )}

      <div className='relative'>
        <div
          className={`flex items-center ${variants[variant]} ${
            roundeds[rounded]
          } ${variant === 'default' && colors[color]} ${borderColors[color]} `}
        >
          <div className='flex-1 relative'>
            <input
              id={id}
              type={type}
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onValueChange(e.target.value)
              }
              required={isRequired}
              minLength={minLength}
              maxLength={maxLength}
              pattern={pattern}
              readOnly={isReadOnly}
              disabled={isDisabled}
              placeholder={placeholder}
              aria-invalid={isInvalid}
              aria-describedby={description ? `${id}-description` : undefined}
              className={`w-full focus:outline-none ${
                variant === 'light' && 'border-b-2'
              }  ${isInvalid && 'border-2 border-red-500'} ${
                roundeds[rounded]
              } ${sizes[size]}`}
            />

            {type !== 'password' && isClearable && value && (
              <button
                type='button'
                onClick={handleClear}
                aria-label='Clear input'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
              >
                <span className='text-gray-500 hover:text-gray-700'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='currentColor'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path
                      d='M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z'
                      fill='currentColor'
                      strokeWidth='0'
                    />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className='text-sm'>
        {description && (
          <p className='font-normal' id={`${id}-description`}>
            {description}
          </p>
        )}
        {isInvalid && errorMessage && (
          <p className='text-red-500'>{errorMessage}</p>
        )}
      </div>
    </div>
  )
}

export default Input
