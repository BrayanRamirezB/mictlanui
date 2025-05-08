import { useRef, useState, useEffect } from 'react'

const AccordionItem = ({
  index,
  title,
  subtitle,
  content,
  isActive,
  toggle,
  styleVariant,
  color = 'default'
}) => {
  const contentRef = useRef(null)
  const [contentHeight, setContentHeight] = useState('0px')

  useEffect(() => {
    if (isActive && contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`)
    } else {
      setContentHeight('0px')
    }
  }, [isActive])

  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-md ',
    light: 'border-b-2',
    bordered: 'border rounded-sm',
    complete: 'border backdrop-blur-sm shadow-lg'
  }

  const bodyVariants = {
    default: 'backdrop-blur-md',
    light: 'bg-transparent dark:bg-transparent',
    bordered: 'border-x-[1px] ',
    complete: 'backdrop-blur-sm border-x-[1px]'
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/5',
    primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
    secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
    success: 'bg-green-400/50 dark:shadow-green-500/20 ',
    warning: 'bg-yellow-500/40 dark:shadow-yellow-500/20 ',
    danger: 'bg-red-500/40 dark:shadow-red-500/20'
  }

  const hoverColors = {
    default: 'hover:bg-white/50 dark:hover:bg-zinc-800',
    primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
    secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/20',
    success: 'hover:bg-green-500/60 dark:hover:bg-green-500/30',
    warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/30',
    danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
  }

  const borderColors = {
    default: 'border-zinc-700/20 dark:border-neutral-100/30',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
  }

  const variantClass = variants[styleVariant]
  const bodyVariantClass = bodyVariants[styleVariant]

  return (
    <div role='region' aria-labelledby={`accordion-heading-${index}`}>
      <h2 id={`accordion-heading-${index}`}>
        <button
          type='button'
          className={`flex items-center justify-between w-full py-2 px-3 font-medium gap-3 transition duration-300 text-zinc-800 dark:text-neutral-100 ${variantClass} ${
            styleVariant !== 'light' &&
            styleVariant !== 'bordered' &&
            colors[color]
          } ${styleVariant !== 'default' && borderColors[color]} ${
            hoverColors[color]
          }`}
          onClick={() => toggle(index)}
          aria-expanded={isActive}
          aria-controls={`accordion-body-${index}`}
          aria-label={`Toggle ${title}`}
        >
          <div className='w-full max-w-full'>
            <span className='flex justify-start items-center max-w-full'>
              {title}
            </span>
            {subtitle && (
              <p className='text-left text-sm font-light text-zinc-700 dark:text-neutral-200'>
                {subtitle}
              </p>
            )}
          </div>
          <svg
            data-accordion-icon
            className={`w-3 h-3 shrink-0 transition duration-300 ease-in ${
              isActive ? 'rotate-180' : ''
            }`}
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 10 6'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 5 5 1 1 5'
            />
          </svg>
        </button>
      </h2>

      <div
        ref={contentRef}
        id={`accordion-body-${index}`}
        style={{ maxHeight: contentHeight }}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${bodyVariantClass} ${
          styleVariant !== 'light' &&
          styleVariant !== 'bordered' &&
          colors[color]
        } ${styleVariant !== 'default' && borderColors[color]}`}
        role='region'
        aria-labelledby={`accordion-heading-${index}`}
      >
        <div className='p-5'>
          <p className='mb-2 text-zinc-700/70 dark:text-neutral-100/70'>
            {content}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AccordionItem
