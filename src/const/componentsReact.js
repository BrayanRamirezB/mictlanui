export const AccordionReact = `import { useState } from 'react'
import AccordionItem from './AccordionItem.jsx'

const Accordion = ({ items, multiple = false, styleVariant = 'default' }) => {
  const [activeIndexes, setActiveIndexes] = useState([])

  const toggleAccordion = (index) => {
    if (multiple) {
      setActiveIndexes((prevIndexes) =>
        prevIndexes.includes(index)
          ? prevIndexes.filter((i) => i !== index)
          : [...prevIndexes, index]
      )
    } else {
      setActiveIndexes((prevIndexes) =>
        prevIndexes.includes(index) ? [] : [index]
      )
    }
  }

  return (
    <div id='accordion' className='w-full'>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={item.title}
          subtitle={item.subtitle}
          content={item.content}
          isActive={activeIndexes.includes(index)}
          toggle={toggleAccordion}
          styleVariant={styleVariant}
        />
      ))}
    </div>
  )
}

export default Accordion
`

export const AccordionItemReact = `const AccordionItem = ({
    index,
    title,
    subtitle,
    content,
    isActive,
    toggle,
    styleVariant,
    color = 'default'
  }) => {
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
      <div>
        <h2 id={\`accordion-heading-\${index}\`}>
          <button
            type='button'
            className={\`flex items-center justify-between w-full py-2 px-3 font-medium gap-3 transition duration-300 text-zinc-800 dark:text-neutral-100 \${variantClass}  \${
    isActive ? 'rounded-t-xl' : ''
  } \${styleVariant !== 'light' && styleVariant !== 'bordered' && colors[color]} \${
    styleVariant !== 'default' && borderColors[color]
  } \${hoverColors[color]}\`}
            onClick={() => toggle(index)}
            aria-expanded={isActive}
            aria-controls={\`accordion-body-\${index}\`}
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
              className={\`w-3 h-3 shrink-0 transition duration-300 ease-in \${
                isActive ? 'rotate-180' : ''
              }\`}
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
          id={\`accordion-body-\${index}\`}
          className={\`overflow-hidden \${
            isActive ? '' : 'hidden'
          } p-5  \${bodyVariantClass} \${
    styleVariant !== 'light' && styleVariant !== 'bordered' && colors[color]
  } \${styleVariant !== 'default' && borderColors[color]} \`}
        >
          <p className='mb-2 text-zinc-700/70 dark:text-neutral-100/70'>
            {content}
          </p>
        </div>
      </div>
    )
  }
  
  export default AccordionItem
  `

export const AlertReact = `import { useState } from 'react'

const Alert = ({
  type = 'default',
  styleVariant = 'default',
  title,
  content,
  icon = true,
  dismissible = false
}) => {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  const typeAlert = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: ' text-blue-800 dark:text-blue-500',
    secondary: ' text-indigo-800 dark:text-indigo-500',
    success: 'text-green-800 dark:text-green-500',
    warning: 'text-yellow-800 dark:text-yellow-500',
    danger: ' text-red-800 dark:text-red-500'
  }

  const variants = {
    default: 'border-0 rounded-md shadow-lg backdrop-blur-sm',
    light:
      'border-t-4 border-current rounded-lg shadow-lg bg-transparent dark:bg-transparent',
    bordered:
      'border border-current rounded-lg shadow-md bg-transparent dark:bg-transparent',
    complete: 'border border-current rounded-lg shadow-lg backdrop-blur-md'
  }

  const colorType = {
    default: 'bg-neutral-100/40 dark:bg-zinc-700/60 dark:shadow-neutral-100/5',
    primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
    secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
    success: 'bg-green-400/50 dark:shadow-green-500/20 ',
    warning: 'bg-yellow-500/40 dark:shadow-yellow-500/20 ',
    danger: 'bg-red-500/40 dark:shadow-red-500/20'
  }

  const iconVar = {
    default: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='fill-white/80'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M12 2l.642 .005l.616 .017l.299 .013l.579 .034l.553 .046c4.687 .455 6.65 2.333 7.166 6.906l.03 .29l.046 .553l.041 .727l.006 .15l.017 .617l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.455 4.687 -2.333 6.65 -6.906 7.166l-.29 .03l-.553 .046l-.727 .041l-.15 .006l-.617 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.687 -.455 -6.65 -2.333 -7.166 -6.906l-.03 -.29l-.046 -.553l-.041 -.727l-.006 -.15l-.017 -.617l-.004 -.318v-.648l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.455 -4.687 2.333 -6.65 6.906 -7.166l.29 -.03l.553 -.046l.727 -.041l.15 -.006l.617 -.017c.21 -.003 .424 -.005 .642 -.005zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z' />
      </svg>
    ),
    primary: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='fill-blue-500/80'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M12 2l.642 .005l.616 .017l.299 .013l.579 .034l.553 .046c4.687 .455 6.65 2.333 7.166 6.906l.03 .29l.046 .553l.041 .727l.006 .15l.017 .617l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.455 4.687 -2.333 6.65 -6.906 7.166l-.29 .03l-.553 .046l-.727 .041l-.15 .006l-.617 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.687 -.455 -6.65 -2.333 -7.166 -6.906l-.03 -.29l-.046 -.553l-.041 -.727l-.006 -.15l-.017 -.617l-.004 -.318v-.648l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.455 -4.687 2.333 -6.65 6.906 -7.166l.29 -.03l.553 -.046l.727 -.041l.15 -.006l.617 -.017c.21 -.003 .424 -.005 .642 -.005zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z' />
      </svg>
    ),
    secondary: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='fill-indigo-500/80'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M12 2l.642 .005l.616 .017l.299 .013l.579 .034l.553 .046c4.687 .455 6.65 2.333 7.166 6.906l.03 .29l.046 .553l.041 .727l.006 .15l.017 .617l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.455 4.687 -2.333 6.65 -6.906 7.166l-.29 .03l-.553 .046l-.727 .041l-.15 .006l-.617 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.687 -.455 -6.65 -2.333 -7.166 -6.906l-.03 -.29l-.046 -.553l-.041 -.727l-.006 -.15l-.017 -.617l-.004 -.318v-.648l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.455 -4.687 2.333 -6.65 6.906 -7.166l.29 -.03l.553 -.046l.727 -.041l.15 -.006l.617 -.017c.21 -.003 .424 -.005 .642 -.005zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z' />
      </svg>
    ),
    success: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='fill-green-600 dark:fill-green-500/80'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z' />
      </svg>
    ),
    warning: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='fill-yellow-600 dark:fill-yellow-500/80'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z' />
      </svg>
    ),
    danger: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='fill-red-500/80'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M19 4a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-13v6a1 1 0 0 1 -.883 .993l-.117 .007a1 1 0 0 1 -.993 -.883l-.007 -.117v-16a1 1 0 0 1 .883 -.993l.117 -.007h14z' />
      </svg>
    )
  }
  const typeClass = typeAlert[type]
  const variantClass = variants[styleVariant]
  const iconClass = iconVar[type]
  const colorClass = colorType[type]

  return (
    <div
      className={\`flex items-center justify-center gap-4 py-2 px-4 my-2 \${typeClass} \${variantClass} \${
        styleVariant === 'default' || styleVariant === 'complete'
          ? colorClass
          : ''
      }\`}
    >
      {icon && (
        <div
          className={\`flex items-center justify-center self-center size-9 rounded-full \${
            styleVariant === 'bordered' ? \`bg-transparent\` : colorClass
          }\`}
        >
          {iconClass}
        </div>
      )}
      <div className='flex-1'>
        <strong className='block text-base font-semibold'>{title}</strong>
        {content && <p className='text-sm font-normal'>{content}</p>}
      </div>

      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className='p-1 transition duration-200 ease-in hover:bg-inherit'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='icon icon-tabler icons-tabler-outline icon-tabler-x'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M18 6l-12 12' />
            <path d='M6 6l12 12' />
          </svg>
        </button>
      )}
    </div>
  )
}

export default Alert
`

export const AvatarReact = `const Avatar = ({
    src,
    name = '',
    alt = '',
    size = 'lg',
    rounded = 'full',
    bordered = false,
    color = 'default',
    dot = false,
    dotColor = 'default',
    dotPosition = 'top-right'
  }) => {
    const sizes = {
      xs: 'size-6',
      sm: 'size-8',
      md: 'size-10',
      lg: 'size-12',
      xl: 'size-14',
      xxl: 'size-16',
      xxxl: 'size-20'
    }
  
    const roundeds = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-lg',
      lg: 'rounded-2xl',
      full: 'rounded-full'
    }
  
    const borderColors = {
      default: 'border-neutral-100 dark:border-zinc-700',
      primary: 'border-blue-500',
      secondary: 'border-indigo-500',
      success: 'border-green-500',
      warning: 'border-yellow-500',
      danger: 'border-red-500'
    }
  
    const backgroundColors = {
      default: 'bg-neutral-500/20 dark:bg-zinc-700/60 dark:shadow-zinc-700/20',
      primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
      secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
      success: 'bg-green-500/40 dark:shadow-green-500/20',
      warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 dark:shadow-yellow-500/20',
      danger: 'bg-red-500/20 dark:shadow-red-500/20'
    }
  
    const dotColors = {
      default: 'bg-neutral-500',
      primary: 'bg-blue-500',
      secondary: 'bg-indigo-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500'
    }
  
    const dotPositions = {
      'top-left': 'top-0 left-0 transform -translate-x-1/4 -translate-y-1/4',
      'top-right': 'top-0 right-0 transform translate-x-1/4 -translate-y-1/4',
      'bottom-left': 'bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4',
      'bottom-right': 'bottom-0 right-0 transform translate-x-1/4 translate-y-1/4'
    }
  
    const backgroundClass = backgroundColors[color]
    const borderClass = borderColors[color]
    const sizeClass = sizes[size]
    const roundedClass = roundeds[rounded]
    const dotPositionClass = dotPositions[dotPosition]
    const dotColorClass = dotColors[dotColor]
  
    return (
      <div className='relative inline-flex'>
        <div
          className={\`inline-flex items-center justify-center overflow-hidden \${
            bordered ? \`border-2 \${borderClass}\` : ''
          } \${sizeClass} \${roundedClass} \${
            src ? '' : \`backdrop-blur-xl shadow-lg \${backgroundClass}\`
          }\`}
          aria-label={alt || \`Avatar of \${name}\`}
        >
          {src ? (
            <img
              src={src}
              alt={alt || \`Avatar of \${name}\`}
              className='w-full h-full object-cover'
            />
          ) : name ? (
            <span className='font-medium text-gray-800 dark:text-gray-300 text-center'>
              {name}
            </span>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='icon icon-tabler icons-tabler-filled icon-tabler-user'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z' />
              <path d='M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z' />
            </svg>
          )}
        </div>
        {dot && (
          <span
            className={\`absolute w-3 h-3 \${dotColorClass} \${dotPositionClass} rounded-full\`}
          ></span>
        )}
      </div>
    )
  }
  
  export default Avatar
  `

export const BadgeReact = `const Badge = ({
    type = 'default',
    text = 'text',
    color = 'default',
    size = 'md',
    rounded = 'full',
    dot = false,
    dotColor = 'default',
    dotPosition = 'top-right',
    dotText,
    icon
  }) => {
    const types = {
      default: 'border-0 shadow-lg backdrop-blur-sm',
      bordered: 'border border-current shadow-lg ',
      icon: 'p-1 shadow-lg backdrop-blur-sm'
    }
  
    const sizes = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-3 py-1',
      lg: 'text-base px-4 py-1.5'
    }
  
    const roundeds = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-lg',
      lg: 'rounded-2xl',
      full: 'rounded-full'
    }
  
    const colors = {
      default: 'bg-neutral-100/20 dark:shadow-zinc-700/30',
      primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
      secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
      success: 'bg-green-500/40 dark:shadow-green-500/20',
      warning: 'bg-yellow-500/40 dark:shadow-yellow-500/20',
      danger: 'bg-red-500/20 dark:shadow-red-500/20'
    }
  
    const textColors = {
      default: 'text-gray-800 dark:text-gray-300',
      primary: 'text-blue-800 dark:text-blue-500',
      secondary: 'text-indigo-800 dark:text-indigo-500',
      success: 'text-green-800 dark:text-green-500',
      warning: 'text-yellow-800 dark:text-yellow-500',
      danger: 'text-red-800 dark:text-red-500'
    }
  
    const dotColors = {
      default: 'bg-neutral-500',
      primary: 'bg-blue-500',
      secondary: 'bg-indigo-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500'
    }
  
    const dotPositions = {
      'top-left': 'top-0 left-0 transform -translate-x-1/3 -translate-y-1/3',
      'top-right': 'top-0 right-0 transform translate-x-1/3 -translate-y-1/3',
      'bottom-left': 'bottom-0 left-0 transform -translate-x-1/3 translate-y-1/3',
      'bottom-right': 'bottom-0 right-0 transform translate-x-1/3 translate-y-1/3'
    }
  
    const typeClass = types[type]
    const sizeClass = sizes[size]
    const roundedClass = roundeds[rounded]
    const colorClass = colors[color]
    const textColorClass = textColors[color]
    const dotPositionClass = dotPositions[dotPosition]
    const dotColorClass = dotColors[dotColor]
  
    const content = () => {
      if (type === 'icon') {
        return icon ? (
          <span className='inline-block'>{icon}</span>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z' />
            <path d='M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z' />
          </svg>
        )
      }
  
      return text
    }
  
    return (
      <span
        className={\`relative inline-flex items-center justify-center font-medium \${sizeClass} \${roundedClass} \${
          type === 'bordered' ? \`bg-transparent\` : colorClass
        } \${textColorClass} \${typeClass}\`}
      >
        {content()}
        {dot && (
          <span
            className={\`absolute \${
              dotText ? 'px-1 rounded-md' : 'w-2.5 h-2.5 rounded-full'
            } \${dotColorClass} \${dotPositionClass} \`}
          >
            {dotText}
          </span>
        )}
      </span>
    )
  }
  
  export default Badge
  `

export const BreadcrumbItemReact = `const BreadcrumbItem = ({
    label,
    href,
    icon,
    selected = false,
    sizeClass = '',
    roundedClass = '',
    colorClass = '',
    onClick
  }) => {
    if (href) {
      return (
        <a
          href={href}
          onClick={(e) => onClick?.(e)}
          className={\`inline-flex items-center gap-1 cursor-pointer \${sizeClass} \${roundedClass} \${colorClass}
          \${
            selected ? 'font-bold' : 'font-normal'
          } transition duration-300 hover:text-opacity-50 dark:hover:text-opacity-50\`}
          aria-current={selected ? 'page' : undefined}
        >
          {icon && <span className='inline-block'>{icon}</span>}
          {label}
        </a>
      )
    }
  
    return (
      <button
        type='button'
        onClick={onClick}
        className={\`inline-flex items-center gap-1 cursor-pointer \${sizeClass} \${roundedClass} \${colorClass}
          \${
            selected ? 'font-bold' : 'font-normal'
          } transition duration-300 hover:text-opacity-50 dark:hover:text-opacity-50\`}
        aria-current={selected ? 'page' : undefined}
      >
        {icon && <span className='inline-block'>{icon}</span>}
        {label}
      </button>
    )
  }
  
  export default BreadcrumbItem
  `

export const BreadcrumbSeparatorReact = `const BreadcrumbSeparator = ({ separator, colorClass }) => (
    <span className={\`mx-1 \${colorClass}\`}>{separator}</span>
  )
  
  export default BreadcrumbSeparator`

export const BreadcrumbsReact = `import { useState } from 'react'
  import BreadcrumbItem from '@/components/react/Breadcrumbs/BreadcrumbItem'
  import BreadcrumbSeparator from '@/components/react/Breadcrumbs/BreadcrumbSeparator'
  
  const Breadcrumbs = ({
    items = [],
    variant = 'default',
    size = 'md',
    color = 'default',
    rounded = 'md',
    separator = '/',
    collapsible = false
  }) => {
    const [selected, setSelected] = useState(items[0]?.label)
  
    const variants = {
      default: 'border-0 shadow-lg backdrop-blur-sm',
      bordered: 'border shadow-lg bg-transparent',
      light: 'border-0 bg-transparent'
    }
  
    const sizes = {
      sm: 'text-xs px-2 py-1',
      md: 'text-sm px-3 py-1.5',
      lg: 'text-base px-4 py-2'
    }
  
    const roundeds = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full'
    }
  
    const colors = {
      default: 'bg-neutral-200/30 dark:bg-zinc-700/30 dark:shadow-zinc-700/20',
      primary: 'bg-blue-500/20 dark:shadow-blue-500/20',
      secondary: 'bg-indigo-500/20 dark:shadow-indigo-500/20',
      success: 'bg-green-500/20 dark:shadow-green-500/20',
      warning: 'bg-yellow-500/10 dark:bg-yellow-500/20 dark:shadow-yellow-500/20',
      danger: 'bg-red-500/20 dark:shadow-red-500/20'
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
      default: 'border-neutral-100/40 dark:border-zinc-700/60',
      primary: 'border-blue-500',
      secondary: 'border-indigo-500',
      success: 'border-green-500',
      warning: 'border-yellow-500',
      danger: 'border-red-500'
    }
  
    const sizeClass = sizes[size]
    const roundedClass = roundeds[rounded]
    const colorClass = colors[color]
    const variantClass = variants[variant]
    const textcolorClass = textColors[color]
    const borderClass = borderColors[color]
  
    const handleClick = (label) => {
      setSelected(label) // Actualiza el elemento seleccionado
    }
  
    const renderItem = (item, isLast) => (
      <div className='flex items-center' key={item.label}>
        <BreadcrumbItem
          label={item.label}
          href={item.href}
          icon={item.icon}
          selected={item.label === selected}
          sizeClass={sizeClass}
          roundedClass={roundedClass}
          colorClass={textcolorClass}
          onClick={() => handleClick(item.label)}
        />
        {!isLast && (
          <BreadcrumbSeparator
            separator={separator}
            colorClass={textcolorClass}
          />
        )}
      </div>
    )
  
    const renderCollapsed = () => {
      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      return (
        <>
          {renderItem(firstItem, false)}
          <span className={\`mx-2 \${textcolorClass}\`}>...</span>
          {renderItem(lastItem, true)}
        </>
      )
    }
  
    return (
      <nav className='flex flex-row mx-auto p-2' aria-label='Breadcrumb'>
        <ul
          className={\`flex mx-auto items-center gap-2 px-2 \${variantClass}  \${roundedClass}
          \${variant === 'bordered' ? \`\${borderClass}\` : \`\${colorClass}\`}\`}
        >
          {collapsible && items.length > 2
            ? renderCollapsed()
            : items.map((item, index) => (
                <li key={item.label}>
                  {renderItem(item, index === items.length - 1)}
                </li>
              ))}
        </ul>
      </nav>
    )
  }
  
  export default Breadcrumbs
  `

export const ButtonReact = `const Button = ({
    text,
    variant = 'default',
    disabled = false,
    size = 'md',
    rounded = 'md',
    color = 'default',
    isLoading = false,
    icon = false,
    iconOnly = false,
    onClick,
    children
  }) => {
    const variants = {
      default: 'border-0 shadow-md backdrop-blur-sm',
      bordered: 'border border-current shadow-md',
      light: '',
      complete: 'backdrop-blur-xl'
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
  
    const colors = {
      default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/5',
      primary: 'bg-blue-500/20',
      secondary: 'bg-indigo-500/20',
      success: 'bg-green-500/20',
      warning: 'bg-yellow-500/30',
      danger: 'bg-red-500/20'
    }
  
    const shadowColors = {
      default:
        'shadow-lg shadow-zinc-700/30 shadow-current dark:shadow-neutral-100/20',
      primary: 'shadow-lg shadow-blue-500/20',
      secondary: 'shadow-lg shadow-indigo-500/20 shadow-current',
      success: 'shadow-lg shadow-green-500/30 shadow-current ',
      warning: 'shadow-lg shadow-yellow-500/20 shadow-current',
      danger: 'shadow-lg shadow-red-500/20 shadow-current'
    }
  
    const textColors = {
      default: 'text-gray-800 dark:text-gray-300',
      primary: 'text-blue-800 dark:text-blue-600',
      secondary: 'text-indigo-800 dark:text-indigo-600',
      success: 'text-green-800 dark:text-green-600',
      warning: 'text-yellow-800 dark:text-yellow-600',
      danger: 'text-red-800 dark:text-red-500'
    }
  
    const iconColors = {
      default: 'fill-gray-800 dark:fill-gray-300',
      primary: 'fill-blue-800 dark:fill-blue-500',
      secondary: 'fill-indigo-800 dark:fill-indigo-500',
      success: 'fill-green-800 dark:fill-green-500',
      warning: 'fill-yellow-800 dark:fill-yellow-500',
      danger: 'fill-red-800 dark:fill-red-500'
    }
  
    const hoverColors = {
      default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10 ',
      primary: 'hover:bg-blue-500/30',
      secondary: 'hover:bg-indigo-500/40',
      success: 'hover:bg-green-500/50',
      warning: 'hover:bg-yellow-500/60',
      danger: 'hover:bg-red-500/30'
    }
  
    const buttonClasses = \`
        inline-flex items-center justify-center font-medium text-center 
        transition duration-300 
        \${variants[variant]} 
        \${sizes[size]} 
        \${roundeds[rounded]} 
        \${
          variant === 'bordered' || variant === 'light'
            ? \`bg-transparent\`
            : colors[color]
        }
        \${
          variant === 'complete'
            ? \`text-black dark:text-white \${shadowColors[color]}\`
            : textColors[color]
        }
        \${hoverColors[color]}
        \${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      \`
  
    return (
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={buttonClasses.trim()}
      >
        {isLoading && (
          <svg
            className={\`animate-spin mr-2 h-5 w-5 \${iconColors[color]}\`}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        )}
  
        {icon && !iconOnly && (
          <span className={\`mr-2 \${iconColors[color]}\`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
              className={\`\${iconColors[color]}\`}
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M15 2a1 1 0 0 1 .117 1.993l-.117 .007c-.693 0 -1.33 .694 -1.691 1.552a5.1 5.1 0 0 1 1.982 -.544l.265 -.008c2.982 0 5.444 3.053 5.444 6.32c0 3.547 -.606 5.862 -2.423 8.578c-1.692 2.251 -4.092 2.753 -6.41 1.234a.31 .31 0 0 0 -.317 -.01c-2.335 1.528 -4.735 1.027 -6.46 -1.27c-1.783 -2.668 -2.39 -4.984 -2.39 -8.532l.004 -.222c.108 -3.181 2.526 -6.098 5.44 -6.098c.94 0 1.852 .291 2.688 .792c.419 -1.95 1.818 -3.792 3.868 -3.792m-7.034 6.154c-1.36 .858 -1.966 2.06 -1.966 3.846a1 1 0 0 0 2 0c0 -1.125 .28 -1.678 1.034 -2.154a1 1 0 1 0 -1.068 -1.692' />
            </svg>
          </span>
        )}
  
        {!iconOnly && text}
  
        {iconOnly && (
          <span className={\`\${iconColors[color]}\`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
              className={\`\${iconColors[color]}\`}
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M15 2a1 1 0 0 1 .117 1.993l-.117 .007c-.693 0 -1.33 .694 -1.691 1.552a5.1 5.1 0 0 1 1.982 -.544l.265 -.008c2.982 0 5.444 3.053 5.444 6.32c0 3.547 -.606 5.862 -2.423 8.578c-1.692 2.251 -4.092 2.753 -6.41 1.234a.31 .31 0 0 0 -.317 -.01c-2.335 1.528 -4.735 1.027 -6.46 -1.27c-1.783 -2.668 -2.39 -4.984 -2.39 -8.532l.004 -.222c.108 -3.181 2.526 -6.098 5.44 -6.098c.94 0 1.852 .291 2.688 .792c.419 -1.95 1.818 -3.792 3.868 -3.792m-7.034 6.154c-1.36 .858 -1.966 2.06 -1.966 3.846a1 1 0 0 0 2 0c0 -1.125 .28 -1.678 1.034 -2.154a1 1 0 1 0 -1.068 -1.692' />
            </svg>
          </span>
        )}
        {children}
      </button>
    )
  }
  
  export default Button
  `

export const ButtonGroupReact = `const ButtonGroup = ({
    buttons,
    variant = 'default',
    color = 'default',
    size = 'md',
    rounded = 'md',
    disabled = false
  }) => {
    const variants = {
      default: 'border-0 shadow-md backdrop-blur-sm',
      bordered: 'border border-current',
      light: ''
    }
  
    const colors = {
      default: 'bg-neutral-100/20 dark:bg-zinc-700/30 ',
      primary: 'bg-blue-500/20 ',
      secondary: 'bg-indigo-500/20 ',
      success: 'bg-green-500/30 ',
      warning: 'bg-yellow-500/20 ',
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
  
    const iconColors = {
      default: 'fill-gray-800 dark:fill-gray-300',
      primary: 'fill-blue-800 dark:fill-blue-500',
      secondary: 'fill-indigo-800 dark:fill-indigo-500',
      success: 'fill-green-800 dark:fill-green-500',
      warning: 'fill-yellow-800 dark:fill-yellow-500',
      danger: 'fill-red-800 dark:fill-red-500'
    }
  
    const hoverColors = {
      default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10 ',
      primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
      secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/20',
      success: 'hover:bg-green-500/60 dark:hover:bg-green-500/30',
      warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/30',
      danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
    }
  
    const shadowColors = {
      default:
        'shadow-md shadow-zinc-700/30 shadow-current dark:shadow-neutral-100/20',
      primary: 'shadow-md shadow-blue-500/20 ',
      secondary: 'shadow-md shadow-indigo-500/20 ',
      success: 'shadow-md shadow-green-500/30  ',
      warning: 'shadow-md shadow-yellow-500/30 ',
      danger: 'shadow-md shadow-red-500/20 '
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
  
    const roundedS = {
      none: 'rounded-s-none',
      sm: 'rounded-s-sm',
      md: 'rounded-s-md',
      lg: 'rounded-s-lg',
      full: 'rounded-s-full'
    }
  
    const roundedE = {
      none: 'rounded-e-none',
      sm: 'rounded-e-sm',
      md: 'rounded-e-md',
      lg: 'rounded-e-lg',
      full: 'rounded-e-full'
    }
  
    const groupClass = \`
      \${variants[variant]} 
      \${sizes[size]}
      \${
        variant === 'bordered' || variant === 'light'
          ? \`bg-transparent\`
          : colors[color]
      }
        \${variant === 'default' && shadowColors[color]}
        \${textColors[color]}
        \${hoverColors[color]}
        \${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      \`
  
    return (
      <div
        className={\`inline-flex overflow-hidden \${
          variant === 'default' && shadowColors[color]
        } \${roundeds[rounded]}\`}
        role='group'
      >
        {buttons.map((button, index) => {
          return (
            <button
              key={index}
              type='button'
              className={\`inline-flex gap-x-1 items-center font-medium transition duration-300 \${groupClass}
                  \${
                    index === 0
                      ? roundedS[rounded]
                      : index === buttons.length - 1
                      ? roundedE[rounded]
                      : 'border-l-0'
                  }
                  \`}
              onClick={button.onClick}
            >
              {button.icon && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className={\`\${iconColors[color]}\`}
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M15 2a1 1 0 0 1 .117 1.993l-.117 .007c-.693 0 -1.33 .694 -1.691 1.552a5.1 5.1 0 0 1 1.982 -.544l.265 -.008c2.982 0 5.444 3.053 5.444 6.32c0 3.547 -.606 5.862 -2.423 8.578c-1.692 2.251 -4.092 2.753 -6.41 1.234a.31 .31 0 0 0 -.317 -.01c-2.335 1.528 -4.735 1.027 -6.46 -1.27c-1.783 -2.668 -2.39 -4.984 -2.39 -8.532l.004 -.222c.108 -3.181 2.526 -6.098 5.44 -6.098c.94 0 1.852 .291 2.688 .792c.419 -1.95 1.818 -3.792 3.868 -3.792m-7.034 6.154c-1.36 .858 -1.966 2.06 -1.966 3.846a1 1 0 0 0 2 0c0 -1.125 .28 -1.678 1.034 -2.154a1 1 0 1 0 -1.068 -1.692' />
                </svg>
              )}
              {button.label}
            </button>
          )
        })}
      </div>
    )
  }
  
  export default ButtonGroup
  `

export const CheckboxReact = `import { useState } from 'react'

const Checkbox = ({
  id,
  label,
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'lg',
  checked = false,
  disabled = false
}) => {
  const [isChecked, setIsChecked] = useState(checked)

  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const checkColors = {
    default: 'bg-neutral-100/50 dark:bg-zinc-700/50',
    primary: 'bg-blue-500/30 ',
    secondary: 'bg-indigo-500/30 ',
    success: 'bg-green-500/40 ',
    warning: 'bg-yellow-500/50 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/30 '
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
    default: 'border-gray-800 dark:border-gray-300',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
  }

  const hoverColors = {
    default: 'hover:bg-neutral-100 dark:hover:bg-zinc-700/20 ',
    primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
    secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
    success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
    warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
    danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
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

  const handleCheckboxChange = () => {
    !disabled && setIsChecked(!isChecked)
  }

  return (
    <div
      className={\`flex items-center \${roundeds[rounded]} \${variants[variant]} \${
        sizes[size]
      } \${variant === 'default' && colors[color]} \${
        variant !== 'light' && sizes[size]
      }
      \${variant === 'bordered' && borderColors[color]}\`}
    >
      <div
        id={id}
        className={\`relative w-5 h-5 flex items-center justify-center transition duration-300 ease-in \${
          checkColors[color]
        } \${roundeds[rounded]} \${textColors[color]} cursor-pointer \${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : !isChecked && hoverColors[color]
        }\`}
        role='checkbox'
        aria-checked={isChecked}
        onClick={handleCheckboxChange}
      >
        {isChecked && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M5 12l5 5l10 -10' />
          </svg>
        )}
      </div>
      <label
        htmlFor={id}
        onClick={handleCheckboxChange}
        className={\`ms-2 cursor-pointer \${textColors[color]}\`}
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox
`

export const CheckboxGroupReact = `import { useState } from 'react'
import Checkbox from '@/components/react/Checkbox'

const CheckboxGroup = ({
  title = '',
  checkboxes = [],
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md',
  orientation = 'horizontal'
}) => {
  const [checkboxStates, setCheckboxStates] = useState(
    checkboxes.map((checkbox) => ({ ...checkbox }))
  )

  const handleCheckboxChange = (id) => {
    const updatedStates = checkboxStates.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    )
    setCheckboxStates(updatedStates)
    if (onChange) onChange(updatedStates)
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
    default: 'border-gray-800 dark:border-gray-300',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
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
    lg: 'rounded-lg'
  }

  return (
    <div
      className={\`flex flex-col gap-2 \${variants[variant]} \${sizes[size]} \${
        variant === 'default' && colors[color]
      } \${variant === 'bordered' && borderColors[color]} \${textColors[color]} \${
        variant !== 'light' && roundeds[rounded]
      }\`}
    >
      {title && <h3 className='text-lg font-semibold'>{title}</h3>}
      <div
        className={\`flex gap-2 \${
          orientation === 'vertical' ? 'flex-col' : 'flex-row'
        }\`}
      >
        {checkboxStates.map(({ id, label, checked, disabled }) => (
          <Checkbox
            key={id}
            id={id}
            label={label}
            checked={checked}
            disabled={disabled}
            variant='light'
            color={color}
            size={size}
            onChange={() => handleCheckboxChange(id)}
          />
        ))}
      </div>
    </div>
  )
}

export default CheckboxGroup
`

export const CodeReact = `import { useState } from 'react'

const Code = ({
  codeString,
  language = 'bash',
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md'
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
    default: 'border-gray-800 dark:border-gray-300',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
  }

  const hoverColors = {
    default: 'hover:bg-neutral-100 dark:hover:bg-zinc-700/50 ',
    primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
    secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
    success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
    warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
    danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
  }

  const sizes = {
    sm: 'text-xs px-1 py-1',
    md: 'text-sm px-2 py-1.5',
    lg: 'text-base px-4 py-2',
    xl: 'text-base px-6 py-2.5'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  return (
    <div
      className={\`inline-flex justify-around items-center gap-x-4 overflow-auto
        \${variants[variant]}
        \${sizes[size]}
        \${roundeds[rounded]}
        \${variant === 'bordered' && borderColors[color]}
        \${variant === 'default' && colors[color]}
        \${textColors[color]}
        \`}
    >
      <pre className=''>
        <code className={\`language-\${language}\`}>{codeString}</code>
      </pre>

      <button
        onClick={handleCopy}
        className={\`flex text-white px-1.5 py-1 rounded-lg transition duration-300 ease-out \${hoverColors[color]}\`}
      >
        {copied ? (
          <span className='inline-flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className={\`size-4 \${textColors[color]}\`}
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path stroke='none' d='M0 0h24v24H0z' />
              <path d='M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' />
              <path d='M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1' />
              <path d='M11 14l2 2l4 -4' />
            </svg>
          </span>
        ) : (
          <span className='inline-flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className={\`size-4 \${textColors[color]}\`}
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' />
              <path d='M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1' />
            </svg>
          </span>
        )}
      </button>
    </div>
  )
}

export default Code
`

export const DateInputReact = `import { useState, useRef } from 'react'

const DateInput = ({
  label = '',
  value = '',
  variant = 'default',
  color = 'default',
  rounded = 'md',
  size = 'md',
  icon = true,
  disabled = false
}) => {
  const [selectedDate, setSelectedDate] = useState(value)
  const datePickerRef = useRef(null)

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
    default: 'border-gray-800 dark:border-gray-300',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
  }

  const hoverColors = {
    default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/50 ',
    primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
    secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
    success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
    warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
    danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
  }

  const sizes = {
    sm: 'text-xs p-2',
    md: 'text-sm p-3',
    lg: 'text-base p-4'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const handleDateChange = (e) => {
    const newDate = e.target.value
    setSelectedDate(newDate)
  }

  return (
    <div
      className={\`flex flex-col gap-2 \${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } \${sizes[size]} \${variants[variant]} \${
        variant === 'default' && colors[color]
      }
      \${variant === 'bordered' && borderColors[color]}
      \${roundeds[rounded]}
      transition duration-300 ease-in 
      \${hoverColors[color]}
      \`}
    >
      {label && <label className={\`\${textColors[color]}\`}>{label}</label>}
      <div
        className={\`w-full flex items-center cursor-pointer \${textColors[color]} \`}
        onClick={() => !disabled && datePickerRef.current?.showPicker()}
      >
        <input
          type='date'
          ref={datePickerRef}
          value={selectedDate}
          onChange={handleDateChange}
          disabled={disabled}
          className={\`w-full bg-transparent focus:outline-none custom-date-input cursor-pointer\`}
        />
        {icon && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='size-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8 7V3m8 4V3m-9 9h10m-4 8h4a2 2 0 002-2v-7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2h4z'
            />
          </svg>
        )}
      </div>
    </div>
  )
}

export default DateInput
`

export const ImageReact = `const Image = ({
    imageSrc,
    alt = 'img preview',
    zoomedWrapper,
    filter,
    rounded = 'md',
    shadow = 'md',
    className
  }) => {
    const filters = {
      none: '',
      blur: 'blur-lg',
      grayscale: 'grayscale',
      sepia: 'sepia'
    }
  
    const roundeds = {
      none: 'rounded-none',
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-2xl',
      full: 'rounded-full'
    }
  
    const shadows = {
      none: 'shadow-none',
      sm: 'shadow-xs',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl'
    }
  
    const zoomed = zoomedWrapper
      ? 'transition-transform duration-500 ease-in-out transform group-hover:scale-110'
      : ''
  
    return (
      <div className={\`relative\`}>
        <div
          className={\`overflow-hidden group \${roundeds[rounded]} \${shadows[shadow]} dark:shadow-neutral-100/20\`}
        >
          <img
            src={imageSrc}
            alt={alt}
            className={\`object-cover \${filters[filter]} \${
              filter !== 'blur' && zoomed
            } \${roundeds[rounded]} \${
              className === '' && 'w-full h-full'
            } \${className}\`}
          />
  
          {filter === 'blur' && (
            <div className={\`absolute inset-0 flex items-center justify-center\`}>
              <img
                src={imageSrc}
                alt={alt}
                className={\`size-6/7 object-cover shadow-lg \${
                  roundeds[rounded]
                } \${filter === 'blur' && zoomed}\`}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
  
  export default Image
  `

export const LinkReact = `const Link = ({
    variant = 'light',
    color = 'default',
    rounded = 'md',
    isDisabled = false,
    size = 'md',
    underline = 'hover',
    isExternal = false,
    defaultIcon = false,
    children,
    href = '#'
  }) => {
    const variants = {
      default: 'border-0 shadow-md backdrop-blur-sm px-3 py-1',
      bordered: 'border shadow-lg px-3 py-1',
      light: ''
    }
  
    const colors = {
      default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10',
      primary: 'bg-blue-500/20 ',
      secondary: 'bg-indigo-500/20 ',
      success: 'bg-green-500/30 ',
      warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 ',
      danger: 'bg-red-500/20 '
    }
  
    const textColors = {
      default: 'text-gray-800 dark:text-gray-300',
      primary: 'text-blue-800 dark:text-blue-600',
      secondary: 'text-indigo-800 dark:text-indigo-600',
      success: 'text-green-800 dark:text-green-600',
      warning: 'text-yellow-800 dark:text-yellow-600',
      danger: 'text-red-800 dark:text-red-500'
    }
  
    const borderColors = {
      default: 'border-gray-800 dark:border-gray-300',
      primary: 'border-blue-800 dark:border-blue-500',
      secondary: 'border-indigo-800 dark:border-indigo-500',
      success: 'border-green-800 dark:border-green-500',
      warning: 'border-yellow-800 dark:border-yellow-500',
      danger: 'border-red-800 dark:border-red-500'
    }
  
    const sizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }
  
    const iconSizeStyles = {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6'
    }
  
    const roundeds = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full'
    }
  
    const underlineStyles = {
      none: 'no-underline',
      hover: 'hover:underline',
      always: 'underline',
      active: 'active:underline'
    }
  
    const disabledStyles = isDisabled
      ? 'opacity-50 cursor-not-allowed pointer-events-none'
      : ''
  
    const className = \`flex items-center justify-center text-center gap-2 transition-colors duration-200 \${
      variants[variant]
    } \${variant === 'default' && colors[color]} \${sizeStyles[size]} \${
      textColors[color]
    } \${variant === 'bordered' && borderColors[color]} \${
      variant !== 'light' && roundeds[rounded]
    } \${underlineStyles[underline]} \${disabledStyles}\`
  
    return (
      <a
        className={className}
        target={\`\${isExternal ? '_blank' : ''}\`}
        rel={\`\${isExternal ? 'noopener noreferrer' : ''}\`}
        href={href}
      >
        {children}
        {defaultIcon && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={iconSizeStyles[size]}
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M9 15l6 -6' />
            <path d='M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464' />
            <path d='M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463' />
          </svg>
        )}
      </a>
    )
  }
  
  export default Link
  `

export const SliderReact = `import { useState, useRef, useEffect } from 'react'

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
    const newValue =
      Math.round(min + ((clickPos / trackLength) * (max - min)) / step) * step
    handleValueChange(Math.max(min, Math.min(max, newValue)))
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
    const newValue =
      Math.round(min + ((clientPos / trackLength) * (max - min)) / step) * step
    handleValueChange(Math.max(min, Math.min(max, newValue)))
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

  const calculatePercentage = () => {
    return ((value - min) / (max - min)) * 100
  }

  const thumbStyle = {
    [orientation === 'horizontal' ? 'left' : 'top']: \`\${
      orientation === 'vertical'
        ? 100 - calculatePercentage()
        : calculatePercentage()
    }%\`
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
      className={\`flex items-center justify-center \${
        orientation === 'horizontal' ? 'flex-col' : 'flex-col-reverse gap-y-4'
      } \${textColors[textColor]}\`}
    >
      <div className='flex items-center'>
        {label && <span className='text-sm mr-2'>{label}</span>}
        {showValue && <span className='text-sm'>{value}</span>}
      </div>
      <div
        className={\`flex justify-between items-center  \${
          orientation === 'horizontal'
            ? 'flex-row space-x-2'
            : 'flex-col space-y-2'
        }\`}
      >
        {startContent && (
          <span className='flex items-center justify-center'>
            {startContent}
          </span>
        )}
        <div
          className={\`relative \${
            orientation === 'horizontal'
              ? \`\${sliderWidth[sliderLength]} h-10\`
              : \`\${sliderHeight[sliderLength]} w-10\`
          } \${hovering ? 'data-hover' : ''} \${disabled ? 'opacity-50' : ''}\`}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          data-orientation={orientation}
        >
          <div
            className={\`absolute \${
              orientation === 'horizontal'
                ? \`top-1/2 left-0 w-full \${horizontalBarSizes[size]} -translate-y-1/2\`
                : \`left-1/2 top-0 h-full \${verticalBarSizes[size]} -translate-x-1/2\`
            } backdrop-blur-sm shadow-md bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10 rounded-md \${
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }\`}
            ref={trackRef}
            onClick={handleTrackClick}
          >
            <div
              className={\`absolute \${
                orientation === 'horizontal'
                  ? 'left-0 top-0 h-full'
                  : 'bottom-0 left-0 w-full'
              } \${colors[color]} rounded-md\`}
              style={{
                [orientation === 'horizontal'
                  ? 'width'
                  : 'height']: \`\${calculatePercentage()}%\`
              }}
            ></div>
          </div>

          <div
            className={\`absolute \${
              orientation === 'horizontal'
                ? 'top-1/2 -translate-y-1/2 -translate-x-1/2 left-0'
                : 'left-1/2 -translate-x-1/2 -translate-y-1/2 top-0'
            } \${thumbSizes[size]} \${thumbRadiuses[thumbRadius]} \${
              showThumb &&
              \`\${thumbColors[color]} border-2 border-zinc-700/30 dark:border-neutral-100/20\`
            } shadow-sm \${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}\`}
            style={thumbStyle}
            ref={thumbRef}
            onMouseDown={handleThumbMouseDown}
            onTouchStart={handleThumbTouchStart}
            onMouseEnter={() => setThumbHovering(true)}
            onMouseLeave={() => setThumbHovering(false)}
            onFocus={() => setThumbFocused(true)}
            onBlur={() => setThumbFocused(false)}
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
`

export const SpinnerReact = `const Spinner = ({
    label,
    variant = 'default',
    size = 'md',
    color = 'default',
    textColor = 'default'
  }) => {
    const variants = {
      default: 'backdrop-blur-sm shadow-lg',
      light: ''
    }
  
    const sizes = {
      xs: 'size-4',
      sm: 'size-6',
      md: 'size-8',
      lg: 'size-10',
      xl: 'size-12'
    }
  
    const firstCircleColors = {
      default: 'border-zinc-500',
      primary: 'border-blue-500',
      secondary: 'border-indigo-500',
      success: 'border-green-500',
      warning: 'border-yellow-500',
      danger: 'border-red-500'
    }
  
    const secondCircleColors = {
      default: 'border-zinc-400',
      primary: 'border-blue-300',
      secondary: 'border-indigo-300',
      success: 'border-green-300',
      warning: 'border-yellow-300',
      danger: 'border-red-300'
    }
  
    const textColors = {
      default: 'text-gray-800 dark:text-gray-300',
      primary: 'text-blue-800 dark:text-blue-600',
      secondary: 'text-indigo-800 dark:text-indigo-600',
      success: 'text-green-800 dark:text-green-600',
      warning: 'text-yellow-800 dark:text-yellow-600',
      danger: 'text-red-800 dark:text-red-500'
    }
  
    return (
      <div className='flex flex-col items-center justify-center space-y-2'>
        <div className='relative'>
          <div
            className={\`relative rounded-full \${variants[variant]} \${sizes[size]}\`}
          >
            <div
              className={\`absolute w-full h-full rounded-full border-4 border-t-transparent border-r-transparent border-l-transparent \${firstCircleColors[color]} animate-spin\`}
            ></div>
            <div
              className={\`absolute w-full h-full rounded-full border-4 border-t-transparent border-b-transparent border-l-transparent \${secondCircleColors[color]} animate-spin\`}
            ></div>
          </div>
        </div>
        {label && (
          <span className={\`text-sm \${textColors[textColor]}\`}>{label}</span>
        )}
      </div>
    )
  }
  
  export default Spinner
  `

export const SwitchReact = `import { useState, useEffect } from 'react'

const Switch = ({
  label,
  startContent,
  endContent,
  thumbIcon,
  isSelected: initialSelected = false,
  isReadOnly = false,
  isDisabled = false,
  color = 'default',
  textColor = 'default',
  rounded = 'full',
  size = 'md'
}) => {
  const [isSelected, setIsSelected] = useState(initialSelected)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setIsSelected(initialSelected)
  }, [initialSelected])

  const handleToggle = () => {
    if (!isReadOnly && !isDisabled) {
      setIsSelected(!isSelected)
    }
  }

  const handleMouseEnter = () => {
    if (!isReadOnly && !isDisabled) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleInputChange = (e) => {
    if (!isReadOnly && !isDisabled) {
      setIsSelected(e.target.checked)
    }
  }

  const colors = {
    default: 'bg-zinc-700/30 dark:bg-neutral-100/20 dark:shadow-zinc-700/20',
    primary: 'bg-blue-500/50',
    secondary: 'bg-indigo-500/50 ',
    success: 'bg-green-500/50 ',
    warning: 'bg-yellow-500/50 ',
    danger: 'bg-red-500/50 '
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-800 dark:text-blue-600',
    secondary: 'text-indigo-800 dark:text-indigo-600',
    success: 'text-green-800 dark:text-green-600',
    warning: 'text-yellow-800 dark:text-yellow-600',
    danger: 'text-red-800 dark:text-red-500'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const sizes = {
    sm: 'h-6 w-11',
    md: 'h-8 w-16',
    lg: 'h-9 w-16',
    xl: 'h-10 w-20'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const circleSizes = {
    sm: 'size-5',
    md: 'size-6',
    lg: 'size-7',
    xl: 'size-9'
  }

  const circleTranslate = {
    sm: 'translate-x-4',
    md: 'translate-x-8',
    lg: 'translate-x-7',
    xl: 'translate-x-9'
  }

  const contentSizes = {
    sm: 'text-sm size-5',
    md: 'text-base size-6',
    lg: 'text-lg size-7',
    xl: 'text-xl size-9'
  }

  return (
    <div
      className={\`flex items-center space-x-2 \${
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }\`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggle}
    >
      {label && (
        <span className={\`\${textSizes[size]} \${textColors[textColor]}\`}>
          {label}
        </span>
      )}
      <div
        className={\`flex items-center border-0 shadow-xl backdrop-blur-md transition-colors \${
          isSelected ? colors[color] : 'bg-gray-300'
        } \${isHovered ? colors[color] : ''}
        \${roundeds[rounded]} 
        \${sizes[size]} \`}
      >
        <input
          type='checkbox'
          className='hidden'
          checked={isSelected}
          onChange={handleInputChange}
          readOnly={isReadOnly}
          disabled={isDisabled}
        />
        <div className='flex items-center justify-between w-full px-1'>
          {startContent && (
            <span
              className={\`flex items-center justify-center \${contentSizes[size]}\`}
            >
              {startContent}
            </span>
          )}
          <div
            className={\`absolute bg-neutral-100 shadow-lg transform transition-transform \${
              isSelected ? circleTranslate[size] : 'translate-x-0'
            } \${circleSizes[size]} \${roundeds[rounded]}\`}
          >
            {thumbIcon && (
              <span
                className={\`flex items-center justify-center \${contentSizes[size]}\`}
              >
                {thumbIcon}
              </span>
            )}
          </div>
          {endContent && (
            <span
              className={\`flex items-center justify-center \${contentSizes[size]}\`}
            >
              {endContent}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Switch
`

export const TextareaReact = `import { useState } from 'react'

const Textarea = ({
  label,
  placeholder = '',
  description,
  errorMessage,
  isRequired = false,
  isReadOnly = false,
  isDisabled = false,
  defaultValue = '',
  onChange: externalOnChange,
  variant = 'default',
  ...props
}) => {
  const [value, setValue] = useState(defaultValue)
  const [isInvalid, setIsInvalid] = useState(false)

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)

    if (newValue === '' && isRequired) {
      setIsInvalid(true)
    }

    if (externalOnChange) {
      externalOnChange(e)
    }
  }

  const [isFocused, setFocused] = useState(false)
  const [isFocusVisible, setFocusVisible] = useState(false)

  const handleFocus = (e) => {
    setFocused(true)
    setFocusVisible(e.type === 'focus')
  }
  const handleBlur = () => {
    setFocused(false)
    setFocusVisible(false)
  }

  const variants = {
    default: 'border-0 shadow-md backdrop-blur-sm',
    bordered: 'border bg-transparent',
    light: 'bg-transparent'
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    danger: 'bg-red-500/20'
  }

  const borderColors = {
    default: 'border-gray-800 dark:border-gray-300'
  }

  const textColors = {
    default:
      'text-zinc-800 dark:text-neutral-100 placeholder-zinc-800/30 dark:placeholder-neutral-100/30',
    danger: 'text-red-800 dark:text-red-500'
  }

  const baseClasses = \`
    flex flex-col space-y-2
    \${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
  \`

  const inputClasses = \`
    w-full p-2 rounded-lg transition focus:outline-none
    \${variants[variant]}
    \${variant === 'default' && colors['default']}
    \${textColors['default']}
    \${variant === 'bordered' && borderColors['default']}
    \${isInvalid ? colors['danger'] : ''}
    \${isFocused && isFocusVisible ? 'ring-2 ring-blue-500' : ''}
    \${isDisabled ? 'bg-gray-100' : ''}
  \`

  return (
    <div
      className={baseClasses}
      data-invalid={isInvalid}
      data-required={isRequired}
      data-readonly={isReadOnly}
      data-focus={isFocused}
      data-focus-visible={isFocusVisible}
      data-disabled={isDisabled}
    >
      <div className='headerWrapper'>
        {label && (
          <label
            className={\`label text-sm font-medium \${textColors['default']}\`}
          >
            {label}
            {isRequired && <span className={\`\${textColors['danger']}\`}>*</span>}
          </label>
        )}
      </div>

      <div className='inputWrapper'>
        <textarea
          className={inputClasses}
          aria-invalid={isInvalid}
          aria-required={isRequired}
          aria-readonly={isReadOnly}
          aria-disabled={isDisabled}
          aria-describedby={description ? 'description' : undefined}
          aria-errormessage={errorMessage ? 'errorMessage' : undefined}
          disabled={isDisabled}
          readOnly={isReadOnly}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          {...props}
        />
      </div>

      {description && (
        <div
          id='description'
          className={\`description text-sm \${textColors['default']}\`}
        >
          {description}
        </div>
      )}

      {isInvalid && errorMessage && (
        <div
          id='errorMessage'
          className={\`errorMessage text-sm \${textColors['danger']}\`}
        >
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default Textarea
`

export const TooltipReact = `import { useState, useEffect } from 'react'

const Tooltip = ({
  children,
  content,
  color = 'default',
  rounded = 'md',
  placement = 'top',
  isDisabled = false,
  delay = 300
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    let timeoutId

    if (isHovered && !isDisabled) {
      timeoutId = setTimeout(() => setIsOpen(true), delay)
    } else {
      setIsOpen(false)
    }

    return () => clearTimeout(timeoutId)
  }, [isHovered, isDisabled, delay])

  const positions = {
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

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-describedby={isOpen ? 'tooltip-content' : undefined}
      className='relative flex items-center'
    >
      {isOpen && !isDisabled && (
        <div
          id='tooltip-content'
          role='tooltip'
          data-open={isOpen}
          data-placement={placement}
          data-disabled={isDisabled}
          className={\`absolute z-50 border-0 shadow-md backdrop-blur-sm \${positions[placement]} whitespace-nowrap text-sm px-3 py-1 
          \${roundeds[rounded]}
          \${textColors[color]}
          \${colors[color]}
          \`}
        >
          {content}
        </div>
      )}
      {children}
    </div>
  )
}

export default Tooltip
`

export const UserReact = `import Avatar from '@/components/react/Avatar'

const User = ({
  avatarSrc,
  avatarAlt,
  avatarSize,
  avatarRounded,
  avatarBordered,
  avatarColor,
  avatarDot,
  avatarDotColor,
  avatarDotPosition,
  name = '',
  description = '',
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md'
}) => {
  const variants = {
    default: 'border-0 shadow-md backdrop-blur-sm',
    bordered: 'border border-current',
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

  const sizes = {
    xs: 'p-1 space-x-2',
    sm: 'p-2 space-x-3',
    md: 'p-3 space-x-4',
    lg: 'p-4 space-x-5',
    xl: 'p-5 space-x-6'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-2xl',
    full: 'rounded-full'
  }

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div
      className={\`base flex items-center \${variants[variant]} 
        \${sizes[size]} 
        \${roundeds[rounded]} 
        \${textColors[color]}
        \${variant === 'default' && colors[color]}
        \${textSizes[size]}
      \`}
    >
      <Avatar
        src={avatarSrc}
        name={name}
        alt={avatarAlt}
        size={avatarSize}
        rounded={avatarRounded}
        bordered={avatarBordered}
        color={avatarColor}
        dot={avatarDot}
        dotColor={avatarDotColor}
        dotPosition={avatarDotPosition}
      />
      <div className='wrapper'>
        <div className={\`font-semibold\`}>{name}</div>
        <div className={\`font-normal\`}>{description}</div>
      </div>
    </div>
  )
}

export default User
`

export const CardReact = `const Card = ({
  children,
  color = 'default',
  imgBackground,
  isLink = false,
  href,
  rounded = 'md',
  border = false,
  shadow = 'md',
  maxWidth = 'sm',
  padding = 'none',
  height = 'auto',
  className = ''
}) => {
  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 ',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const hoverColors = {
    default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10 ',
    primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
    secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/20',
    success: 'hover:bg-green-500/60 dark:hover:bg-green-500/30',
    warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/30',
    danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
  }

  const shadowSizes = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    xxl: 'shadow-2xl'
  }

  const borderColors = {
    default: 'border-neutral-100/40 dark:border-zinc-700/60',
    primary: 'border-blue-500',
    secondary: 'border-indigo-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    danger: 'border-red-500'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const maxWidths = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    xxl: 'max-w-2xl',
    xxxl: 'max-w-3xl',
    ivxl: 'max-w-4xl',
    vxl: 'max-w-5xl',
    vixl: 'max-w-6xl'
  }

  const paddings = {
    none: 'p-0',
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
    xxl: 'p-12',
    xxxl: 'p-16',
    ivxl: 'p-20',
    vxl: 'p-24',
    vixl: 'p-28'
  }

  const heights = {
    auto: 'h-auto',
    screen: 'h-screen',
    fit: 'h-fit',
    full: 'h-full',
    sm: 'h-20',
    md: 'h-60',
    lg: 'h-80',
    xl: 'h-96'
  }

  const Component = isLink ? 'a' : 'div'

  return (
    <Component
      href={isLink ? href : undefined}
      className={\` 
          w-full overflow-hidden backdrop-blur-sm
          \${heights[height]}
          \${paddings[padding]}
          \${isLink ? hoverColors[color] : ''}
          \${shadowSizes[shadow]}
          \${roundeds[rounded]}
          \${border ? \`border \${borderColors[color]}\` : ''}
          \${maxWidths[maxWidth]}
          \${!imgBackground && colors[color]}
          \${className}
        \`}
      style={
        imgBackground
          ? {
              backgroundImage: \`url('\${imgBackground}')\`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          : {}
      }
    >
      {children}
    </Component>
  )
}

export default Card
`

export const CardContentReact = `const CardContent = ({
  children,
  textColor = 'default',
  font,
  textSize = 'sm',
  textAlign = 'left',
  padding = 'md',
  className = ''
}) => {
  const textColors = {
    default: 'text-zinc-700/80 dark:text-neutral-100/70',
    primary: 'text-blue-500/80',
    secondary: 'text-indigo-500/80',
    success: 'text-green-500/80',
    warning: 'text-yellow-500/80',
    danger: 'text-red-500/80'
  }

  const fonts = {
    bold: 'font-bold',
    semibold: 'font-semibold',
    medium: 'font-medium',
    normal: 'font-normal',
    light: 'font-light',
    extrabold: 'font-extrabold'
  }

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    xxl: 'text-2xl'
  }

  const textAligns = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  const paddings = {
    none: 'p-0',
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  }

  return (
    <div
      className={\`
        \${textColors[textColor]} 
        \${fonts[font]} 
        \${textSizes[textSize]} 
        \${textAligns[textAlign]} 
        \${paddings[padding]}
        \${className}\`}
    >
      {children}
    </div>
  )
}

export default CardContent
`

export const CardHeaderReact = `const CardHeader = ({
  children,
  textColor = 'default',
  textHoverColor,
  font = 'bold',
  textSize = 'lg',
  textAlign = 'left',
  padding = 'md',
  isLink = false,
  href = '#',
  className = ''
}) => {
  const textColors = {
    default: 'text-zinc-700 dark:text-neutral-100/80',
    primary: 'text-blue-500',
    secondary: 'text-indigo-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500'
  }

  const textHoverColors = {
    default: 'hover:text-zinc-900 dark:hover:text-neutral-100',
    primary: 'hover:text-blue-600 dark:hover:text-blue-500',
    secondary: 'hover:text-indigo-600 dark:hover:text-indigo-500',
    success: 'hover:text-green-600 dark:hover:text-green-500',
    warning: 'hover:text-yellow-600 dark:hover:text-yellow-500',
    danger: 'hover:text-red-600 dark:hover:text-red-500'
  }

  const fonts = {
    bold: 'font-bold',
    semibold: 'font-semibold',
    medium: 'font-medium',
    normal: 'font-normal',
    light: 'font-light',
    extrabold: 'font-extrabold'
  }

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    xxl: 'text-2xl'
  }

  const textAligns = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  const paddings = {
    none: 'p-0',
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  }

  const Component = isLink ? 'a' : 'div'

  return (
    <Component
      href={isLink ? href : undefined}
      className={\`
        \${textColors[textColor]} 
        \${textHoverColor && textHoverColors[textHoverColor]} 
        \${fonts[font]} 
        \${textSizes[textSize]} 
        \${textAligns[textAlign]} 
        \${paddings[padding]}
        \${className}\`}
    >
      {children}
    </Component>
  )
}

export default CardHeader
`

export const CustomCardReact = `import Card from '@/components/react/Card/Card'
import CardHeader from '@/components/react/Card/CardHeader'
import CardContent from '@/components/react/Card/CardContent'

const CustomCard = ({ title, description, imageUrl, actions }) => {
  return (
    <Card maxWidth='xs' shadow='md' rounded='lg' color='default'>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title || 'Card image'}
          className='w-full h-40 object-cover rounded-t-lg'
        />
      )}
      <CardHeader textSize='lg' padding='md' font='bold'>
        <h3>{title}</h3>
      </CardHeader>
      <CardContent textSize='sm'>
        <p>{description}</p>
        {actions && <div className='mt-4 flex gap-2'>{actions}</div>}
      </CardContent>
    </Card>
  )
}

export default CustomCard
`

export const DrawerReact = `import { useEffect, useRef } from 'react'

const Drawer = ({
  isOpen,
  onClose,
  isDismissable = true,
  position = 'right',
  effect = 'opaque',
  size = 'md',
  color = 'default',
  children
}) => {
  const drawerRef = useRef(null)

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/20 ',
    warning: 'bg-yellow-500/20 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const textColors = {
    default: \`\${
      effect === 'opaque' ? 'text-gray-200' : 'text-gray-800 '
    } dark:text-gray-300\`,
    primary: 'text-blue-400 dark:text-blue-500',
    secondary: 'text-indigo-400 dark:text-indigo-500',
    success: 'text-green-400 dark:text-green-500',
    warning: 'text-yellow-400 dark:text-yellow-500',
    danger: 'text-red-400 dark:text-red-500'
  }

  const backdropEffects = {
    opaque: 'bg-black/50',
    blur: 'backdrop-blur-sm',
    transparent: 'bg-transparent'
  }

  const drawerWSizes = {
    sm: 'w-1/4',
    md: 'w-1/3',
    lg: 'w-1/2',
    xl: 'w-3/4',
    full: 'w-full'
  }

  const drawerHSizes = {
    sm: 'h-1/4',
    md: 'h-1/3',
    lg: 'h-1/2',
    xl: 'h-3/4',
    full: 'h-full'
  }

  const drawerPositions = {
    top: 'top-0 left-0 right-0 w-full',
    bottom: 'bottom-0 left-0 right-0 w-full',
    left: 'left-0 top-0 bottom-0 h-full',
    right: 'right-0 top-0 bottom-0 h-full'
  }

  const drawerStyle = \`\${drawerPositions[position]} \${
    position === 'top' || position === 'bottom'
      ? drawerHSizes[size]
      : drawerWSizes[size]
  } fixed \`

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen && isDismissable) {
        onClose()
      }
    }

    const handleClickOutside = (event) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        isOpen &&
        isDismissable
      ) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose, isDismissable])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={\`fixed inset-0 z-50 \${textColors[color]}\`}>
      <div
        className={\`fixed inset-0 \${backdropEffects[effect]}\`}
        aria-hidden='true'
      />
      <div
        ref={drawerRef}
        className={\`border-0 shadow-lg backdrop-blur-sm \${drawerStyle} \${colors[color]}\`}
        data-open={isOpen}
        data-dismissable={isDismissable}
      >
        <div className='flex flex-col h-full'>{children}</div>
      </div>
    </div>
  )
}

export default Drawer
`

export const DrawerHeaderReact = `const DrawerHeader = ({ children, closeDrawer }) => (
  <div className='flex-shrink-0 flex items-center justify-between p-2'>
    <div>{children}</div>
    {closeDrawer && (
      <button
        onClick={closeDrawer}
        className='p-2 transition duration-300 ease-in-out hover:text-red-700'
        aria-label='Close'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='icon icon-tabler icons-tabler-filled icon-tabler-square-rounded-x'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path
            d='M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z'
            fill='currentColor'
            strokeWidth='0'
          />
        </svg>
      </button>
    )}
  </div>
)

export default DrawerHeader
`

export const DrawerBodyReact = `const DrawerBody = ({ children }) => (
  <div className='flex-1 overflow-y-auto p-2'>{children}</div>
)

export default DrawerBody
`

export const DrawerContentReact = `const DrawerContent = ({ children }) => (
  <div className='flex-1 flex flex-col overflow-hidden'>{children}</div>
)

export default DrawerContent
`

export const CustomDrawerReact = `import { useState } from 'react'
import Drawer from '@/components/react/Drawer/Drawer.jsx'
import DrawerHeader from '@/components/react/Drawer/DrawerHeader.jsx'
import DrawerBody from '@/components/react/Drawer/DrawerBody.jsx'
import DrawerFooter from '@/components/react/Drawer/DrawerFooter.jsx'
import DrawerContent from '@/components/react/Drawer/DrawerContent.jsx'
import Button from '@/components/react/Button.jsx'

const CustomDrawer = ({
  isDismissable = true,
  position = 'right',
  effect = 'opaque',
  size = 'md',
  color = 'default',
  text = 'Open Drawer'
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setDrawerOpen(true)}>{text}</Button>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        isDismissable={isDismissable}
        position={position}
        effect={effect}
        size={size}
        color={color}
      >
        <DrawerContent>
          <DrawerHeader
            onClose={() => setDrawerOpen(false)}
            closeDrawer={() => setDrawerOpen(false)}
          >
            Drawer Title
          </DrawerHeader>
          <DrawerBody>
            <p>This is the body of the drawer.</p>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setDrawerOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default CustomDrawer
`

export const DrawerFooterReact = `const DrawerFooter = ({ children }) => (
  <div className='flex-shrink-0 p-2'>{children}</div>
)

export default DrawerFooter
`

export const DropdownReact = `import { createContext, useContext, useState } from 'react'

const DropdownContext = createContext()

const Dropdown = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown }}>
      <div className='relative inline-block' {...props}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('useDropdown must be used within a Dropdown')
  }
  return context
}

export default Dropdown
`

export const DropdownItemReact = `const DropdownItem = ({
  children,
  title,
  description,
  selected,
  onClick,
  variant = 'light',
  color = 'default',
  rounded = 'md',
  disabled = false,
  ...props
}) => {
  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/20 ',
    warning: 'bg-yellow-500/20 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const selectedColors = {
    default: 'bg-neutral-100/50 dark:bg-zinc-700/60 ',
    primary: 'bg-blue-500/40 dark:bg-blue-500/40',
    secondary: 'bg-indigo-500/40 dark:bg-indigo-500/40',
    success: 'bg-green-500/40 dark:bg-green-500/40',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/40',
    danger: 'bg-red-500/40 dark:bg-red-500/40'
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
    default: 'border-gray-800 dark:border-gray-300',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
  }

  const hoverColors = {
    default: 'hover:bg-neutral-100/30 dark:hover:bg-zinc-700/50 ',
    primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
    secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/10',
    success: 'hover:bg-green-500/30 dark:hover:bg-green-500/10',
    warning: 'hover:bg-yellow-500/30 dark:hover:bg-yellow-500/10',
    danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg'
  }

  return (
    <button
      className={\`flex w-full px-7 py-2 text-sm \${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } \${roundeds[rounded]} \${variants[variant]} \${textColors[color]} \${
        variant === 'default' && !selected && colors[color]
      } \${variant === 'bordered' && borderColors[color]} \${
        !disabled && hoverColors[color]
      } \${selected && selectedColors[color]}\`}
      onClick={onClick}
      {...props}
    >
      <div className='flex flex-col text-left'>
        <span className='text-sm font-medium'>{title}</span>
        {description && <p className='text-sm'>{description}</p>}
      </div>
      {children}
    </button>
  )
}

export default DropdownItem
`

export const DropdownMenuReact = `import { useDropdown } from './Dropdown'

const DropdownMenu = ({
  children,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  ...props
}) => {
  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/20 ',
    warning: 'bg-yellow-500/20 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const borderColors = {
    default: 'border-gray-800 dark:border-gray-300',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg'
  }

  const { isOpen } = useDropdown()

  return (
    <div
      className={\`origin-top-right flex flex-col right-0 mt-2 w-full \${
        isOpen ? 'block' : 'hidden'
      }
        \${variants[variant]} 
        \${variant === 'default' && colors[color]}
        \${variant === 'bordered' && borderColors[color]}
        \${roundeds[rounded]}
      \`}
      {...props}
    >
      {children}
    </div>
  )
}

export default DropdownMenu
`

export const DropdownSectionReact = `const DropdownSection = ({
  children,
  heading,
  showDivider,
  variant = 'light',
  color = 'default',
  font = 'md',
  rounded = 'md',
  ...props
}) => {
  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/5 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/20 ',
    warning: 'bg-yellow-500/20 dark:bg-yellow-500/20 ',
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
    default: 'border-gray-800 dark:border-gray-300',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
  }

  const fonts = {
    sm: 'font-normal',
    md: 'font-medium',
    lg: 'font-semibold',
    xl: 'font-bold'
  }

  const dividerColors = {
    default: 'bg-zinc-700 dark:bg-neutral-100/70',
    primary: 'bg-blue-500',
    secondary: 'bg-indigo-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg'
  }

  return (
    <div className='flex flex-col' {...props}>
      {heading && (
        <h3
          className={\`px-4 \${variants[variant]} \${
            variant !== 'light' && roundeds[rounded]
          } \${textColors[color]} \${fonts[font]} \${
            variant === 'default' && colors[color]
          } \${variant === 'bordered' && borderColors[color]}\`}
        >
          {heading}
        </h3>
      )}
      {children}
      {showDivider && (
        <div className={\`my-2 h-px \${dividerColors[color]}\`}></div>
      )}
    </div>
  )
}

export default DropdownSection
`

export const DropdownTriggerReact = `import { useDropdown } from './Dropdown'

const DropdownTrigger = ({
  children,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  size = 'md',
  ...props
}) => {
  const variants = {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/20 ',
    warning: 'bg-yellow-500/20 dark:bg-yellow-500/20 ',
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
    default: 'border-gray-800 dark:border-gray-300',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
  }

  const hoverColors = {
    default: 'hover:bg-neutral-100/30 dark:hover:bg-zinc-700/50 ',
    primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
    secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/10',
    success: 'hover:bg-green-500/30 dark:hover:bg-green-500/10',
    warning: 'hover:bg-yellow-500/30 dark:hover:bg-yellow-500/10',
    danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
  }

  const sizes = {
    sm: 'font-light text-xs px-2 py-1.5',
    md: 'font-medium text-sm px-4 py-2',
    lg: 'font-medium text-base px-8 py-2.5'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  const { toggleDropdown } = useDropdown()

  return (
    <button
      className={\`inline-flex justify-center items-center
        \${variants[variant]} 
        \${sizes[size]} 
        \${textColors[color]} 
        \${variant === 'bordered' && borderColors[color]}
        \${variant === 'default' && colors[color]}
        \${roundeds[rounded]} 
        \${hoverColors[color]}
      \`}
      onClick={toggleDropdown}
      {...props}
    >
      {children}
    </button>
  )
}

export default DropdownTrigger
`

export const InputReact = `const Input = ({
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
  size = 'md'
}) => {
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
    <div className={\`flex flex-col space-y-2 \${textColors[color]}\`}>
      {label && (
        <label className='text-sm font-medium'>
          {label}
          {isRequired && <span className='text-red-500'> *</span>}
        </label>
      )}

      <div className='relative'>
        <div
          className={\`flex items-center \${variants[variant]} \${
            roundeds[rounded]
          } \${variant === 'default' && colors[color]} \${borderColors[color]} \`}
        >
          <div className='flex-1 relative'>
            <input
              type={type}
              value={value}
              onChange={(e) => onValueChange(e.target.value)}
              required={isRequired}
              minLength={minLength}
              maxLength={maxLength}
              pattern={pattern}
              readOnly={isReadOnly}
              disabled={isDisabled}
              placeholder={placeholder}
              className={\`w-full focus:outline-none \${
                variant === 'light' && 'border-b-2'
              }  \${isInvalid && 'border-2 border-red-500'} \${
                roundeds[rounded]
              } \${sizes[size]}\`}
            />

            {type !== 'password' && isClearable && value && (
              <button
                type='button'
                onClick={handleClear}
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
        {description && <p className='font-normal'>{description}</p>}
        {isInvalid && errorMessage && (
          <p className='text-red-500'>{errorMessage}</p>
        )}
      </div>
    </div>
  )
}

export default Input
`

export const CustomInputReact = `import { useState } from 'react'
import Input from '@/components/react/Input/Input'

const CustomInput = ({
  label,
  placeholder,
  type,
  isRequired,
  isClearable,
  isInvalid,
  errorMessage,
  description,
  isMinLength,
  minLength,
  maxLength,
  pattern,
  isReadOnly,
  isDisabled,
  variant,
  color,
  rounded,
  size
}) => {
  const [value, setValue] = useState('')

  const rule = !value.includes('@')

  return (
    <div className='p-4'>
      <Input
        label={label}
        placeholder={placeholder}
        type={type}
        isRequired={isRequired}
        isClearable={isClearable}
        isInvalid={
          (!isMinLength && isInvalid && rule) ||
          (isRequired && value.length === 0) ||
          (isMinLength && value.length < minLength)
        }
        errorMessage={errorMessage}
        description={description}
        value={value}
        onValueChange={setValue}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        variant={variant}
        color={color}
        rounded={rounded}
        size={size}
      />
    </div>
  )
}

export default CustomInput
`

export const ModalReact = `import { useEffect, useRef } from 'react'

const Modal = ({
  isOpen,
  isDismissable = true,
  effect = 'opaque',
  color = 'default',
  rounded = 'md',
  size = 'md',
  onClose,
  children
}) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isDismissable) {
        onClose()
      }
    }

    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        isDismissable
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, isDismissable, onClose])

  if (!isOpen) return null

  const backdropEffects = {
    opaque: 'bg-black/50',
    blur: 'backdrop-blur-sm',
    transparent: 'bg-transparent'
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/20 ',
    warning: 'bg-yellow-500/30 ',
    danger: 'bg-red-500/20 '
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-xl',
    xl: 'rounded-2xl'
  }

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full min-h-full'
  }

  return (
    <div
      className={\`fixed inset-0 z-50 flex items-center justify-center \${backdropEffects[effect]}\`}
    >
      <div
        ref={modalRef}
        className={\`\${colors[color]} \${roundeds[rounded]} shadow-lg w-full \${
          sizes[size]
        } border-0 backdrop-blur-sm \${
          effect === 'opaque' ? 'text-gray-200' : 'text-gray-800 '
        } dark:text-gray-300\`}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
`

export const ModalHeaderReact = `const ModalHeader = ({ children, onClose }) => {
  return (
    <div className='flex justify-between items-center pb-4 mb-4'>
      <h3 className='text-lg font-semibold'>{children}</h3>
      {onClose && (
        <button
          onClick={onClose}
          className='p-2 transition duration-300 ease-in-out hover:text-red-700'
          aria-label='Close'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='icon icon-tabler icons-tabler-filled icon-tabler-square-rounded-x'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path
              d='M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z'
              fill='currentColor'
              strokeWidth='0'
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default ModalHeader
`

export const ModalBodyReact = `const ModalBody = ({ children }) => {
  return <div className='mb-4'>{children}</div>
}

export default ModalBody
`

export const ModalContentReact = `const ModalContent = ({ children }) => {
  return <div className='p-6'>{children}</div>
}

export default ModalContent
`

export const ModalFooterReact = `const ModalFooter = ({ children }) => {
  return <div className='flex justify-end space-x-2'>{children}</div>
}

export default ModalFooter
`

export const PopoverReact = `import { useState, useRef, useEffect, Children, cloneElement } from 'react'
import PopoverContent from '@/components/react/Popover/PopoverContent'
import PopoverTrigger from '@/components/react/Popover/PopoverTrigger'

const Popover = ({
  children,
  backdrop = 'transparent',
  placement = 'bottom',
  color = 'default',
  rounded = 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className='relative' ref={popoverRef}>
      {Children.map(children, (child) => {
        if (child.type === PopoverTrigger) {
          return cloneElement(child, {
            onClick: () => setIsOpen(!isOpen)
          })
        }
        if (child.type === PopoverContent) {
          return cloneElement(child, {
            isOpen,
            backdrop,
            placement,
            color,
            rounded,
            ref: contentRef
          })
        }
        return child
      })}
    </div>
  )
}

export default Popover
`

export const PopoverContentReact = `import { forwardRef } from 'react'

const PopoverContent = forwardRef(
  ({ children, isOpen, backdrop, placement, color, rounded }, ref) => {
    if (!isOpen) return null

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
        <div className={\`fixed inset-0 \${backdropClass[backdrop]}\`}></div>
        <div
          className={\`absolute z-10 \${placementStyles[placement]}\`}
          ref={ref}
        >
          <div
            className={\`border-0 backdrop-blur-md shadow-lg p-4 whitespace-nowrap text-gray-800 dark:text-gray-300 \${colors[color]} \${roundeds[rounded]}\`}
          >
            {children}
          </div>
        </div>
      </>
    )
  }
)

export default PopoverContent
`

export const PopoverTriggerReact = `const PopoverTrigger = ({ children, onClick }) => {
  return (
    <div className='cursor-pointer' onClick={onClick}>
      {children}
    </div>
  )
}

export default PopoverTrigger
`

export const RadioReact = `import { useState } from 'react'

const Radio = ({
  value,
  isSelected = false,
  isDisabled = false,
  isReadOnly = false,
  children,
  description,
  onChange,
  color
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleChange = () => {
    if (!isDisabled && !isReadOnly && onChange) {
      onChange(value)
    }
  }

  const handleMouseDown = () => {
    if (!isDisabled && !isReadOnly) {
      setIsPressed(true)
    }
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  const handleMouseEnter = () => {
    if (!isDisabled && !isReadOnly) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const colors = {
    default: 'bg-zinc-700/30 dark:bg-neutral-100/50',
    primary: 'bg-blue-500/50 ',
    secondary: 'bg-indigo-500/50 ',
    success: 'bg-green-500/60 ',
    warning: 'bg-yellow-500/60 ',
    danger: 'bg-red-500/50 '
  }

  return (
    <div
      data-selected={isSelected}
      data-pressed={isPressed}
      data-readonly={isReadOnly}
      data-hover-unselected={isHovered && !isSelected}
      data-hover={isHovered}
      data-disabled={isDisabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleChange}
      className={\`flex items-center gap-2 \${
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }\`}
    >
      <input
        type='radio'
        value={value}
        checked={isSelected}
        disabled={isDisabled || isReadOnly}
        onChange={handleChange}
        className='hidden'
      />

      <div
        className={\`size-5 rounded-full flex items-center justify-center transition-colors \${
          isSelected
            ? colors[color]
            : 'border-2 border-zinc-700/50 dark:border-neutral-100/50'
        } \${isHovered ? 'bg-zinc-700/30 dark:bg-neutral-100/30' : ''}\`}
      >
        {isSelected && (
          <div
            className={\`size-3 border-2 rounded-full border-transparent \${colors[color]}\`}
          ></div>
        )}
      </div>

      <div className='flex flex-col'>
        <div className='text-sm font-medium'>{children}</div>

        {description && <p className='text-sm font-light'>{description}</p>}
      </div>
    </div>
  )
}

export default Radio
`

export const RadioGroupReact = `import React from 'react'

const RadioGroup = ({
  children,
  orientation = 'vertical',
  label,
  description,
  errorMessage,
  isInvalid,
  isDisabled,
  selectedValue,
  onChange,
  variant = 'default',
  color = 'default',
  rounded = 'md'
}) => {
  const variants = {
    default: 'border-0 backdrop-blur-sm shadow-md',
    bordered: 'border shadow-md',
    light: ''
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/20 ',
    warning: 'bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const borderColors = {
    default: 'border-zinc-700/30 dark:border-neutral-100/20',
    primary: 'border-blue-500',
    secondary: 'border-indigo-500 ',
    success: 'border-green-500 ',
    warning: 'border-yellow-500',
    danger: 'border-red-500 '
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-600',
    secondary: 'text-indigo-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-xl',
    xl: 'rounded-3xl'
  }

  return (
    <div
      className={\`flex flex-col gap-3 px-4 py-3 \${variants[variant]} \${
        variant === 'default' && colors[color]
      } \${roundeds[rounded]} \${variant === 'bordered' && borderColors[color]}\`}
      data-orientation={orientation}
      role='radiogroup'
    >
      {label && (
        <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
          {label}
        </span>
      )}

      <div
        className={\`flex \${
          orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2'
        } \${textColors[color]}\`}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            isSelected: child.props.value === selectedValue,
            onChange: onChange,
            color: color,
            isDisabled: isDisabled || child.props.isDisabled
          })
        )}
      </div>

      {description && <p className='text-sm text-gray-500'>{description}</p>}

      {isInvalid && errorMessage && (
        <p className='text-sm text-red-600'>{errorMessage}</p>
      )}
    </div>
  )
}

export default RadioGroup
`

export const SelectReact = `import { useState, useRef, Children, cloneElement } from 'react'

const Select = ({
  label,
  description,
  errorMessage,
  isInvalid,
  children,
  onChange,
  isDisabled = false,
  placeholder = 'Selecciona una opción',
  variant = 'default',
  color = 'default',
  rounded = 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)
  const [selectedLabel, setSelectedLabel] = useState(null)
  const selectRef = useRef(null)

  const handleSelect = (value, label) => {
    if (isDisabled) return

    setSelectedValue(value)
    setSelectedLabel(label)
    setIsOpen(false)
    onChange(value)
  }

  const handleTriggerClick = () => {
    if (isDisabled) return

    setIsOpen(!isOpen)
  }

  const hasValue = selectedValue !== null
  const hasLabel = !!label
  const isFilled = hasValue || isOpen

  const variants = {
    default: 'border-0 backdrop-blur-sm shadow-md',
    bordered: 'border border-current shadow-md',
    light: 'border-b border-current'
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-600',
    secondary: 'text-indigo-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  }

  return (
    <div
      className={\`relative w-full space-y-2 text-gray-600 dark:text-gray-500\`}
      ref={selectRef}
      data-filled={isFilled}
      data-has-value={hasValue}
      data-has-label={hasLabel}
      data-invalid={isInvalid}
    >
      {label && (
        <label className='block text-sm font-medium mb-1'>{label}</label>
      )}

      <div
        className={\`trigger flex items-center justify-between p-2 \${
          variants[variant]
        } \${variant === 'default' && colors[color]} \${textColors[color]} \${
          variant !== 'light' && roundeds[rounded]
        } \${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}\`}
        onClick={handleTriggerClick}
        data-open={isOpen}
      >
        <div className='value'>
          {selectedValue ? selectedLabel : placeholder}
        </div>

        <div className='selector-icon' data-open={isOpen}>
          <svg
            className={\`w-4 h-4 transition-transform \${
              isOpen ? 'rotate-180' : ''
            }\`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div
          className={\`listbox-wrapper absolute mt-1 w-full border-0 backdrop-blur-xl rounded-md shadow-lg z-10 \${colors[color]}\`}
        >
          <ul className='listbox'>
            {Children.map(children, (child) =>
              cloneElement(child, {
                onSelect: handleSelect,
                selectedValue,
                color
              })
            )}
          </ul>
        </div>
      )}

      {description && <p className='text-sm mt-1'>{description}</p>}

      {isInvalid && errorMessage && (
        <p className='text-sm text-red-500 mt-1'>{errorMessage}</p>
      )}
    </div>
  )
}

export default Select
`

export const SelectItemReact = `import { useState } from 'react'

const SelectItem = ({
  value,
  children,
  onSelect,
  selectedValue,
  isDisabled,
  color = 'default'
}) => {
  const isSelected = selectedValue === value
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    if (!isDisabled) {
      onSelect(value, children)
    }
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-600',
    secondary: 'text-indigo-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  }

  return (
    <li
      className={\`p-2 cursor-pointer \${
        isSelected
          ? \` text-gray-200 dark:text-gray-800 bg-zinc-700/30 dark:bg-neutral-100/50\`
          : \`\${textColors[color]} hover:bg-neutral-100/50 dark:hover:bg-zinc-700/50\`
      } \${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}\`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      data-disabled={isDisabled}
      data-selected={isSelected}
      data-hover={isHovered}
      data-pressed={isPressed}
    >
      {children}
    </li>
  )
}

export default SelectItem
`

export const SkeletonReact = `const Skeleton = ({ isLoaded, children, className }) => {
  return (
    <div
      className={\`relative overflow-hidden  \${
        isLoaded ? '' : \`backdrop-blur-sm shadow-lg animate-pulse \${className}\`
      }\`}
      data-loaded={isLoaded}
    >
      {!isLoaded && (
        <div className='absolute inset-0 transform bg-zinc-700/30 dark:bg-gray-600 animate-pulse' />
      )}
      <div className={isLoaded ? '' : 'opacity-0'}>{children}</div>
    </div>
  )
}

export default Skeleton
`

export const TabReact = `const Tab = ({ label, children, disabled = false, href }) => {
  return <div>{children}</div>
}

export default Tab
`

export const TabsReact = `import { useState, Children } from 'react'

const Tabs = ({
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

  const orientationClass = orientation === 'vertical' ? 'flex-col' : 'flex-row'

  const placementClass = {
    top: 'flex-col',
    bottom: 'flex-col-reverse',
    left: 'flex-row ',
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
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/20 ',
    warning: 'bg-yellow-500/20',
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
    default: 'hover:text-gray-800/80 dark:hover:dark:text-gray-300/80 ',
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

  return (
    <div className={\`flex \${placementClass}\`}>
      <div
        className={\`flex \${orientationClass} \${variants[variant]} \${
          variant === 'default' && colors[color]
        } \${variant !== 'default' && borderColors[color]} 
        \${sizes[size]}
        \${variant !== 'light' && roundeds[radius]}
        \`}
      >
        {Children.map(children, (child, index) => {
          const isDisabled = child.props.disabled
          const isLink = child.props.href

          return (
            <button
              key={index}
              onClick={() => !isDisabled && !disabled && setActiveTab(index)}
              className={\`px-4 py-2 transition-colors duration-300 ease-in-out \${
                activeTab === index
                  ? \`\${activeVariants[variant]} \${borderColors[color]} \${
                      textColors[color]
                    } \${variant !== 'light' && roundeds[radius]}\`
                  : noActiveTextColors[color]
              } \${
                isDisabled || disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : hoverColors[color]
              }\`}
              disabled={isDisabled}
            >
              {isLink ? (
                <a
                  href={child.props.href}
                  className={\`block \${
                    isDisabled || disabled ? 'pointer-events-none' : ''
                  }\`}
                >
                  {child.props.label}
                </a>
              ) : (
                child.props.label
              )}
            </button>
          )
        })}
      </div>

      <div className={\`p-4 \${textColors[color]}\`}>
        {Children.map(children, (child, index) =>
          activeTab === index ? child.props.children : null
        )}
      </div>
    </div>
  )
}

export default Tabs
`

export const TableReact = `const Table = ({
  children,
  variant = 'default',
  color = 'default',
  rounded = 'md'
}) => {
  const variants = {
    default: 'border-0 backdrop-blur-sm shadow-lg',
    bordered: 'border shadow-md',
    light: ''
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  }

  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 ',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const textColors = {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-800 dark:text-blue-600',
    secondary: 'text-indigo-800 dark:text-indigo-600',
    success: 'text-green-800 dark:text-green-600',
    warning: 'text-yellow-800 dark:text-yellow-600',
    danger: 'text-red-800 dark:text-red-500'
  }

  const borderColors = {
    default: 'border-gray-800 dark:border-gray-300',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
  }

  return (
    <div
      className={\`w-full overflow-auto \${variants[variant]} \${
        roundeds[rounded]
      } \${textColors[color]} \${variant === 'bordered' && borderColors[color]}\`}
    >
      <table className={\`w-full \${variant === 'default' && colors[color]}\`}>
        {children}
      </table>
    </div>
  )
}

export default Table
`

export const TableBodyReact = `const TableBody = ({
  isLoading,
  loadingContent,
  isEmpty,
  emptyMessage = 'No data available.',
  divide = false,
  color = 'default',
  children
}) => {
  const divideColors = {
    default: 'divide-gray-800 dark:divide-gray-300',
    primary: 'divide-blue-800 dark:divide-blue-500',
    secondary: 'divide-indigo-800 dark:divide-indigo-500',
    success: 'divide-green-800 dark:divide-green-500',
    warning: 'divide-yellow-800 dark:divide-yellow-500',
    danger: 'divide-red-800 dark:divide-red-500'
  }

  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan='100%' className='py-6 text-center'>
            {loadingContent}
          </td>
        </tr>
      </tbody>
    )
  }

  if (isEmpty) {
    return (
      <tbody>
        <tr>
          <td colSpan='100%' className='py-6 text-center'>
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody className={\` \${divide && \`divide-y \${divideColors[color]}\`}\`}>
      {children}
    </tbody>
  )
}

export default TableBody
`

export const TableCellReact = `const TableCell = ({
  isSelected,
  isFocusVisible,
  selectColor = 'default',
  children
}) => {
  const selectedColors = {
    default: 'bg-neutral-100/70 dark:bg-zinc-700/80 ',
    primary: 'bg-blue-500/70 ',
    secondary: 'bg-indigo-500/70 ',
    success: 'bg-green-500/80 ',
    warning: 'bg-yellow-500/90 dark:bg-yellow-500/70 ',
    danger: 'bg-red-500/70 '
  }
  return (
    <td
      className={\`
          px-6 py-4 whitespace-nowrap text-sm
          \${isSelected ? selectedColors[selectColor] : ''}
          \${isFocusVisible ? 'ring-2 ring-blue-500' : ''}
        \`}
    >
      {children}
    </td>
  )
}

export default TableCell
`

export const TableHeaderReact = `const TableHeader = ({ children, color = 'default' }) => {
  const colors = {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30 ',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  return (
    <thead className={\`border-0 backdrop-blur-md shadow-md \${colors[color]}\`}>
      <tr>{children}</tr>
    </thead>
  )
}

export default TableHeader
`

export const TableRowReact = `const TableRow = ({
  isSelected,
  isDisabled,
  isHovered,
  isFocusVisible,
  isFirst,
  isLast,
  isOdd,
  id,
  selectedColor = 'default',
  hoverColor = 'default',
  oddColor = 'default',
  children
}) => {
  const selectedColors = {
    default: 'bg-neutral-100/60 dark:bg-zinc-700/70 ',
    primary: 'bg-blue-500/60 ',
    secondary: 'bg-indigo-500/60 ',
    success: 'bg-green-500/70 ',
    warning: 'bg-yellow-500/80 dark:bg-yellow-500/60 ',
    danger: 'bg-red-500/60 '
  }

  const hoverColors = {
    default: 'hover:bg-neutral-100/40 dark:hover:bg-zinc-700/50 ',
    primary: 'hover:bg-blue-500/40 ',
    secondary: 'hover:bg-indigo-500/40 ',
    success: 'hover:bg-green-500/50 ',
    warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/40 ',
    danger: 'hover:bg-red-500/40 '
  }

  const oddColors = {
    default: 'bg-neutral-200/20 dark:bg-zinc-800/30 ',
    primary: 'bg-blue-600/20 ',
    secondary: 'bg-indigo-600/20 ',
    success: 'bg-green-600/30 ',
    warning: 'bg-yellow-600/40 dark:bg-yellow-600/20 ',
    danger: 'bg-red-600/20 '
  }

  return (
    <tr
      key={id}
      className={\`
          \${isSelected ? selectedColors[selectedColor] : ''}
          \${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          \${isHovered ? hoverColors[hoverColor] : ''}
          \${isFocusVisible ? 'ring-2 ring-blue-500' : ''}
          \${isFirst ? 'rounded-t-lg' : ''}
          \${isLast ? 'rounded-b-lg' : ''}
          \${isOdd ? oddColors[oddColor] : ''}
          transition-colors duration-200
        \`}
    >
      {children}
    </tr>
  )
}

export default TableRow
`

export const TableColumnReact = `const TableColumn = ({ children }) => {
  return (
    <th className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider'>
      {children}
    </th>
  )
}

export default TableColumn
`
