const AccordionItem = ({
  index,
  title,
  subtitle,
  content,
  isActive,
  toggle,
  styleVariant
}) => {
  const variants = {
    default:
      'border-0 shadow-lg dark:shadow-neutral-100/5 backdrop-blur-md bg-neutral-100/20 dark:bg-zinc-700/30 hover:bg-white/50 dark:hover:bg-zinc-800 ',
    light: 'border-b-2 border-zinc-700/20 dark:border-neutral-100/30',
    bordered:
      'border rounded-sm border-zinc-700/20 dark:border-neutral-100/30 hover:bg-white/50 dark:hover:bg-zinc-800',
    complete:
      'border backdrop-blur-sm border-neutral-100/20 dark:border-zinc-700/20 bg-neutral-100/20 dark:bg-zinc-700/30 hover:bg-white/50 dark:hover:bg-zinc-800'
  }

  const bodyVariants = {
    default: 'backdrop-blur-md bg-neutral-200/30 dark:bg-zinc-700/20',
    light: 'bg-transparent dark:bg-transparent',
    bordered: 'border-x-[1px] border-zinc-700/20 dark:border-neutral-100/30',
    complete:
      'backdrop-blur-sm bg-neutral-100/20 dark:bg-zinc-700/30 border-x-[1px] border-neutral-100/20 dark:border-zinc-700/20'
  }

  const variantClass = variants[styleVariant]
  const bodyVariantClass = bodyVariants[styleVariant]

  return (
    <div>
      <h2 id={`accordion-heading-${index}`}>
        <button
          type='button'
          className={`flex items-center justify-between w-full py-2 px-3 font-medium gap-3 transition duration-300 text-gray-800 dark:text-gray-300 ${variantClass}  ${
            isActive ? 'rounded-t-xl' : ''
          } `}
          onClick={() => toggle(index)}
          aria-expanded={isActive}
          aria-controls={`accordion-body-${index}`}
        >
          <div className='w-full max-w-full'>
            <span className='flex justify-start items-center max-w-full'>
              {title}
            </span>
            {subtitle && (
              <p className='text-left text-sm font-light text-gray-500 dark:text-gray-400'>
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
        id={`accordion-body-${index}`}
        className={`overflow-hidden ${
          isActive ? '' : 'hidden'
        } p-5  ${bodyVariantClass}`}
      >
        <p className='mb-2 text-gray-600 dark:text-gray-500'>{content}</p>
      </div>
    </div>
  )
}

export default AccordionItem
