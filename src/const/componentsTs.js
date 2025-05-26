export const AccordionTs = `import { type FC, useState } from 'react'
import AccordionItem from '@/components/ts/Accordion/AccordionItem'

interface AccordionItemProps {
  title: string
  subtitle?: string
  content: string
}

interface AccordionProps {
  items: AccordionItemProps[]
  multiple?: boolean
  styleVariant?: 'default' | 'light' | 'bordered' | 'complete'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

const Accordion: FC<AccordionProps> = ({
  items,
  multiple = false,
  styleVariant = 'default',
  color = 'default'
}) => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([])

  const toggleAccordion = (index: number) => {
    if (multiple) {
      setActiveIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      )
    } else {
      setActiveIndexes((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  return (
    <div
      id='accordion'
      className='w-full'
      role='tablist'
      aria-multiselectable={multiple}
    >
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
          color={color}
          aria-expanded={activeIndexes.includes(index)}
          aria-controls={\`accordion-content-\${index}\`}
        />
      ))}
    </div>
  )
}

export default Accordion
`

export const AccordionItemTs = `import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useId,
  useCallback,
  type ReactNode
} from 'react'
import clsx from 'clsx'

type StyleVariant = keyof typeof CONTAINER_VARIANTS
type Color = keyof typeof COLOR_BG

interface AccordionItemProps {
  index: number
  title: ReactNode
  subtitle?: ReactNode
  content: ReactNode
  isActive?: boolean
  toggle: (index: number) => void
  styleVariant?: StyleVariant
  color?: Color
  className?: string
}

export const CONTAINER_VARIANTS = {
  default: 'border-0 shadow-lg backdrop-blur-md',
  light: 'border-b-2',
  bordered: 'border rounded-sm',
  complete: 'border backdrop-blur-sm shadow-lg'
} as const

export const BODY_VARIANTS = {
  default: 'backdrop-blur-md',
  light: 'bg-transparent dark:bg-transparent',
  bordered: 'border-x',
  complete: 'backdrop-blur-sm border-x'
} as const

export const COLOR_BG = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/5',
  primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
  secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
  success: 'bg-green-400/50 dark:shadow-green-500/20',
  warning: 'bg-yellow-500/40 dark:shadow-yellow-500/20',
  danger: 'bg-red-500/40 dark:shadow-red-500/20'
} as const

export const COLOR_BORDER = {
  default: 'border-zinc-700/20 dark:border-neutral-100/30',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
} as const

export const HOVER_BG = {
  default: 'hover:bg-white/50 dark:hover:bg-zinc-800',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/20',
  success: 'hover:bg-green-500/60 dark:hover:bg-green-500/30',
  warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/30',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
} as const

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    {
      index,
      title,
      subtitle,
      content,
      isActive = false,
      toggle,
      styleVariant = 'default',
      color = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const headingId = \`accordion-heading-\${autoId}\`
    const bodyId = \`accordion-body-\${autoId}\`

    const contentRef = useRef<HTMLDivElement>(null)
    const [maxHeight, setMaxHeight] = useState('0px')

    useEffect(() => {
      if (isActive && contentRef.current) {
        setMaxHeight(\`\${contentRef.current.scrollHeight}px\`)
      } else {
        setMaxHeight('0px')
      }
    }, [isActive])

    const handleToggle = useCallback(() => toggle(index), [toggle, index])

    const headerClasses = clsx(
      'flex items-center justify-between w-full py-2 px-3 font-medium gap-3 transition duration-300',
      CONTAINER_VARIANTS[styleVariant],
      styleVariant !== 'light' &&
        styleVariant !== 'bordered' &&
        COLOR_BG[color],
      styleVariant !== 'default' && COLOR_BORDER[color],
      HOVER_BG[color]
    )

    const bodyWrapperClasses = clsx(
      'overflow-hidden transition-all duration-300 ease-in-out',
      BODY_VARIANTS[styleVariant],
      styleVariant !== 'light' &&
        styleVariant !== 'bordered' &&
        COLOR_BG[color],
      styleVariant !== 'default' && COLOR_BORDER[color]
    )

    return (
      <div
        ref={ref}
        className={className}
        role='region'
        aria-labelledby={headingId}
        {...props}
      >
        <h2 id={headingId}>
          <button
            type='button'
            className={headerClasses}
            onClick={handleToggle}
            aria-expanded={isActive}
            aria-controls={bodyId}
            aria-label={\`Toggle \${title}\`}
          >
            <div className='flex-1'>
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
              className={clsx(
                'w-3 h-3 shrink-0 transition-transform duration-300',
                isActive && 'rotate-180'
              )}
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
          id={bodyId}
          ref={contentRef}
          role='region'
          aria-labelledby={headingId}
          style={{ maxHeight }}
          className={bodyWrapperClasses}
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
)

export default AccordionItem
`

export const AlertTs = `import { useState, useMemo, useCallback, memo, type FC } from 'react'
import clsx from 'clsx'

interface AlertProps {
  type?: AlertType
  styleVariant?: StyleVariant
  title: string
  content?: string
  icon?: boolean
  dismissible?: boolean
}

type AlertType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

type StyleVariant = 'default' | 'light' | 'bordered' | 'complete'

interface AlertIconProps {
  type: AlertType
}

const TYPE_STYLES: Record<AlertType, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const VARIANTS: Record<StyleVariant, string> = {
  default: 'border-0 rounded-md shadow-lg backdrop-blur-sm',
  light:
    'border-t-4 border-current rounded-lg shadow-lg bg-transparent dark:bg-transparent',
  bordered:
    'border border-current rounded-lg shadow-md bg-transparent dark:bg-transparent',
  complete: 'border border-current rounded-lg shadow-lg backdrop-blur-md'
}

const COLOR_STYLES: Record<AlertType, string> = {
  default: 'bg-neutral-100/40 dark:bg-zinc-700/60 dark:shadow-neutral-100/5',
  primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
  secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
  success: 'bg-green-400/50 dark:shadow-green-500/20',
  warning: 'bg-yellow-500/40 dark:shadow-yellow-500/20',
  danger: 'bg-red-500/40 dark:shadow-red-500/20'
}

const AlertIcon: FC<AlertIconProps> = ({ type }) => {
  const iconClass = useMemo(() => {
    const baseClass = 'fill-white/80'
    const typeClasses: Partial<Record<AlertType, string>> = {
      primary: 'fill-blue-500/80',
      secondary: 'fill-indigo-500/80',
      success: 'fill-green-600 dark:fill-green-500/80',
      warning: 'fill-yellow-600 dark:fill-yellow-500/80',
      danger: 'fill-red-500/80'
    }
    return typeClasses[type] || baseClass
  }, [type])

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='currentColor'
      className={iconClass}
    >
      {type === 'success' ? (
        <>
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z' />
        </>
      ) : type === 'warning' ? (
        <>
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .160l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.330l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z' />
        </>
      ) : type === 'danger' ? (
        <>
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M19 4a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-13v6a1 1 0 0 1 -.883 .993l-.117 .007a1 1 0 0 1 -.993 -.883l-.007 -.117v-16a1 1 0 0 1 .883 -.993l.117 -.007h14z' />
        </>
      ) : (
        <>
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M12 2l.642 .005l.616 .017l.299 .013l.579 .034l.553 .046c4.687 .455 6.65 2.333 7.166 6.906l.03 .29l.046 .553l.041 .727l.006 .15l.017 .617l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.455 4.687 -2.333 6.65 -6.906 7.166l-.29 .03l-.553 .046l-.727 .041l-.15 .006l-.617 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.687 -.455 -6.65 -2.333 -7.166 -6.906l-.03 -.29l-.046 -.553l-.041 -.727l-.006 -.15l-.017 -.617l-.004 -.318v-.648l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.455 -4.687 2.333 -6.65 6.906 -7.166l.29 -.03l.553 -.046l.727 -.041l.15 -.006l.617 -.017c.21 -.003 .424 -.005 .642 -.005zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z' />
        </>
      )}
    </svg>
  )
}

interface CloseButtonProps {
  onClick: () => void
}

const CloseButton: FC<CloseButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className='p-1 transition duration-200 ease-in hover:bg-inherit'
    aria-label='Cerrar alerta'
  >
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M18 6l-12 12' />
      <path d='M6 6l12 12' />
    </svg>
  </button>
)

const Alert: FC<AlertProps> = ({
  type = 'default',
  styleVariant = 'default',
  title,
  content,
  icon = true,
  dismissible = false
}) => {
  const [visible, setVisible] = useState<boolean>(true)
  const [exiting, setExiting] = useState<boolean>(false)

  const handleDismiss = useCallback(() => {
    setExiting(true)
    setTimeout(() => setVisible(false), 290)
  }, [])

  const containerClasses = useMemo(
    () =>
      clsx(
        'flex items-center justify-center gap-4 py-2 px-4 my-2',
        TYPE_STYLES[type],
        VARIANTS[styleVariant],
        exiting && 'animate-fade-out',
        (styleVariant === 'default' || styleVariant === 'complete') &&
          COLOR_STYLES[type]
      ),
    [type, styleVariant, exiting]
  )

  const iconContainerClasses = useMemo(
    () =>
      clsx(
        'flex items-center justify-center self-center size-9 rounded-full',
        styleVariant !== 'bordered' && COLOR_STYLES[type]
      ),
    [type, styleVariant]
  )

  if (!visible) return null

  return (
    <div role='alert' aria-live='polite' className={containerClasses}>
      {icon && (
        <div className={iconContainerClasses} aria-hidden='true'>
          <AlertIcon type={type} />
        </div>
      )}

      <div className='flex-1'>
        <strong className='block text-base font-semibold'>{title}</strong>
        {content && <p className='text-sm font-normal'>{content}</p>}
      </div>

      {dismissible && <CloseButton onClick={handleDismiss} />}
    </div>
  )
}

export default memo(Alert)

`

export const AvatarTs = `import { memo, type FC } from 'react'
import clsx from 'clsx'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
export type AvatarRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type AvatarColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type DotPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export interface UserIconProps {
  className?: string
}

export interface AvatarProps {
  src?: string
  name?: string
  alt?: string
  size?: AvatarSize
  rounded?: AvatarRounded
  bordered?: boolean
  color?: AvatarColor
  dot?: boolean
  dotColor?: AvatarColor
  dotPosition?: DotPosition
}

const SIZES: Record<AvatarSize, string> = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-14',
  xxl: 'size-16',
  xxxl: 'size-20'
}

const ROUNDED: Record<AvatarRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-2xl',
  full: 'rounded-full'
}

const BORDER_COLORS: Record<AvatarColor, string> = {
  default: 'border-neutral-100 dark:border-zinc-700',
  primary: 'border-blue-500',
  secondary: 'border-indigo-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  danger: 'border-red-500'
}

const BACKGROUND_COLORS: Record<AvatarColor, string> = {
  default: 'bg-neutral-500/20 dark:bg-zinc-700/60 dark:shadow-zinc-700/20',
  primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
  secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
  success: 'bg-green-500/40 dark:shadow-green-500/20',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20 dark:shadow-yellow-500/20',
  danger: 'bg-red-500/20 dark:shadow-red-500/20'
}

const DOT_COLORS: Record<AvatarColor, string> = {
  default: 'bg-neutral-500',
  primary: 'bg-blue-500',
  secondary: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
}

const DOT_POSITIONS: Record<DotPosition, string> = {
  'top-left': 'top-0 left-0 transform -translate-x-1/4 -translate-y-1/4',
  'top-right': 'top-0 right-0 transform translate-x-1/4 -translate-y-1/4',
  'bottom-left': 'bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4',
  'bottom-right': 'bottom-0 right-0 transform translate-x-1/4 translate-y-1/4'
}

const UserIcon: FC<UserIconProps> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={clsx(
      'icon icon-tabler icons-tabler-filled icon-tabler-user',
      className
    )}
    aria-hidden='true'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z' />
    <path d='M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z' />
  </svg>
)

const Avatar: FC<AvatarProps> = ({
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
  const ariaLabel = alt || (name ? \`Avatar of \${name}\` : 'User avatar')
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const containerClasses = clsx(
    'inline-flex items-center justify-center overflow-hidden',
    SIZES[size],
    ROUNDED[rounded],
    {
      [\`border-2 \${BORDER_COLORS[color]}\`]: bordered,
      [\`backdrop-blur-xl shadow-lg \${BACKGROUND_COLORS[color]}\`]: !src
    }
  )

  return (
    <div className='relative inline-flex'>
      <div className={containerClasses} aria-label={ariaLabel} role='img'>
        {src ? (
          <img
            src={src}
            alt={ariaLabel}
            className='w-full h-full object-cover'
          />
        ) : name ? (
          <span className='font-medium text-gray-800 dark:text-gray-300 text-center'>
            {initials}
          </span>
        ) : (
          <UserIcon className='w-2/3 h-2/3' />
        )}
      </div>
      {dot && (
        <span
          className={clsx(
            'absolute w-3 h-3 rounded-full',
            DOT_COLORS[dotColor],
            DOT_POSITIONS[dotPosition]
          )}
          aria-hidden='true'
        />
      )}
    </div>
  )
}

export default memo(Avatar)

`

export const BadgeTs = `import { useMemo, memo } from 'react'
import type { FC, ReactNode } from 'react'
import clsx from 'clsx'

export type BadgeType = 'default' | 'bordered' | 'icon'
export type BadgeSize = 'sm' | 'md' | 'lg'
export type BadgeRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type BadgeColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type DotPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export interface DotProps {
  color: BadgeColor
  position: DotPosition
  text?: string
}

export interface BadgeContentProps {
  type: BadgeType
  text: string
  icon?: ReactNode
}

export interface BadgeProps {
  type?: BadgeType
  text?: string
  color?: BadgeColor
  size?: BadgeSize
  rounded?: BadgeRounded
  dot?: boolean
  dotColor?: BadgeColor
  dotPosition?: DotPosition
  dotText?: string
  icon?: ReactNode
  ariaLabel?: string
}

const BADGE_TYPES: Record<BadgeType, string> = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border border-current shadow-lg',
  icon: 'p-1 shadow-lg backdrop-blur-sm'
}

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5'
}

const ROUNDED_CLASSES: Record<BadgeRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-2xl',
  full: 'rounded-full'
}

const COLOR_CLASSES: Record<BadgeColor, string> = {
  default: 'bg-neutral-100/20 dark:shadow-zinc-700/30',
  primary: 'bg-blue-500/40 dark:shadow-blue-500/20',
  secondary: 'bg-indigo-500/40 dark:shadow-indigo-500/20',
  success: 'bg-green-500/40 dark:shadow-green-500/20',
  warning: 'bg-yellow-500/40 dark:shadow-yellow-500/20',
  danger: 'bg-red-500/20 dark:shadow-red-500/20'
}

const TEXT_COLORS: Record<BadgeColor, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const DOT_COLORS: Record<BadgeColor, string> = {
  default: 'bg-neutral-500',
  primary: 'bg-blue-500',
  secondary: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
}

const DOT_POSITIONS: Record<DotPosition, string> = {
  'top-left': 'top-0 left-0 -translate-x-1/3 -translate-y-1/3',
  'top-right': 'top-0 right-0 translate-x-1/3 -translate-y-1/3',
  'bottom-left': 'bottom-0 left-0 -translate-x-1/3 translate-y-1/3',
  'bottom-right': 'bottom-0 right-0 translate-x-1/3 translate-y-1/3'
}

const DefaultIcon: FC = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='currentColor'
    aria-hidden='true'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z' />
    <path d='M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z' />
  </svg>
)

const Dot: FC<DotProps> = ({ color, position, text }) => {
  const dotClasses = useMemo(
    () =>
      clsx(
        'absolute transform',
        DOT_COLORS[color],
        DOT_POSITIONS[position],
        text ? 'px-1 rounded-md' : 'w-2.5 h-2.5 rounded-full'
      ),
    [color, position, text]
  )

  return (
    <span className={dotClasses} aria-hidden={!text}>
      {text}
    </span>
  )
}

const BadgeContent: FC<BadgeContentProps> = ({ type, text, icon }) => {
  if (type === 'icon') {
    return icon ? (
      <span className='inline-block' aria-hidden='true'>
        {icon}
      </span>
    ) : (
      <DefaultIcon />
    )
  }
  return <>{text}</>
}

const Badge: FC<BadgeProps> = ({
  type = 'default',
  text = 'text',
  color = 'default',
  size = 'md',
  rounded = 'full',
  dot = false,
  dotColor = 'default',
  dotPosition = 'top-right',
  dotText,
  icon,
  ariaLabel
}) => {
  const badgeClasses = useMemo(
    () =>
      clsx(
        'relative inline-flex items-center justify-center font-medium',
        SIZE_CLASSES[size],
        ROUNDED_CLASSES[rounded],
        TEXT_COLORS[color],
        BADGE_TYPES[type],
        type !== 'bordered' && COLOR_CLASSES[color]
      ),
    [type, color, size, rounded]
  )

  return (
    <span className={badgeClasses} role='status' aria-label={ariaLabel || text}>
      <BadgeContent type={type} text={text!} icon={icon} />
      {dot && <Dot color={dotColor} position={dotPosition} text={dotText} />}
    </span>
  )
}

export default memo(Badge)

`

export const BreadcrumbItemTs = `import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'

export type BreadcrumbItemProps = {
  label: string
  href?: string
  icon?: ReactNode
  selected?: boolean
  sizeClass?: string
  roundedClass?: string
  colorClass?: string
  onClick?: () => void
  className?: string
}

const BreadcrumbItem = forwardRef<
  HTMLAnchorElement & HTMLButtonElement,
  BreadcrumbItemProps
>(
  (
    {
      label,
      href,
      icon,
      selected = false,
      sizeClass = '',
      roundedClass = '',
      colorClass = '',
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses = clsx(
      'inline-flex items-center gap-1 cursor-pointer transition duration-300 hover:text-opacity-50 dark:hover:text-opacity-50',
      sizeClass,
      roundedClass,
      colorClass,
      selected ? 'font-bold' : 'font-normal',
      className
    )

    const commonProps = {
      className: baseClasses,
      'aria-label': label,
      ...(selected ? { 'aria-current': 'page' as 'page' } : {}),
      onClick,
      ref,
      ...props
    }

    const content = (
      <>
        {icon && (
          <span className='inline-block' aria-hidden='true'>
            {icon}
          </span>
        )}
        {label}
      </>
    )

    return href ? (
      <a href={href} {...commonProps}>
        {content}
      </a>
    ) : (
      <button type='button' {...commonProps}>
        {content}
      </button>
    )
  }
)

export default memo(BreadcrumbItem)

`

export const BreadcrumbSeparatorTs = `import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'

type BreadcrumbSeparatorProps = {
  separator?: ReactNode
  colorClass?: string
  ariaLabel?: string
  className?: string
}

const BreadcrumbSeparator = forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(
  (
    {
      separator = '/',
      colorClass = 'text-gray-500',
      ariaLabel = 'breadcrumb separator',
      className,
      ...props
    },
    ref
  ) => (
    <span
      ref={ref}
      role='separator'
      aria-label={ariaLabel}
      className={clsx('mx-1', colorClass, className)}
      {...props}
    >
      {separator}
    </span>
  )
)

export default memo(BreadcrumbSeparator)

`

export const BreadcrumbsTs = `import {
  forwardRef,
  useState,
  useId,
  useCallback,
  memo,
  type ReactNode
} from 'react'
import clsx from 'clsx'
import BreadcrumbItem, {
  type BreadcrumbItemProps
} from '@/components/ts/Breadcrumbs/BreadcrumbItem'
import BreadcrumbSeparator from '@/components/ts/Breadcrumbs/BreadcrumbSeparator'

type Variant = keyof typeof VARIANT_STYLES
type Size = keyof typeof SIZE_STYLES
type Rounding = keyof typeof ROUNDING_STYLES
type Color = keyof typeof COLOR_BG_STYLES

interface BreadcrumbsProps {
  items?: BreadcrumbItemProps[]
  variant?: Variant
  size?: Size
  color?: Color
  rounded?: Rounding
  separator?: ReactNode
  collapsible?: boolean
  className?: string
}

export const VARIANT_STYLES = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-lg bg-transparent',
  light: 'border-0 bg-transparent'
} as const

export const SIZE_STYLES = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2'
} as const

export const ROUNDING_STYLES = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
} as const

export const COLOR_BG_STYLES = {
  default: 'bg-neutral-200/30 dark:bg-zinc-700/30 dark:shadow-zinc-700/20',
  primary: 'bg-blue-500/20 dark:shadow-blue-500/20',
  secondary: 'bg-indigo-500/20 dark:shadow-indigo-500/20',
  success: 'bg-green-500/20 dark:shadow-green-500/20',
  warning: 'bg-yellow-500/10 dark:bg-yellow-500/20 dark:shadow-yellow-500/20',
  danger: 'bg-red-500/20 dark:shadow-red-500/20'
} as const

export const TEXT_COLOR_STYLES = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
} as const

export const BORDER_COLOR_STYLES = {
  default: 'border-neutral-100/40 dark:border-zinc-700/60',
  primary: 'border-blue-500',
  secondary: 'border-indigo-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  danger: 'border-red-500'
} as const

const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items = [],
      variant = 'default',
      size = 'md',
      color = 'default',
      rounded = 'md',
      separator = '/',
      collapsible = false,
      className,
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const navId = \`breadcrumbs-\${autoId}\`

    const [selected, setSelected] = useState(items[0]?.label)
    const handleClick = useCallback((label: string) => setSelected(label), [])

    const variantClass = VARIANT_STYLES[variant]
    const sizeClass = SIZE_STYLES[size]
    const roundingClass = ROUNDING_STYLES[rounded]
    const bgClass = COLOR_BG_STYLES[color]
    const textClass = TEXT_COLOR_STYLES[color]
    const borderClass = BORDER_COLOR_STYLES[color]

    const renderItem = (item: BreadcrumbItemProps, isLast: boolean) => (
      <li key={item.label} className='flex items-center'>
        <BreadcrumbItem
          label={item.label}
          href={item.href}
          icon={item.icon}
          selected={item.label === selected}
          sizeClass={sizeClass}
          roundedClass={roundingClass}
          colorClass={textClass}
          onClick={() => handleClick(item.label)}
        />
        {!isLast && (
          <BreadcrumbSeparator
            separator={separator}
            colorClass={textClass}
            aria-hidden='true'
          />
        )}
      </li>
    )

    const renderCollapsed = () => {
      const first = items[0]
      const last = items[items.length - 1]
      return [
        renderItem(first, false),
        <li
          key='ellipsis'
          className={clsx('mx-2', textClass)}
          aria-hidden='true'
        >
          …
        </li>,
        renderItem(last, true)
      ]
    }

    const displayItems =
      collapsible && items.length > 2
        ? renderCollapsed()
        : items.map((item, idx) => renderItem(item, idx === items.length - 1))

    return (
      <nav
        id={navId}
        ref={ref}
        role='navigation'
        aria-label='Breadcrumb'
        className={clsx('flex mx-auto p-2', className)}
        {...props}
      >
        <ul
          className={clsx(
            'flex items-center gap-2 px-2 mx-auto',
            variantClass,
            roundingClass,
            variant === 'bordered' ? borderClass : bgClass
          )}
          role='list'
        >
          {displayItems}
        </ul>
      </nav>
    )
  }
)

export default memo(Breadcrumbs)

`

export const ButtonTs = `import { useMemo, memo } from 'react'
import type { FC, ReactNode, MouseEvent } from 'react'
import clsx from 'clsx'

export type ButtonVariant = 'default' | 'bordered' | 'light' | 'complete'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type ButtonColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export interface LoadingSpinnerProps {
  color: ButtonColor
}

export interface ButtonProps {
  variant?: ButtonVariant
  disabled?: boolean
  size?: ButtonSize
  rounded?: ButtonRounded
  color?: ButtonColor
  isLoading?: boolean
  onClick?: () => void
  children?: ReactNode
  className?: string
}

const VARIANTS: Record<ButtonVariant, string> = {
  default: 'border-0 shadow-md backdrop-blur-sm',
  bordered: 'border border-current shadow-md',
  light: '',
  complete: 'backdrop-blur-xl'
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-lg'
}

const ROUNDEDS: Record<ButtonRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const COLORS: Record<ButtonColor, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/5',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/30',
  danger: 'bg-red-500/20'
}

const SHADOW_COLORS: Record<ButtonColor, string> = {
  default: 'shadow-lg shadow-zinc-700/30 dark:shadow-neutral-100/20',
  primary: 'shadow-lg shadow-blue-500/20',
  secondary: 'shadow-lg shadow-indigo-500/20',
  success: 'shadow-lg shadow-green-500/30',
  warning: 'shadow-lg shadow-yellow-500/20',
  danger: 'shadow-lg shadow-red-500/20'
}

const TEXT_COLORS: Record<ButtonColor, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-600',
  secondary: 'text-indigo-800 dark:text-indigo-600',
  success: 'text-green-800 dark:text-green-600',
  warning: 'text-yellow-800 dark:text-yellow-600',
  danger: 'text-red-800 dark:text-red-500'
}

const ICON_COLORS: Record<ButtonColor, string> = {
  default: 'fill-gray-800 dark:fill-gray-300',
  primary: 'fill-blue-800 dark:fill-blue-500',
  secondary: 'fill-indigo-800 dark:fill-indigo-500',
  success: 'fill-green-800 dark:fill-green-500',
  warning: 'fill-yellow-800 dark:fill-yellow-500',
  danger: 'fill-red-800 dark:fill-red-500'
}

const HOVER_COLORS: Record<ButtonColor, string> = {
  default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10',
  primary: 'hover:bg-blue-500/30',
  secondary: 'hover:bg-indigo-500/40',
  success: 'hover:bg-green-500/50',
  warning: 'hover:bg-yellow-500/60',
  danger: 'hover:bg-red-500/30'
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ color }) => (
  <svg
    className={clsx('animate-spin h-5 w-5', ICON_COLORS[color])}
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    aria-hidden='true'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth={4}
    />
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    />
  </svg>
)

const Button: FC<ButtonProps> = ({
  variant = 'default',
  disabled = false,
  size = 'md',
  rounded = 'md',
  color = 'default',
  isLoading = false,
  onClick,
  children,
  className,
  ...props
}) => {
  const isDisabled = disabled || isLoading

  const buttonClasses = useMemo(
    () =>
      clsx(
        'group inline-flex items-center justify-center font-medium text-center',
        'transition-all duration-300',
        VARIANTS[variant],
        SIZES[size],
        ROUNDEDS[rounded],
        {
          [COLORS[color]]: !['bordered', 'light'].includes(variant),
          [SHADOW_COLORS[color]]: variant === 'complete',
          [TEXT_COLORS[color]]: variant !== 'complete',
          'text-black dark:text-white': variant === 'complete',
          'bg-transparent': ['bordered', 'light'].includes(variant),
          [HOVER_COLORS[color]]: !isDisabled,
          'opacity-50 cursor-not-allowed': isDisabled,
          'gap-2': isLoading
        },
        className
      ),
    [variant, size, rounded, color, isDisabled, isLoading, className]
  )

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClasses}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      aria-label={isLoading ? 'Cargando...' : undefined}
      {...props}
    >
      {isLoading && <LoadingSpinner color={color} />}
      {children}
    </button>
  )
}

export default memo(Button)

`

export const ButtonGroupTs = `import { useMemo, memo, type FC } from 'react'
import clsx from 'clsx'

export type ButtonGroupVariant = 'default' | 'bordered' | 'light'
export type ButtonGroupColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type ButtonGroupSize = 'sm' | 'md' | 'lg' | 'xl'
export type ButtonGroupRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type ButtonGroupItem = {
  id?: string | number
  label: string
  icon?: FC<{ className?: string }>
  onClick?: () => void
  disabled?: boolean
}

export interface ButtonGroupProps {
  buttons: ButtonGroupItem[]
  variant?: ButtonGroupVariant
  color?: ButtonGroupColor
  size?: ButtonGroupSize
  rounded?: ButtonGroupRounded
  disabled?: boolean
  className?: string
}

const VARIANTS: Record<ButtonGroupVariant, string> = {
  default: 'border-0 shadow-md backdrop-blur-sm',
  bordered: 'border border-current',
  light: ''
}

const COLORS: Record<ButtonGroupColor, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS: Record<ButtonGroupColor, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const ICON_COLORS: Record<ButtonGroupColor, string> = {
  default: 'fill-gray-800 dark:fill-gray-300',
  primary: 'fill-blue-800 dark:fill-blue-500',
  secondary: 'fill-indigo-800 dark:fill-indigo-500',
  success: 'fill-green-800 dark:fill-green-500',
  warning: 'fill-yellow-800 dark:fill-yellow-500',
  danger: 'fill-red-800 dark:fill-red-500'
}

const HOVER_COLORS: Record<ButtonGroupColor, string> = {
  default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/30',
  success: 'hover:bg-green-500/60 dark:hover:bg-green-500/40',
  warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/30',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
}

const SHADOW_COLORS: Record<ButtonGroupColor, string> = {
  default: 'shadow-md shadow-zinc-700/30 dark:shadow-neutral-100/20',
  primary: 'shadow-md shadow-blue-500/20',
  secondary: 'shadow-md shadow-indigo-500/20',
  success: 'shadow-md shadow-green-500/30',
  warning: 'shadow-md shadow-yellow-500/30',
  danger: 'shadow-md shadow-red-500/20'
}

const SIZES: Record<ButtonGroupSize, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-lg'
}

const ROUNDED: Record<ButtonGroupRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const ROUNDED_START: Record<ButtonGroupRounded, string> = {
  none: 'rounded-s-none',
  sm: 'rounded-s-sm',
  md: 'rounded-s-md',
  lg: 'rounded-s-lg',
  full: 'rounded-s-full'
}

const ROUNDED_END: Record<ButtonGroupRounded, string> = {
  none: 'rounded-e-none',
  sm: 'rounded-e-sm',
  md: 'rounded-e-md',
  lg: 'rounded-e-lg',
  full: 'rounded-e-full'
}

const ButtonIcon: FC<{
  color: ButtonGroupColor
  icon: FC<{ className?: string }>
}> = ({ color, icon: Icon }) => (
  <Icon className={clsx('w-5 h-5', ICON_COLORS[color])} aria-hidden='true' />
)

const ButtonGroup: FC<ButtonGroupProps> = ({
  buttons,
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md',
  disabled = false,
  className,
  ...props
}) => {
  const groupClasses = useMemo(
    () =>
      clsx(
        'inline-flex overflow-hidden',
        SHADOW_COLORS[color],
        ROUNDED[rounded],
        className
      ),
    [color, rounded, className]
  )

  const buttonClasses = useMemo(
    () =>
      clsx(
        'inline-flex gap-x-1 items-center font-medium transition-all duration-300',
        VARIANTS[variant],
        SIZES[size],
        TEXT_COLORS[color],
        HOVER_COLORS[color],
        {
          [COLORS[color]]: !['bordered', 'light'].includes(variant),
          'bg-transparent': ['bordered', 'light'].includes(variant),
          'opacity-50 cursor-not-allowed': disabled
        }
      ),
    [variant, color, size, disabled]
  )

  return (
    <div
      className={groupClasses}
      role='group'
      aria-label='Button group'
      {...props}
    >
      {buttons.map((button, index) => (
        <button
          key={button.id ?? index}
          type='button'
          className={clsx(
            buttonClasses,
            index === 0 ? ROUNDED_START[rounded] : 'border-l-0',
            index === buttons.length - 1 && ROUNDED_END[rounded]
          )}
          onClick={button.onClick}
          aria-label={button.label}
          disabled={disabled || button.disabled}
          aria-disabled={disabled || button.disabled}
        >
          {typeof button.icon === 'function' && (
            <ButtonIcon color={color} icon={button.icon} />
          )}
          {button.label}
        </button>
      ))}
    </div>
  )
}

export default memo(ButtonGroup)

`

export const CheckboxTs = `import { useState, type KeyboardEvent, type FC } from 'react'
import clsx from 'clsx'

export type CheckboxVariant = 'default' | 'bordered' | 'light'
export type CheckboxColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type CheckboxSize = 'sm' | 'md' | 'lg' | 'xl'
export type CheckboxRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'

export interface CheckboxProps {
  id: string
  label: string
  variant?: CheckboxVariant
  color?: CheckboxColor
  size?: CheckboxSize
  rounded?: CheckboxRounded
  checked?: boolean
  disabled?: boolean
  onChange?: () => void
}

const STYLES = {
  variants: {
    default: 'border-0 shadow-lg backdrop-blur-sm',
    bordered: 'border shadow-md',
    light: ''
  } as Record<CheckboxVariant, string>,
  colors: {
    default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
    primary: 'bg-blue-500/20',
    secondary: 'bg-indigo-500/20',
    success: 'bg-green-500/30',
    warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
    danger: 'bg-red-500/20'
  } as Record<CheckboxColor, string>,
  checkColors: {
    default: 'bg-neutral-100/50 dark:bg-zinc-700/50',
    primary: 'bg-blue-500/30',
    secondary: 'bg-indigo-500/30',
    success: 'bg-green-500/40',
    warning: 'bg-yellow-500/50 dark:bg-yellow-500/20',
    danger: 'bg-red-500/30'
  } as Record<CheckboxColor, string>,
  textColors: {
    default: 'text-gray-800 dark:text-gray-300',
    primary: 'text-blue-800 dark:text-blue-500',
    secondary: 'text-indigo-800 dark:text-indigo-500',
    success: 'text-green-800 dark:text-green-500',
    warning: 'text-yellow-800 dark:text-yellow-500',
    danger: 'text-red-800 dark:text-red-500'
  } as Record<CheckboxColor, string>,
  borderColors: {
    default: 'border-gray-800 dark:border-gray-300',
    primary: 'border-blue-800 dark:border-blue-500',
    secondary: 'border-indigo-800 dark:border-indigo-500',
    success: 'border-green-800 dark:border-green-500',
    warning: 'border-yellow-800 dark:border-yellow-500',
    danger: 'border-red-800 dark:border-red-500'
  } as Record<CheckboxColor, string>,
  hoverColors: {
    default: 'hover:bg-neutral-100 dark:hover:bg-zinc-700/20',
    primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
    secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
    success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
    warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
    danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
  } as Record<CheckboxColor, string>,
  sizes: {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
    xl: 'px-6 py-3.5 text-lg'
  } as Record<CheckboxSize, string>,
  roundeds: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  } as Record<CheckboxRounded, string>
}

const Checkbox: FC<CheckboxProps> = ({
  id,
  label,
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'lg',
  checked = false,
  disabled = false,
  onChange
}) => {
  const [internalChecked, setInternalChecked] = useState<boolean>(checked)

  const handleChange = () => {
    if (disabled) return
    setInternalChecked((prev) => !prev)
    onChange?.()
  }

  const containerClasses = clsx(
    'flex items-center transition-colors',
    STYLES.roundeds[rounded],
    STYLES.variants[variant],
    variant === 'default' && STYLES.colors[color],
    variant !== 'light' && STYLES.sizes[size],
    variant === 'bordered' && STYLES.borderColors[color],
    disabled && 'opacity-50'
  )

  const checkboxClasses = clsx(
    'relative w-5 h-5 flex items-center justify-center transition-all',
    STYLES.checkColors[color],
    STYLES.roundeds[rounded],
    STYLES.textColors[color],
    !disabled && !internalChecked && STYLES.hoverColors[color],
    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      handleChange()
    }
  }

  return (
    <div className={containerClasses}>
      <div
        id={id}
        role='checkbox'
        aria-checked={internalChecked}
        aria-labelledby={\`\${id}-label\`}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={checkboxClasses}
        onClick={handleChange}
        onKeyDown={handleKeyDown}
      >
        {internalChecked && (
          <svg
            aria-hidden='true'
            className='w-full h-full animate-fade-in'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5 13l4 4L19 7'
            />
          </svg>
        )}
      </div>
      <label
        id={\`\${id}-label\`}
        htmlFor={id}
        onClick={handleChange}
        className={clsx(
          'ms-2 select-none',
          !disabled && 'cursor-pointer',
          STYLES.textColors[color],
          disabled && 'cursor-not-allowed'
        )}
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox

`

export const CheckboxGroupTs = `import { useState, useEffect, useCallback, useId, memo, type FC } from 'react'
import clsx from 'clsx'
import Checkbox from '@/components/ts/Checkbox'

export type CheckboxGroupVariant = 'default' | 'bordered' | 'light'
export type CheckboxGroupColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type CheckboxGroupSize = 'sm' | 'md' | 'lg' | 'xl'
export type CheckboxGroupRounded = 'none' | 'sm' | 'md' | 'lg'
export type CheckboxGroupOrientation = 'horizontal' | 'vertical'

export interface CheckboxItem {
  id: string | number
  label: string
  checked: boolean
  disabled?: boolean
}

export interface CheckboxGroupProps {
  title?: string
  checkboxes: CheckboxItem[]
  variant?: CheckboxGroupVariant
  color?: CheckboxGroupColor
  size?: CheckboxGroupSize
  rounded?: CheckboxGroupRounded
  orientation?: CheckboxGroupOrientation
  onChange?: (updated: CheckboxItem[]) => void
}

const variants: Record<CheckboxGroupVariant, string> = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const colors: Record<CheckboxGroupColor, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const textColors: Record<CheckboxGroupColor, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const borderColors: Record<CheckboxGroupColor, string> = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const sizes: Record<CheckboxGroupSize, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-lg'
}

const roundeds: Record<CheckboxGroupRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg'
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  title = '',
  checkboxes,
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md',
  orientation = 'horizontal',
  onChange
}) => {
  const [checkboxStates, setCheckboxStates] =
    useState<CheckboxItem[]>(checkboxes)
  const groupId = useId()
  const titleId = \`\${groupId}-label\`

  useEffect(() => {
    setCheckboxStates(checkboxes)
  }, [checkboxes])

  const handleCheckboxChange = useCallback(
    (id: string | number) => {
      setCheckboxStates((prev) => {
        const updated = prev.map((cb) =>
          cb.id === id ? { ...cb, checked: !cb.checked } : cb
        )
        onChange?.(updated)
        return updated
      })
    },
    [onChange]
  )

  const containerClasses = clsx(
    'flex flex-col gap-2',
    variants[variant],
    sizes[size],
    textColors[color],
    {
      [colors[color]]: variant === 'default',
      [borderColors[color]]: variant === 'bordered',
      [roundeds[rounded]]: variant !== 'light'
    }
  )

  return (
    <div
      className={containerClasses}
      role='group'
      aria-labelledby={title ? titleId : undefined}
    >
      {title && (
        <h3 id={titleId} className='text-lg font-semibold'>
          {title}
        </h3>
      )}

      <div
        className={clsx(
          'flex gap-2',
          orientation === 'vertical' ? 'flex-col' : 'flex-row'
        )}
      >
        {checkboxStates.map(({ id, label, checked, disabled }) => (
          <Checkbox
            key={id}
            id={String(id)}
            label={label}
            checked={checked}
            disabled={disabled}
            variant='light'
            color={color}
            size={size}
            onChange={() => handleCheckboxChange(id)}
            aria-checked={checked}
            aria-disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(CheckboxGroup)

`

export const CodeTs = `import { useState, useCallback, memo, type FC } from 'react'
import clsx from 'clsx'

export type CodeVariant = 'default' | 'bordered' | 'light'
export type CodeColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type CodeSize = 'sm' | 'md' | 'lg' | 'xl'
export type CodeRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'

export interface CodeProps {
  codeString: string
  language?: string
  variant?: CodeVariant
  color?: CodeColor
  size?: CodeSize
  rounded?: CodeRounded
}

interface IconProps {
  colorClass: string
}

const VARIANTS: Record<CodeVariant, string> = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const COLORS: Record<CodeColor, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS: Record<CodeColor, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const HOVER_COLORS: Record<CodeColor, string> = {
  default: 'hover:bg-neutral-100 dark:hover:bg-zinc-700/50',
  primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
  secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
  success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
  warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
  danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
}

const BORDER_COLORS: Record<CodeColor, string> = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const SIZES: Record<CodeSize, string> = {
  sm: 'text-xs px-1 py-1',
  md: 'text-sm px-2 py-1.5',
  lg: 'text-base px-4 py-2',
  xl: 'text-base px-6 py-2.5'
}

const ROUNDED: Record<CodeRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const CopyIcon: FC<IconProps> = memo(({ colorClass }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={clsx('size-4', colorClass)}
    role='img'
    aria-hidden='true'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' />
    <path d='M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1' />
  </svg>
))

const CheckIcon: FC<IconProps> = memo(({ colorClass }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={clsx('size-4', colorClass)}
    role='img'
    aria-hidden='true'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' />
    <path d='M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1' />
    <path d='M11 14l2 2l4 -4' />
  </svg>
))

const Code: FC<CodeProps> = ({
  codeString,
  language = 'bash',
  variant = 'default',
  color = 'default',
  size = 'md',
  rounded = 'md'
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }, [codeString])

  const containerClasses = clsx(
    'inline-flex justify-between items-center gap-x-4 overflow-x-auto',
    VARIANTS[variant],
    SIZES[size],
    ROUNDED[rounded],
    variant === 'bordered' && BORDER_COLORS[color],
    variant === 'default' && COLORS[color],
    TEXT_COLORS[color],
    'font-mono'
  )

  const buttonClasses = clsx(
    'flex text-white px-1.5 py-1 rounded-lg transition-opacity duration-200',
    'hover:animate-squeeze duration-300 ease-out',
    HOVER_COLORS[color]
  )

  return (
    <div className={containerClasses} role='region' aria-label='Code block'>
      <pre className='flex-1' aria-live='polite'>
        <code className={\`language-\${language}\`}>{codeString}</code>
      </pre>

      <button
        onClick={handleCopy}
        className={buttonClasses}
        aria-label={copied ? 'Copied!' : 'Copy code'}
        disabled={copied}
      >
        {copied ? (
          <CheckIcon colorClass={TEXT_COLORS[color]} />
        ) : (
          <CopyIcon colorClass={TEXT_COLORS[color]} />
        )}
      </button>
    </div>
  )
}

export default memo(Code)

`

export const DateInputTs = `import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type FC,
  type ChangeEvent
} from 'react'
import clsx from 'clsx'

export type DateInputVariant = 'default' | 'bordered' | 'light'
export type DateInputColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type DateInputRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type DateInputSize = 'sm' | 'md' | 'lg'

export interface DateInputProps {
  label?: string
  value?: string
  variant?: DateInputVariant
  color?: DateInputColor
  rounded?: DateInputRounded
  size?: DateInputSize
  icon?: boolean
  disabled?: boolean
  onChange?: (newValue: string) => void
}

const VARIANTS: Record<DateInputVariant, string> = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const COLORS: Record<DateInputColor, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS: Record<DateInputColor, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
}

const BORDER_COLORS: Record<DateInputColor, string> = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const HOVER_COLORS: Record<DateInputColor, string> = {
  default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/20',
  primary: 'hover:bg-blue-500/50 dark:hover:bg-blue-500/50',
  secondary: 'hover:bg-indigo-500/50 dark:hover:bg-indigo-500/50',
  success: 'hover:bg-green-500/80 dark:hover:bg-green-500/60',
  warning: 'hover:bg-yellow-500/80 dark:hover:bg-yellow-500/50',
  danger: 'hover:bg-red-500/50 dark:hover:bg-red-500/50'
}

const SIZES: Record<DateInputSize, string> = {
  sm: 'text-xs p-2',
  md: 'text-sm p-3',
  lg: 'text-base p-4'
}

const ROUNDEDS: Record<DateInputRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const DateInput: FC<DateInputProps> = ({
  label = '',
  value = '',
  variant = 'default',
  color = 'default',
  rounded = 'md',
  size = 'md',
  icon = true,
  disabled = false,
  onChange
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(value)
  const datePickerRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSelectedDate(value)
  }, [value])

  const handleDateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedDate(e.target.value)
      onChange?.(e.target.value)
    },
    [onChange]
  )

  const containerClasses = clsx(
    'flex flex-col gap-2 transition-all duration-300 ease-in-out',
    TEXT_COLORS[color],
    SIZES[size],
    VARIANTS[variant],
    ROUNDEDS[rounded],
    {
      [COLORS[color]]: variant === 'default',
      [BORDER_COLORS[color]]: variant === 'bordered',
      [HOVER_COLORS[color]]: !disabled && variant !== 'light',
      'opacity-50 cursor-not-allowed': disabled,
      'bg-transparent': variant === 'light'
    }
  )

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor='date-input' className='font-medium select-none'>
          {label}
        </label>
      )}

      <div
        className='w-full flex items-center gap-2 cursor-pointer'
        onClick={() => !disabled && datePickerRef.current?.showPicker()}
      >
        <input
          id='date-input'
          type='date'
          ref={datePickerRef}
          value={selectedDate}
          onChange={handleDateChange}
          disabled={disabled}
          aria-label={label || 'Select date'}
          aria-disabled={disabled}
          className={clsx(
            'w-full bg-transparent focus:outline-none',
            'text-inherit placeholder:text-current',
            '[&::-webkit-calendar-picker-indicator]:opacity-0',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        />

        {icon && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={clsx(
              'size-5 shrink-0',
              disabled && 'cursor-not-allowed'
            )}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
            role='img'
            aria-label='Date picker icon'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8 7V3m8 4V3m-9 9h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
        )}
      </div>
    </div>
  )
}

export default DateInput

`

export const ImageTs = `import type { FC } from 'react'
import clsx from 'clsx'

export type ImageFilter = 'none' | 'blur' | 'grayscale' | 'sepia'
export type ImageRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ImageShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface ImageProps {
  imageSrc: string
  alt?: string
  zoomedWrapper?: boolean
  filter?: ImageFilter
  rounded?: ImageRounded
  shadow?: ImageShadow
  className?: string
}

const FILTERS: Record<ImageFilter, string> = {
  none: '',
  blur: 'blur-lg',
  grayscale: 'grayscale',
  sepia: 'sepia'
}

const ROUNDEDS: Record<ImageRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
}

const SHADOWS: Record<ImageShadow, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl'
}

const ZOOM_EFFECT =
  'transition-transform duration-500 ease-in-out transform group-hover:scale-110'

const Image: FC<ImageProps> = ({
  imageSrc,
  alt = 'Image preview',
  zoomedWrapper = false,
  filter = 'none',
  rounded = 'md',
  shadow = 'md',
  className
}) => {
  const imageClasses = clsx(
    'object-cover',
    FILTERS[filter],
    ROUNDEDS[rounded],
    {
      [ZOOM_EFFECT]: zoomedWrapper && filter !== 'blur',
      'w-full h-full': !className
    },
    className
  )

  return (
    <div className={clsx('relative')}>
      <div
        className={clsx(
          'overflow-hidden group',
          ROUNDEDS[rounded],
          SHADOWS[shadow],
          'dark:shadow-neutral-100/20'
        )}
      >
        <img src={imageSrc} alt={alt} className={imageClasses} />

        {filter === 'blur' && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <img
              src={imageSrc}
              alt=''
              className={clsx(
                'size-6/7 object-cover shadow-lg',
                ROUNDEDS[rounded],
                { [ZOOM_EFFECT]: zoomedWrapper }
              )}
              aria-hidden='true'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Image

`

export const LinkTs = `import { useMemo, memo, type FC, type ReactNode } from 'react'
import clsx from 'clsx'

export type LinkVariant = 'default' | 'bordered' | 'light'
export type LinkColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type LinkSize = 'sm' | 'md' | 'lg'
export type LinkRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type LinkUnderline = 'none' | 'hover' | 'always' | 'active'

export interface LinkProps {
  variant?: LinkVariant
  color?: LinkColor
  rounded?: LinkRounded
  size?: LinkSize
  underline?: LinkUnderline
  isDisabled?: boolean
  isExternal?: boolean
  defaultIcon?: boolean
  href?: string
  ariaLabel?: string
  children?: ReactNode
}

const VARIANTS: Record<LinkVariant, string> = {
  default: 'border-0 shadow-md backdrop-blur-sm px-3 py-1',
  bordered: 'border shadow-lg px-3 py-1',
  light: ''
}

const COLORS: Record<LinkColor, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS: Record<LinkColor, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-600',
  secondary: 'text-indigo-800 dark:text-indigo-600',
  success: 'text-green-800 dark:text-green-600',
  warning: 'text-yellow-800 dark:text-yellow-600',
  danger: 'text-red-800 dark:text-red-500'
}

const BORDER_COLORS: Record<LinkColor, string> = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const SIZE_STYLES: Record<LinkSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

const ICON_SIZE_STYLES: Record<LinkSize, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6'
}

const ROUNDEDS: Record<LinkRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const UNDERLINE_STYLES: Record<LinkUnderline, string> = {
  none: 'no-underline',
  hover: 'hover:underline',
  always: 'underline',
  active: 'active:underline'
}

const DefaultIcon: FC<{ size: LinkSize }> = ({ size }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={ICON_SIZE_STYLES[size]}
    aria-hidden='true'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M9 15l6 -6' />
    <path d='M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464' />
    <path d='M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463' />
  </svg>
)

const Link: FC<LinkProps> = ({
  variant = 'light',
  color = 'default',
  rounded = 'md',
  size = 'md',
  underline = 'hover',
  isDisabled = false,
  isExternal = false,
  defaultIcon = false,
  href = '#',
  ariaLabel = undefined,
  children
}) => {
  const className = useMemo(
    () =>
      clsx(
        'flex items-center justify-center text-center gap-2 transition-colors duration-200',
        VARIANTS[variant],
        SIZE_STYLES[size],
        TEXT_COLORS[color],
        UNDERLINE_STYLES[underline],
        {
          [COLORS[color]]: variant === 'default',
          [BORDER_COLORS[color]]: variant === 'bordered',
          [ROUNDEDS[rounded]]: variant !== 'light',
          'opacity-50 cursor-not-allowed': isDisabled
        }
      ),
    [variant, color, size, rounded, underline, isDisabled]
  )

  return (
    <a
      className={className}
      href={isDisabled ? undefined : href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
    >
      {children}
      {defaultIcon && <DefaultIcon size={size} />}
    </a>
  )
}

export default memo(Link)

`

export const SliderTs = `import {
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
    [orientation === 'horizontal' ? 'left' : 'top']: \`\${
      orientation === 'vertical'
        ? 100 - calculatePercentage()
        : calculatePercentage()
    }%\`
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
                  : 'height']: \`\${calculatePercentage()}%\`
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

`

export const SpinnerTs = `import { memo, type FC } from 'react'

type Variant = keyof typeof SpinnerConfig.variants
type Size = keyof typeof SpinnerConfig.sizes
type Color = keyof typeof SpinnerConfig.colors

export interface SpinnerProps {
  label?: string
  variant?: Variant
  size?: Size
  color?: Color
  textColor?: Color
}

const SpinnerConfig = {
  variants: {
    default: 'backdrop-blur-sm shadow-lg',
    light: ''
  },
  sizes: {
    xs: 'size-4',
    sm: 'size-6',
    md: 'size-8',
    lg: 'size-10',
    xl: 'size-12'
  },
  colors: {
    default: {
      firstCircle: 'border-zinc-500',
      secondCircle: 'border-zinc-400',
      text: 'text-gray-800 dark:text-gray-300'
    },
    primary: {
      firstCircle: 'border-blue-500',
      secondCircle: 'border-blue-300',
      text: 'text-blue-800 dark:text-blue-600'
    },
    secondary: {
      firstCircle: 'border-indigo-500',
      secondCircle: 'border-indigo-300',
      text: 'text-indigo-800 dark:text-indigo-600'
    },
    success: {
      firstCircle: 'border-green-500',
      secondCircle: 'border-green-300',
      text: 'text-green-800 dark:text-green-600'
    },
    warning: {
      firstCircle: 'border-yellow-500',
      secondCircle: 'border-yellow-300',
      text: 'text-yellow-800 dark:text-yellow-600'
    },
    danger: {
      firstCircle: 'border-red-500',
      secondCircle: 'border-red-300',
      text: 'text-red-800 dark:text-red-500'
    }
  }
} as const

const Spinner: FC<SpinnerProps> = ({
  label,
  variant = 'default',
  size = 'md',
  color = 'default',
  textColor = color
}) => {
  const { variants, sizes, colors } = SpinnerConfig

  return (
    <div
      className='flex flex-col items-center justify-center space-y-2'
      role='status'
      aria-live='polite'
      aria-label={label || 'Loading'}
    >
      <div
        className={\`relative rounded-full \${variants[variant]} \${sizes[size]}\`}
      >
        <div
          className={\`absolute w-full h-full rounded-full border-4 border-t-transparent border-r-transparent border-l-transparent \${colors[color].firstCircle} animate-spin\`}
        />
        <div
          className={\`absolute w-full h-full rounded-full border-4 border-t-transparent border-b-transparent border-l-transparent \${colors[color].secondCircle} animate-spin\`}
        />
      </div>
      {label && (
        <span className={\`text-sm \${colors[textColor].text}\`}>{label}</span>
      )}
    </div>
  )
}

export default memo(Spinner)

`

export const SwitchTs = `import {
  useState,
  useCallback,
  useId,
  useMemo,
  type FC,
  type ReactNode,
  type ChangeEvent,
  type KeyboardEvent
} from 'react'

export type Color = keyof typeof COLOR_STYLES
export type TextColor = keyof typeof TEXT_COLORS
export type Rounded = keyof typeof ROUNDED_STYLES
export type Size = keyof typeof SIZE_STYLES

export interface SwitchProps {
  label?: string
  startContent?: ReactNode
  endContent?: ReactNode
  thumbIcon?: ReactNode
  isSelected?: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
  color?: Color
  textColor?: TextColor
  rounded?: Rounded
  size?: Size
  className?: string
  id?: string
  onChange?: (selected: boolean) => void
}

export const COLOR_STYLES = {
  default: 'bg-zinc-700/30 dark:bg-neutral-100/30 dark:shadow-zinc-700/20',
  primary: 'bg-blue-500/50',
  secondary: 'bg-indigo-500/50',
  success: 'bg-green-500/50',
  warning: 'bg-yellow-500/50',
  danger: 'bg-red-500/50'
} as const

export const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-600',
  secondary: 'text-indigo-800 dark:text-indigo-600',
  success: 'text-green-800 dark:text-green-600',
  warning: 'text-yellow-800 dark:text-yellow-600',
  danger: 'text-red-800 dark:text-red-500'
} as const

export const ROUNDED_STYLES = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
} as const

export const SIZE_STYLES = {
  sm: 'h-6 w-11',
  md: 'h-8 w-16',
  lg: 'h-9 w-16',
  xl: 'h-10 w-20'
} as const

export const TEXT_SIZES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
} as const

export const CIRCLE_SIZES = {
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-7',
  xl: 'size-9'
} as const

export const CIRCLE_TRANSLATE = {
  sm: 'translate-x-4',
  md: 'translate-x-8',
  lg: 'translate-x-7',
  xl: 'translate-x-9'
} as const

export const CONTENT_SIZES = {
  sm: 'text-sm size-5',
  md: 'text-base size-6',
  lg: 'text-lg size-7',
  xl: 'text-xl size-9'
} as const

const Switch: FC<SwitchProps> = ({
  label,
  startContent,
  endContent,
  thumbIcon,
  isSelected = false,
  isReadOnly = false,
  isDisabled = false,
  color = 'default',
  textColor = 'default',
  rounded = 'full',
  size = 'md',
  className = '',
  id = useId(),
  onChange
}) => {
  const [internalSelected, setInternalSelected] = useState(isSelected)

  const handleToggle = useCallback(() => {
    if (isReadOnly || isDisabled) return
    const newValue = !internalSelected
    setInternalSelected(newValue)
    onChange?.(newValue)
  }, [internalSelected, isDisabled, isReadOnly, onChange])

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (isReadOnly || isDisabled) return
      const newValue = e.target.checked
      setInternalSelected(newValue)
      onChange?.(newValue)
    },
    [isDisabled, isReadOnly, onChange]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!isReadOnly && !isDisabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        handleToggle()
      }
    },
    [handleToggle, isDisabled, isReadOnly]
  )

  const containerClasses = useMemo(
    () =>
      \`flex items-center space-x-2 \${
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } \${className}\`,
    [className, isDisabled]
  )

  const trackClasses = useMemo(
    () =>
      \`flex items-center border-0 shadow-xl backdrop-blur-md transition-colors duration-500 ease-in-out relative
      \${internalSelected ? COLOR_STYLES[color] : 'bg-gray-300'}
      \${ROUNDED_STYLES[rounded]}
      \${SIZE_STYLES[size]}\`,
    [internalSelected, color, rounded, size]
  )

  const thumbClasses = useMemo(
    () =>
      \`absolute bg-neutral-100 shadow-lg duration-500 ease-in-out transition-transform
      \${internalSelected ? CIRCLE_TRANSLATE[size] : 'translate-x-0'}
      \${CIRCLE_SIZES[size]}
      \${ROUNDED_STYLES[rounded]}\`,
    [internalSelected, size, rounded]
  )

  return (
    <div
      className={containerClasses}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role='switch'
      aria-checked={internalSelected}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
    >
      {label && (
        <label
          htmlFor={id}
          className={\`\${TEXT_SIZES[size]} \${TEXT_COLORS[textColor]}\`}
        >
          {label}
        </label>
      )}
      <div className={trackClasses}>
        <input
          type='checkbox'
          id={id}
          className='hidden'
          checked={internalSelected}
          onChange={handleInputChange}
          readOnly={isReadOnly}
          disabled={isDisabled}
        />
        <div className='flex items-center justify-between w-full px-1'>
          {startContent && (
            <span
              className={\`flex items-center justify-center \${CONTENT_SIZES[size]}\`}
            >
              {startContent}
            </span>
          )}
          <div className={thumbClasses}>
            {thumbIcon && (
              <span
                className={\`flex items-center justify-center \${CONTENT_SIZES[size]}\`}
              >
                {thumbIcon}
              </span>
            )}
          </div>
          {endContent && (
            <span
              className={\`flex items-center justify-center \${CONTENT_SIZES[size]}\`}
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

export const TextareaTs = `import {
  useState,
  useId,
  useCallback,
  forwardRef,
  type ChangeEvent,
  type TextareaHTMLAttributes
} from 'react'
import clsx from 'clsx'

export type Variant = keyof typeof VARIANT_STYLES
export type Color = keyof typeof COLOR_STYLES

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string
  isRequired?: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
  defaultValue?: string
  variant?: Variant
  className?: string
}

export const VARIANT_STYLES = {
  default:
    'border-0 shadow-md backdrop-blur-sm bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  bordered: 'border border-gray-800 dark:border-gray-300 bg-transparent',
  light: 'bg-transparent'
} as const

export const COLOR_STYLES = {
  default:
    'text-zinc-800 dark:text-neutral-100 placeholder-zinc-800/30 dark:placeholder-neutral-100/30',
  danger: 'bg-red-500/20 text-red-800 dark:text-red-500'
} as const

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
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
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const textareaId = id || autoId

    const [value, setValue] = useState(defaultValue)
    const [isInvalid, setIsInvalid] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        setIsInvalid(isRequired && newValue.trim() === '')
        externalOnChange?.(e)
      },
      [externalOnChange, isRequired]
    )

    const handleFocus = useCallback(() => setIsFocused(true), [])
    const handleBlur = useCallback(() => {
      setIsFocused(false)
      setIsInvalid(isRequired && value.trim() === '')
    }, [isRequired, value])

    const containerClasses = clsx(
      'flex flex-col space-y-2',
      isDisabled && 'opacity-50 cursor-not-allowed',
      className
    )

    const textareaClasses = clsx(
      'w-full p-2 rounded-lg transition focus:outline-none',
      VARIANT_STYLES[variant],
      COLOR_STYLES.default,
      isInvalid && COLOR_STYLES.danger,
      isFocused && 'ring-2 ring-blue-500',
      isDisabled && 'bg-gray-100'
    )

    return (
      <div
        className={containerClasses}
        data-invalid={isInvalid}
        data-required={isRequired}
        data-readonly={isReadOnly}
        data-focus={isFocused}
        data-disabled={isDisabled}
      >
        {label && (
          <label
            htmlFor={textareaId}
            className={clsx('text-sm font-medium', COLOR_STYLES.default)}
          >
            {label}
            {isRequired && <span className='text-red-500'> *</span>}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          className={textareaClasses}
          placeholder={placeholder}
          value={value}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-invalid={isInvalid}
          aria-required={isRequired}
          aria-readonly={isReadOnly}
          aria-disabled={isDisabled}
          aria-describedby={description ? \`\${textareaId}-desc\` : undefined}
          aria-errormessage={
            isInvalid && errorMessage ? \`\${textareaId}-error\` : undefined
          }
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {description && (
          <p id={\`\${textareaId}-desc\`} className='text-sm'>
            {description}
          </p>
        )}

        {isInvalid && errorMessage && (
          <p
            id={\`\${textareaId}-error\`}
            className='text-sm text-red-800 dark:text-red-500'
            aria-live='assertive'
          >
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea

`

export const TooltipTs = `import React, {
  useState,
  useEffect,
  useId,
  useCallback,
  forwardRef,
  type ReactNode
} from 'react'
import clsx from 'clsx'

type Placement = keyof typeof POSITIONS
type Rounding = keyof typeof ROUNDINGS
type Color = keyof typeof BACKGROUNDS

export interface TooltipProps {
  children: ReactNode
  content: ReactNode
  color?: Color
  rounded?: Rounding
  placement?: Placement
  isDisabled?: boolean
  delay?: number
  className?: string
}

export const POSITIONS = {
  top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
} as const

export const ROUNDINGS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
} as const

export const BACKGROUNDS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
} as const

export const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
} as const

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      color = 'default',
      rounded = 'md',
      placement = 'top',
      isDisabled = false,
      delay = 300,
      className,
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const tooltipId = \`tooltip-\${autoId}\`

    const [isHovered, setIsHovered] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
      if (isDisabled) {
        setIsOpen(false)
        return
      }
      let timeout: ReturnType<typeof setTimeout>
      if (isHovered) {
        timeout = setTimeout(() => setIsOpen(true), delay)
      } else {
        setIsOpen(false)
      }
      return () => clearTimeout(timeout)
    }, [isHovered, isDisabled, delay])

    const handleMouseEnter = useCallback(() => setIsHovered(true), [])
    const handleMouseLeave = useCallback(() => setIsHovered(false), [])

    const tooltipClasses = clsx(
      'absolute z-50 border-0 shadow-md backdrop-blur-sm animate-fade-in whitespace-nowrap text-sm px-3 py-1',
      POSITIONS[placement],
      ROUNDINGS[rounded],
      BACKGROUNDS[color],
      TEXT_COLORS[color]
    )

    return (
      <div
        ref={ref}
        className={clsx('relative inline-flex', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-describedby={isOpen && !isDisabled ? tooltipId : undefined}
        {...props}
      >
        {children}
        {isOpen && !isDisabled && (
          <div
            id={tooltipId}
            role='tooltip'
            className={tooltipClasses}
            data-placement={placement}
            data-disabled={isDisabled}
            aria-hidden={!isOpen}
          >
            {content}
          </div>
        )}
      </div>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export default Tooltip

`

export const UserTs = `import { forwardRef, useId } from 'react'
import clsx from 'clsx'
import Avatar, { type DotPosition } from '@/components/ts/Avatar'

type Variant = keyof typeof VARIANT_STYLES
type Color = keyof typeof COLOR_STYLES
type TextColor = keyof typeof TEXT_COLOR_STYLES
type Size = keyof typeof SIZE_STYLES
type Rounding = keyof typeof ROUNDING_STYLES

export interface UserProps {
  avatarSrc?: string
  avatarAlt?: string
  avatarSize?: Size
  avatarRounded?: Rounding
  avatarBordered?: boolean
  avatarColor?: Color
  avatarDot?: boolean
  avatarDotColor?: Color
  avatarDotPosition?: DotPosition
  name?: string
  description?: string
  variant?: Variant
  color?: Color
  textColor?: TextColor
  size?: Size
  rounded?: Rounding
  className?: string
}

export const VARIANT_STYLES = {
  default: 'border-0 shadow-md backdrop-blur-sm',
  bordered: 'border border-current',
  light: ''
} as const

export const COLOR_STYLES = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
} as const

export const TEXT_COLOR_STYLES = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
} as const

export const SIZE_STYLES = {
  xs: 'p-1 space-x-2 text-xs',
  sm: 'p-2 space-x-3 text-sm',
  md: 'p-3 space-x-4 text-base',
  lg: 'p-4 space-x-5 text-lg',
  xl: 'p-5 space-x-6 text-xl'
} as const

export const ROUNDING_STYLES = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-2xl',
  full: 'rounded-full'
} as const

const User = forwardRef<HTMLDivElement, UserProps>(
  (
    {
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
      textColor = 'default',
      size = 'md',
      rounded = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const nameId = \`user-name-\${autoId}\`
    const descId = \`user-desc-\${autoId}\`

    const containerClasses = clsx(
      'flex items-center',
      VARIANT_STYLES[variant],
      variant === 'default' && COLOR_STYLES[color],
      TEXT_COLOR_STYLES[color],
      SIZE_STYLES[size],
      ROUNDING_STYLES[rounded],
      className
    )

    return (
      <div
        ref={ref}
        className={containerClasses}
        role='group'
        aria-labelledby={nameId}
        aria-describedby={descId}
        {...props}
      >
        <Avatar
          src={avatarSrc}
          name={name}
          alt={avatarAlt || \`Avatar of \${name}\`}
          size={avatarSize}
          rounded={avatarRounded}
          bordered={avatarBordered}
          color={avatarColor}
          dot={avatarDot}
          dotColor={avatarDotColor}
          dotPosition={avatarDotPosition}
        />

        <div className='flex flex-col'>
          <span id={nameId} className='font-semibold'>
            {name}
          </span>
          <span id={descId} className='font-normal'>
            {description}
          </span>
        </div>
      </div>
    )
  }
)

export default User

`

export const CardTs = `import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'

type Color = keyof typeof BG_COLORS
type Shadow = keyof typeof SHADOW_SIZES
type Rounding = keyof typeof ROUNDINGS
type MaxWidth = keyof typeof MAX_WIDTHS
type Padding = keyof typeof PADDINGS
type Height = keyof typeof HEIGHTS

export interface CardProps {
  children: ReactNode
  color?: Color
  imgBackground?: string
  isLink?: boolean
  href?: string
  rounded?: Rounding
  border?: boolean
  shadow?: Shadow
  maxWidth?: MaxWidth
  padding?: Padding
  height?: Height
  className?: string
  ariaLabel?: string
}

export const BG_COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/20',
  danger: 'bg-red-500/20'
} as const

export const HOVER_BG = {
  default: 'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/10',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/20',
  success: 'hover:bg-green-500/60 dark:hover:bg-green-500/30',
  warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/30',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
} as const

export const SHADOW_SIZES = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  xxl: 'shadow-2xl'
} as const

export const BORDER_COLORS = {
  default: 'border-neutral-100/40 dark:border-zinc-700/60',
  primary: 'border-blue-500',
  secondary: 'border-indigo-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  danger: 'border-red-500'
} as const

export const ROUNDINGS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
} as const

export const MAX_WIDTHS = {
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
} as const

export const PADDINGS = {
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
} as const

export const HEIGHTS = {
  auto: 'h-auto',
  screen: 'h-screen',
  fit: 'h-fit',
  full: 'h-full',
  sm: 'h-20',
  md: 'h-60',
  lg: 'h-80',
  xl: 'h-96'
} as const

const Card = forwardRef<HTMLElement, CardProps>(
  (
    {
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
      className,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const role = isLink ? 'link' : 'region'
    const Tag = isLink ? 'a' : 'div'
    const computedClasses = clsx(
      'w-full overflow-hidden backdrop-blur-sm',
      HEIGHTS[height],
      PADDINGS[padding],
      SHADOW_SIZES[shadow],
      ROUNDINGS[rounded],
      MAX_WIDTHS[maxWidth],
      !imgBackground && BG_COLORS[color],
      isLink && HOVER_BG[color],
      border && 'border',
      border && BORDER_COLORS[color],
      className
    )
    const style = imgBackground
      ? {
          backgroundImage: \`url('\${imgBackground}')\`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      : undefined
    return (
      <Tag
        ref={ref}
        href={isLink ? href : undefined}
        role={role}
        aria-label={ariaLabel || (isLink ? 'Link card' : 'Card')}
        tabIndex={isLink ? 0 : undefined}
        className={computedClasses}
        style={style}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)

export default memo(Card)

`

export const CardContentTs = `import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'

type TextColor = keyof typeof TEXT_COLOR_STYLES
type Font = keyof typeof FONT_STYLES
type TextSize = keyof typeof TEXT_SIZE_STYLES
type TextAlign = keyof typeof TEXT_ALIGN_STYLES
type Padding = keyof typeof PADDING_STYLES

export interface CardContentProps {
  children: ReactNode
  textColor?: TextColor
  font?: Font
  textSize?: TextSize
  textAlign?: TextAlign
  padding?: Padding
  role?: string
  ariaLabel?: string
  className?: string
}

export const TEXT_COLOR_STYLES = {
  default: 'text-zinc-700/80 dark:text-neutral-100/70',
  primary: 'text-blue-500/80',
  secondary: 'text-indigo-500/80',
  success: 'text-green-500/80',
  warning: 'text-yellow-500/80',
  danger: 'text-red-500/80'
} as const

export const FONT_STYLES = {
  extrabold: 'font-extrabold',
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
  normal: 'font-normal',
  light: 'font-light'
} as const

export const TEXT_SIZE_STYLES = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  xxl: 'text-2xl'
} as const

export const TEXT_ALIGN_STYLES = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
} as const

export const PADDING_STYLES = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
} as const

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  (
    {
      children,
      textColor = 'default',
      font = 'normal',
      textSize = 'sm',
      textAlign = 'left',
      padding = 'md',
      className,
      role = 'region',
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      TEXT_COLOR_STYLES[textColor],
      FONT_STYLES[font],
      TEXT_SIZE_STYLES[textSize],
      TEXT_ALIGN_STYLES[textAlign],
      PADDING_STYLES[padding],
      className
    )

    return (
      <div
        ref={ref}
        role={role}
        aria-label={ariaLabel}
        className={classes}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export default memo(CardContent)

`

export const CardHeaderTs = `import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'

type TextColor = keyof typeof TEXT_COLOR_STYLES
type TextHoverColor = keyof typeof TEXT_HOVER_COLOR_STYLES
type Font = keyof typeof FONT_STYLES
type TextSize = keyof typeof TEXT_SIZE_STYLES
type TextAlign = keyof typeof TEXT_ALIGN_STYLES
type Padding = keyof typeof PADDING_STYLES

export interface CardHeaderProps {
  children: ReactNode
  textColor?: TextColor
  textHoverColor?: TextHoverColor
  font?: Font
  textSize?: TextSize
  textAlign?: TextAlign
  padding?: Padding
  isLink?: boolean
  href?: string
  className?: string
  ariaLabel?: string
  role?: string
}

export const TEXT_COLOR_STYLES = {
  default: 'text-zinc-700 dark:text-neutral-100/80',
  primary: 'text-blue-500',
  secondary: 'text-indigo-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  danger: 'text-red-500'
} as const

export const TEXT_HOVER_COLOR_STYLES = {
  default: 'hover:text-zinc-900 dark:hover:text-neutral-100',
  primary: 'hover:text-blue-600 dark:hover:text-blue-500',
  secondary: 'hover:text-indigo-600 dark:hover:text-indigo-500',
  success: 'hover:text-green-600 dark:hover:text-green-500',
  warning: 'hover:text-yellow-600 dark:hover:text-yellow-500',
  danger: 'hover:text-red-600 dark:hover:text-red-500'
} as const

export const FONT_STYLES = {
  extrabold: 'font-extrabold',
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
  normal: 'font-normal',
  light: 'font-light'
} as const

export const TEXT_SIZE_STYLES = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  xxl: 'text-2xl'
} as const

export const TEXT_ALIGN_STYLES = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
} as const

export const PADDING_STYLES = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
} as const

const CardHeader = forwardRef<HTMLElement, CardHeaderProps>(
  (
    {
      children,
      textColor = 'default',
      textHoverColor,
      font = 'bold',
      textSize = 'lg',
      textAlign = 'left',
      padding = 'md',
      isLink = false,
      href,
      className,
      ariaLabel,
      role,
      ...props
    },
    ref
  ) => {
    const Tag = isLink ? 'a' : 'div'
    const classes = clsx(
      TEXT_COLOR_STYLES[textColor],
      textHoverColor && TEXT_HOVER_COLOR_STYLES[textHoverColor],
      FONT_STYLES[font],
      TEXT_SIZE_STYLES[textSize],
      TEXT_ALIGN_STYLES[textAlign],
      PADDING_STYLES[padding],
      className
    )
    return (
      <Tag
        ref={ref}
        href={isLink ? href : undefined}
        role={role}
        aria-label={ariaLabel}
        className={classes}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)

export default memo(CardHeader)

`

export const CustomCardTs = `import { type ReactNode, type FC } from 'react'
import Card from '@/components/ts/Card/Card'
import CardHeader from '@/components/ts/Card/CardHeader'
import CardContent from '@/components/ts/Card/CardContent'

interface CustomCardProps {
  title?: string
  description?: string
  imageUrl?: string
  actions?: ReactNode
}

const CustomCard: FC<CustomCardProps> = ({
  title,
  description,
  imageUrl,
  actions
}) => {
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

export const DrawerTs = `import {
  forwardRef,
  useRef,
  useEffect,
  useCallback,
  memo,
  type ReactNode,
  type RefObject
} from 'react'
import clsx from 'clsx'

type Position = keyof typeof POSITION_CLASSES
type Effect = keyof typeof BACKDROP_EFFECTS
type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full'
type Color = keyof typeof BG_COLORS

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  isDismissable?: boolean
  position?: Position
  effect?: Effect
  size?: Size
  color?: Color
  labelledBy?: string
  describedBy?: string
  className?: string
  children: ReactNode
}

export const BG_COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
} as const

export const TEXT_COLORS = (effect: Effect) => ({
  default: \`\${
    effect === 'opaque' ? 'text-gray-200' : 'text-gray-800'
  } dark:text-gray-300\`,
  primary: 'text-blue-400 dark:text-blue-500',
  secondary: 'text-indigo-400 dark:text-indigo-500',
  success: 'text-green-400 dark:text-green-500',
  warning: 'text-yellow-400 dark:text-yellow-500',
  danger: 'text-red-400 dark:text-red-500'
})

export const BACKDROP_EFFECTS = {
  opaque: 'bg-black/50',
  blur: 'backdrop-blur-sm',
  transparent: 'bg-transparent'
} as const

export const SIZE_CLASSES = (position: Position) =>
  ({
    w: { sm: 'w-1/4', md: 'w-1/3', lg: 'w-1/2', xl: 'w-3/4', full: 'w-full' },
    h: { sm: 'h-1/4', md: 'h-1/3', lg: 'h-1/2', xl: 'h-3/4', full: 'h-full' }
  }[position === 'top' || position === 'bottom' ? 'h' : 'w'])

export const POSITION_CLASSES = {
  top: 'top-0 left-0 right-0 w-full animate-fade-in-down',
  bottom: 'bottom-0 left-0 right-0 w-full animate-fade-in-up',
  left: 'left-0 top-0 bottom-0 h-full animate-fade-in-right',
  right: 'right-0 top-0 bottom-0 h-full animate-fade-in-left'
} as const

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen,
      onClose,
      isDismissable = true,
      position = 'right',
      effect = 'opaque',
      size = 'md',
      color = 'default',
      children,
      labelledBy,
      describedBy,
      className,
      ...props
    },
    ref
  ) => {
    const drawerRef =
      (ref as RefObject<HTMLDivElement>) || useRef<HTMLDivElement>(null)
    const lastFocused = useRef<HTMLElement | null>(null)

    const handleEscape = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen && isDismissable) onClose()
      },
      [isOpen, isDismissable, onClose]
    )

    const handleClickOutside = useCallback(
      (e: MouseEvent) => {
        if (
          drawerRef.current &&
          !drawerRef.current.contains(e.target as Node) &&
          isOpen &&
          isDismissable
        )
          onClose()
      },
      [isOpen, isDismissable, onClose]
    )

    useEffect(() => {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [handleEscape, handleClickOutside])

    useEffect(() => {
      if (isOpen) {
        lastFocused.current = document.activeElement as HTMLElement
        drawerRef.current?.focus()
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
        lastFocused.current?.focus()
      }
    }, [isOpen])

    if (!isOpen) return null

    const sizeClass = SIZE_CLASSES(position)[size]
    const positionClass = POSITION_CLASSES[position]
    const styleClass = clsx(positionClass, sizeClass, 'fixed')
    const bgColorClass = BG_COLORS[color]
    const textColorClass = TEXT_COLORS(effect)[color]
    const backdropClass = BACKDROP_EFFECTS[effect]

    return (
      <div
        className={clsx('fixed inset-0 z-50', textColorClass, className)}
        role='dialog'
        aria-modal='true'
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        {...props}
      >
        <div
          className={clsx('fixed inset-0', backdropClass)}
          aria-hidden='true'
        />
        <div
          ref={drawerRef}
          className={clsx(
            'border-0 shadow-lg backdrop-blur-sm',
            styleClass,
            bgColorClass
          )}
          data-open={isOpen}
          data-dismissable={isDismissable}
          tabIndex={-1}
        >
          <div className='flex flex-col h-full'>{children}</div>
        </div>
      </div>
    )
  }
)

Drawer.displayName = 'Drawer'

export default memo(Drawer)

`

export const DrawerHeaderTs = `import { type ReactNode, type FC } from 'react'

interface DrawerHeaderProps {
  children: ReactNode
  closeDrawer?: () => void
  onClose?: () => void
}

const DrawerHeader: FC<DrawerHeaderProps> = ({
  children,
  closeDrawer,
  onClose
}) => {
  return (
    <div
      className='flex-shrink-0 flex items-center justify-between p-2'
      role='banner'
    >
      <div>{children}</div>
      {(closeDrawer || onClose) && (
        <button
          onClick={closeDrawer || onClose}
          className='p-2 transition duration-300 ease-in-out hover:text-red-700'
          aria-label='Close Drawer'
          title='Close Drawer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='icon icon-tabler icons-tabler-filled icon-tabler-square-rounded-x'
            role='img'
            aria-hidden='true'
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

export default DrawerHeader

`

export const DrawerBodyTs = `import { type ReactNode, type FC } from 'react'

interface DrawerBodyProps {
  children: ReactNode
}

const DrawerBody: FC<DrawerBodyProps> = ({ children }) => {
  return (
    <div
      className='flex-1 overflow-y-auto p-2'
      role='region'
      aria-label='Drawer Content'
    >
      {children}
    </div>
  )
}

export default DrawerBody

`

export const DrawerContentTs = `import { type ReactNode } from 'react'

interface DrawerContentProps {
  children: ReactNode
}

const DrawerContent: React.FC<DrawerContentProps> = ({ children }) => {
  return (
    <div
      className='flex-1 flex flex-col overflow-hidden'
      role='region'
      aria-label='Drawer Content'
    >
      {children}
    </div>
  )
}

export default DrawerContent

`

export const CustomDrawerTs = `import { useState, type FC } from 'react'
import Drawer from '@/components/ts/Drawer/Drawer'
import DrawerHeader from '@/components/ts/Drawer/DrawerHeader'
import DrawerBody from '@/components/ts/Drawer/DrawerBody'
import DrawerFooter from '@/components/ts/Drawer/DrawerFooter'
import DrawerContent from '@/components/ts/Drawer/DrawerContent'
import Button from '@/components/ts/Button'

interface CustomDrawerProps {
  isDismissable?: boolean 
  position?: 'top' | 'bottom' | 'left' | 'right' 
  effect?: 'opaque' | 'blur' | 'transparent' 
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' 
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' 
  text?: string
}

const CustomDrawer: FC<CustomDrawerProps> = ({
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
      {/* Botón para abrir el drawer */}
      <Button onClick={() => setDrawerOpen(true)}>{text}</Button>

      {/* Drawer */}
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
          {/* Cabecera del drawer */}
          <DrawerHeader
            onClose={() => setDrawerOpen(false)}
            closeDrawer={() => setDrawerOpen(false)}
          >
            Drawer Title
          </DrawerHeader>

          {/* Cuerpo del drawer */}
          <DrawerBody>
            <p>This is the body of the drawer.</p>
          </DrawerBody>

          {/* Pie de página del drawer */}
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

export const DrawerFooterTs = `import { type ReactNode, type FC } from 'react'

interface DrawerFooterProps {
  children: ReactNode
}

const DrawerFooter: FC<DrawerFooterProps> = ({ children }) => {
  return (
    <div
      className='flex-shrink-0 p-2'
      role='contentinfo'
      aria-label='Drawer Footer'
    >
      {children}
    </div>
  )
}

export default DrawerFooter

`

export const DropdownTs = `import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
  memo,
  type ReactNode,
  type RefObject
} from 'react'
import clsx from 'clsx'

type DropdownContextValue = {
  isOpen: boolean
  toggleDropdown: () => void
  closeDropdown: () => void
  closeOnSelect: boolean
}

type DropdownProps = {
  closeOnSelect?: boolean
  className?: string
  children: ReactNode
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

export const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) throw new Error('useDropdown must be used within a Dropdown')
  return context
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className, closeOnSelect = true, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef =
      (ref as RefObject<HTMLDivElement>) || useRef<HTMLDivElement>(null)

    const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), [])
    const closeDropdown = useCallback(() => setIsOpen(false), [])

    useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
        if (
          isOpen &&
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          closeDropdown()
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, closeDropdown])

    useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape' && isOpen) closeDropdown()
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, closeDropdown])

    return (
      <DropdownContext.Provider
        value={{ isOpen, toggleDropdown, closeDropdown, closeOnSelect }}
      >
        <div
          ref={containerRef}
          role='menu'
          aria-expanded={isOpen}
          aria-haspopup='true'
          className={clsx('relative inline-block', className)}
          {...props}
        >
          {children}
        </div>
      </DropdownContext.Provider>
    )
  }
)

export default memo(Dropdown)

`

export const DropdownItemTs = `import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'

type Variant = keyof typeof VARIANT_STYLES
type Color = keyof typeof BG_COLORS
type Rounding = keyof typeof ROUNDINGS

export interface DropdownItemProps {
  title: string
  description?: string
  selected?: boolean
  variant?: Variant
  color?: Color
  rounded?: Rounding
  className?: string
  disabled?: boolean
  onClick?: () => void
  children?: ReactNode
}

export const VARIANT_STYLES = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
} as const

export const BG_COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
} as const

export const SELECTED_BG_COLORS = {
  default: 'bg-neutral-100/50 dark:bg-zinc-700/60',
  primary: 'bg-blue-500/40 dark:bg-blue-500/40',
  secondary: 'bg-indigo-500/40 dark:bg-indigo-500/40',
  success: 'bg-green-500/40 dark:bg-green-500/40',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/40',
  danger: 'bg-red-500/40 dark:bg-red-500/40'
} as const

export const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
} as const

export const BORDER_COLORS = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
} as const

export const HOVER_BG_COLORS = {
  default: 'hover:bg-neutral-100/30 dark:hover:bg-zinc-700/50',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/10',
  success: 'hover:bg-green-500/30 dark:hover:bg-green-500/10',
  warning: 'hover:bg-yellow-500/30 dark:hover:bg-yellow-500/10',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
} as const

export const ROUNDINGS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg'
} as const

const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  (
    {
      children,
      title,
      description,
      selected = false,
      onClick,
      variant = 'light',
      color = 'default',
      rounded = 'md',
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      'flex w-full px-7 py-2 text-sm transition',
      ROUNDINGS[rounded],
      VARIANT_STYLES[variant],
      TEXT_COLORS[color],
      !disabled && HOVER_BG_COLORS[color],
      variant === 'default' && !selected && BG_COLORS[color],
      variant === 'bordered' && BORDER_COLORS[color],
      selected && SELECTED_BG_COLORS[color],
      disabled && 'opacity-50 cursor-not-allowed',
      className
    )

    return (
      <button
        ref={ref}
        type='button'
        className={classes}
        onClick={onClick}
        disabled={disabled}
        aria-pressed={selected}
        aria-disabled={disabled}
        aria-label={title}
        {...props}
      >
        <div className='flex flex-col text-left flex-1'>
          <span className='text-sm font-medium'>{title}</span>
          {description && <p className='text-sm'>{description}</p>}
        </div>
        {children}
      </button>
    )
  }
)

export default memo(DropdownItem)

`

export const DropdownMenuTs = `import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'
import { useDropdown } from '@/components/ts/Dropdown/Dropdown'

type Variant = keyof typeof VARIANT_STYLES
type Color = keyof typeof BG_COLORS
type Rounding = keyof typeof ROUNDINGS

export interface DropdownMenuProps {
  variant?: Variant
  color?: Color
  rounded?: Rounding
  id?: string
  className?: string
  children: ReactNode
}

export const VARIANT_STYLES = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
} as const

export const BG_COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
} as const

export const BORDER_COLORS = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
} as const

export const ROUNDINGS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg'
} as const

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      children,
      variant = 'default',
      color = 'default',
      rounded = 'md',
      id,
      className,
      ...props
    },
    ref
  ) => {
    const { isOpen } = useDropdown()

    const classes = clsx(
      'origin-top-right animate-fade-in-down flex flex-col right-0 mt-2 w-full transition',
      !isOpen && 'hidden',
      VARIANT_STYLES[variant],
      variant === 'default' && BG_COLORS[color],
      variant === 'bordered' && BORDER_COLORS[color],
      ROUNDINGS[rounded],
      className
    )

    return (
      <div
        ref={ref}
        id={id}
        role='menu'
        aria-hidden={!isOpen}
        aria-labelledby='aria-labelledby'
        aria-describedby='aria-describedby'
        className={classes}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export default memo(DropdownMenu)

`

export const DropdownSectionTs = `import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'

type Variant = keyof typeof VARIANT_STYLES
type Color = keyof typeof BG_COLORS
type Font = keyof typeof FONT_SIZES
type Rounding = keyof typeof ROUNDINGS

export interface DropdownSectionProps {
  heading?: string
  showDivider?: boolean
  variant?: Variant
  color?: Color
  font?: Font
  rounded?: Rounding
  className?: string
  children: ReactNode
}

export const VARIANT_STYLES = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
} as const

export const BG_COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/5 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
} as const

export const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
} as const

export const BORDER_COLORS = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
} as const

export const FONT_SIZES = {
  sm: 'font-normal',
  md: 'font-medium',
  lg: 'font-semibold',
  xl: 'font-bold'
} as const

export const DIVIDER_COLORS = {
  default: 'bg-zinc-700 dark:bg-neutral-100/70',
  primary: 'bg-blue-500',
  secondary: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
} as const

export const ROUNDINGS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg'
} as const

const DropdownSection = forwardRef<HTMLDivElement, DropdownSectionProps>(
  (
    {
      children,
      heading,
      showDivider = false,
      variant = 'light',
      color = 'default',
      font = 'md',
      rounded = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const headerClasses = clsx(
      'px-4',
      VARIANT_STYLES[variant],
      variant !== 'light' && ROUNDINGS[rounded],
      TEXT_COLORS[color],
      FONT_SIZES[font],
      variant === 'default' && BG_COLORS[color],
      variant === 'bordered' && BORDER_COLORS[color]
    )

    const dividerClasses = clsx('my-2 h-px', DIVIDER_COLORS[color])

    return (
      <div
        ref={ref}
        role='region'
        aria-label={heading || 'Dropdown Section'}
        className={clsx('flex flex-col', className)}
        {...props}
      >
        {heading && <h3 className={headerClasses}>{heading}</h3>}
        {children}
        {showDivider && <div className={dividerClasses} role='separator' />}
      </div>
    )
  }
)

export default memo(DropdownSection)

`

export const DropdownTriggerTs = `import { forwardRef, memo, type ReactNode } from 'react'
import clsx from 'clsx'
import { useDropdown } from '@/components/ts/Dropdown/Dropdown'

const VARIANT_STYLES = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
} as const

const BG_COLORS = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
} as const

const TEXT_COLORS = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-500',
  secondary: 'text-indigo-800 dark:text-indigo-500',
  success: 'text-green-800 dark:text-green-500',
  warning: 'text-yellow-800 dark:text-yellow-500',
  danger: 'text-red-800 dark:text-red-500'
} as const

const BORDER_COLORS = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
} as const

const HOVER_BG_COLORS = {
  default: 'hover:bg-neutral-100/30 dark:hover:bg-zinc-700/50',
  primary: 'hover:bg-blue-500/30 dark:hover:bg-blue-500/10',
  secondary: 'hover:bg-indigo-500/30 dark:hover:bg-indigo-500/10',
  success: 'hover:bg-green-500/30 dark:hover:bg-green-500/10',
  warning: 'hover:bg-yellow-500/30 dark:hover:bg-yellow-500/10',
  danger: 'hover:bg-red-500/30 dark:hover:bg-red-500/10'
} as const

const SIZE_STYLES = {
  sm: 'font-light text-xs px-2 py-1.5',
  md: 'font-medium text-sm px-4 py-2',
  lg: 'font-medium text-base px-8 py-2.5'
} as const

const ROUNDINGS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
} as const

export type DropdownTriggerProps = {
  variant?: keyof typeof VARIANT_STYLES
  color?: keyof typeof BG_COLORS
  rounded?: keyof typeof ROUNDINGS
  size?: keyof typeof SIZE_STYLES
  className?: string
  children: ReactNode
}

const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  (
    {
      children,
      variant = 'default',
      color = 'default',
      rounded = 'md',
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const { toggleDropdown, isOpen } = useDropdown()

    const classes = clsx(
      'inline-flex justify-center items-center transition',
      VARIANT_STYLES[variant],
      SIZE_STYLES[size],
      TEXT_COLORS[color],
      variant === 'default' && BG_COLORS[color],
      variant === 'bordered' && BORDER_COLORS[color],
      HOVER_BG_COLORS[color],
      ROUNDINGS[rounded],
      className
    )

    return (
      <button
        ref={ref}
        type='button'
        className={classes}
        onClick={toggleDropdown}
        aria-haspopup='menu'
        aria-expanded={isOpen}
        role='button'
        {...props}
      >
        {children}
      </button>
    )
  }
)

export default memo(DropdownTrigger)

`

export const InputTs = `import { forwardRef, memo, useId, useCallback } from 'react'
import clsx from 'clsx'

export type Variant = 'default' | 'bordered' | 'light'
export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type Size = 'sm' | 'md' | 'lg'

export interface InputProps {
  label?: string
  description?: string
  errorMessage?: string
  isRequired?: boolean
  isClearable?: boolean
  isInvalid?: boolean
  isReadOnly?: boolean
  onValueChange: (value: string) => void
  variant?: Variant
  color?: Color
  rounded?: Rounded
  size?: Size
  placeholder?: string
  type?: string
  minLength?: number
  maxLength?: number
  pattern?: string
  isDisabled?: boolean
  className?: string
  id?: string
  value?: string
}

const VARIANT_STYLES: Record<Variant, string> = {
  default: 'border-0 shadow-lg backdrop-blur-sm',
  bordered: 'border shadow-md',
  light: ''
}

const BG_COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
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

const BORDER_COLORS: Record<Color, string> = {
  default: 'border-gray-600',
  primary: 'border-blue-600',
  secondary: 'border-indigo-600',
  success: 'border-green-600',
  warning: 'border-yellow-600',
  danger: 'border-red-600'
}

const SIZE_STYLES: Record<Size, string> = {
  sm: 'text-xs px-2 py-1.5',
  md: 'text-sm px-3 py-2',
  lg: 'text-base px-4 py-2.5'
}

const ROUNDINGS: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
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
      id,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || \`input-\${generatedId}\`
    const descId = description ? \`\${inputId}-desc\` : undefined
    const errorId = isInvalid && errorMessage ? \`\${inputId}-error\` : undefined

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(e.target.value)
      },
      [onValueChange]
    )

    const handleClear = useCallback(() => {
      onValueChange('')
    }, [onValueChange])

    const containerClasses = clsx(
      'flex flex-col space-y-2',
      TEXT_COLORS[color],
      className
    )

    const wrapperClasses = clsx(
      'relative flex items-center',
      VARIANT_STYLES[variant],
      variant === 'default' && BG_COLORS[color],
      BORDER_COLORS[color] && variant === 'bordered'
        ? BORDER_COLORS[color]
        : '',
      ROUNDINGS[rounded]
    )

    const inputClasses = clsx(
      'w-full focus:outline-none',
      SIZE_STYLES[size],
      variant === 'light' && 'border-b-2',
      isInvalid && 'border-2 border-red-500',
      ROUNDINGS[rounded]
    )

    const clearButtonClasses =
      'absolute inset-y-0 right-0 pr-3 flex items-center'

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className='text-sm font-medium'>
            {label}
            {isRequired && <span className='text-red-500'> *</span>}
          </label>
        )}

        <div className={wrapperClasses}>
          <input
            id={inputId}
            ref={ref}
            type={type}
            value={value}
            onChange={handleChange}
            required={isRequired}
            minLength={minLength}
            maxLength={maxLength}
            pattern={pattern}
            readOnly={isReadOnly}
            disabled={isDisabled}
            placeholder={placeholder}
            aria-invalid={isInvalid}
            aria-describedby={descId}
            aria-errormessage={errorId}
            className={inputClasses}
            {...props}
          />

          {type !== 'password' && isClearable && value && (
            <button
              type='button'
              onClick={handleClear}
              className={clearButtonClasses}
              aria-label='Clear input'
            >
              {/* Clear Icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
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

        <div className='text-sm'>
          {description && (
            <p id={descId} className='font-normal'>
              {description}
            </p>
          )}
          {isInvalid && errorMessage && (
            <p id={errorId} className='text-red-500'>
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    )
  }
)

export default memo(Input)

`

export const CustomInputTs = `import { useState } from 'react'
import Input from '@/components/ts/Input/Input'

interface CustomInputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  isRequired?: boolean
  isClearable?: boolean
  isInvalid?: boolean
  errorMessage?: string
  description?: string
  isMinLength?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  isReadOnly?: boolean
  isDisabled?: boolean
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg'
}

const CustomInput = ({
  label,
  placeholder,
  type,
  isRequired = false,
  isClearable = false,
  isInvalid = false,
  errorMessage = '',
  description = '',
  isMinLength = false,
  minLength,
  maxLength,
  pattern,
  isReadOnly = false,
  isDisabled = false,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  size = 'md'
}: CustomInputProps) => {
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
          (isMinLength && value.length < (minLength || 0))
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

export const ModalTs = `import { useEffect, useRef, useCallback, memo } from 'react'
import clsx from 'clsx'

export type Effect = 'opaque' | 'blur' | 'transparent'
export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
  isOpen: boolean
  isDismissable?: boolean
  effect?: Effect
  color?: Color
  rounded?: Rounded
  size?: Size
  onClose: () => void
  children: React.ReactNode
  className?: string
}

const BACKDROP_EFFECTS: Record<Effect, string> = {
  opaque: 'bg-black/50',
  blur: 'backdrop-blur-sm',
  transparent: 'bg-transparent'
}

const COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/30',
  danger: 'bg-red-500/20'
}

const ROUNDED: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-xl',
  xl: 'rounded-2xl'
}

const SIZES: Record<Size, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full min-h-full'
}

const Modal = ({
  isOpen,
  isDismissable = true,
  effect = 'opaque',
  color = 'default',
  rounded = 'md',
  size = 'md',
  onClose,
  children,
  className
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDismissable) {
        onClose()
      }
    },
    [isDismissable, onClose]
  )

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        isDismissable
      ) {
        onClose()
      }
    },
    [isDismissable, onClose]
  )

  const trapFocus = useCallback((event: KeyboardEvent) => {
    if (!modalRef.current) return

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', trapFocus)
      document.body.style.overflow = 'hidden'

      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus()
      } else {
        modalRef.current?.focus()
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', trapFocus)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, handleKeyDown, handleClickOutside, trapFocus])

  if (!isOpen) return null

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center',
        BACKDROP_EFFECTS[effect]
      )}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={clsx(
          'animate-zoom-in shadow-lg w-full border-0 backdrop-blur-sm',
          COLORS[color],
          ROUNDED[rounded],
          SIZES[size],
          {
            'text-gray-200': effect === 'opaque',
            'text-gray-800 dark:text-gray-300': effect !== 'opaque'
          },
          className
        )}
        role='document'
      >
        {children}
      </div>
    </div>
  )
}

export default memo(Modal)

`

export const ModalHeaderTs = `import { type ReactNode } from 'react'

interface ModalHeaderProps {
  children: ReactNode
  onClose?: () => void
}

const ModalHeader = ({ children, onClose }: ModalHeaderProps) => {
  return (
    <div className='flex justify-between items-center pb-4 mb-4'>
      <h3 className='text-lg font-semibold' id='modal-header-title'>
        {children}
      </h3>
      {onClose && (
        <button
          onClick={onClose}
          className='p-2 transition duration-300 ease-in-out hover:text-red-700'
          aria-label='Close'
          aria-labelledby='modal-header-title'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            role='img'
            aria-hidden='true'
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

export const ModalBodyTs = `import { type ReactNode } from 'react'

interface ModalBodyProps {
  children: ReactNode
}

const ModalBody = ({ children }: ModalBodyProps) => {
  return (
    <div className='mb-4' role='region' aria-label='Modal Content'>
      {children}
    </div>
  )
}

export default ModalBody

`

export const ModalContentTs = `import { type ReactNode } from 'react'

interface ModalContentProps {
  children: ReactNode
}

const ModalContent = ({ children }: ModalContentProps) => {
  return (
    <div className='p-6' role='dialog' aria-modal='true'>
      {children}
    </div>
  )
}

export default ModalContent

`

export const ModalFooterTs = `import { type ReactNode } from 'react'

interface ModalFooterProps {
  children: ReactNode
}

const ModalFooter = ({ children }: ModalFooterProps) => {
  return (
    <div
      className='flex justify-end space-x-2'
      role='contentinfo'
      aria-label='Modal Footer'
    >
      {children}
    </div>
  )
}

export default ModalFooter

`

export const PopoverTs = `import {
  useState,
  useRef,
  useEffect,
  Children,
  cloneElement,
  useCallback,
  memo,
  useId
} from 'react'
import PopoverContent from '@/components/ts/Popover/PopoverContent'
import PopoverTrigger from '@/components/ts/Popover/PopoverTrigger'

export type Backdrop = 'opaque' | 'blur' | 'transparent'
export type Placement = 'top' | 'right' | 'bottom' | 'left'
export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface PopoverProps {
  children: React.ReactNode
  backdrop?: Backdrop
  placement?: Placement
  color?: Color
  rounded?: Rounded
}

const Popover = ({
  children,
  backdrop = 'transparent',
  placement = 'bottom',
  color = 'default',
  rounded = 'md'
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const id = useId()

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      contentRef.current &&
      !contentRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }, [])

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') setIsOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [handleClickOutside, handleEscape])

  return (
    <div className='relative' ref={popoverRef} role='dialog'>
      {Children.map(children, (child) => {
        if (!child || typeof child !== 'object' || !('type' in child)) {
          return child
        }

        if ((child as any).type === PopoverTrigger) {
          return cloneElement(child as React.ReactElement<any>, {
            onClick: handleToggle,
            'aria-haspopup': 'dialog',
            'aria-expanded': isOpen,
            'aria-controls': id
          })
        }

        if ((child as any).type === PopoverContent) {
          return cloneElement(child as React.ReactElement<any>, {
            id,
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

export default memo(Popover)

`

export const PopoverContentTs = `import { forwardRef, useMemo } from 'react'
import clsx from 'clsx'

export type Backdrop = 'transparent' | 'opaque' | 'blur'
export type Placement = 'top' | 'bottom' | 'left' | 'right'
export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'full'

export interface PopoverContentProps {
  children: React.ReactNode
  isOpen: boolean
  backdrop?: Backdrop
  placement?: Placement
  color?: Color
  rounded?: Rounded
  ariaLabel?: string
  className?: string
}

const BACKDROP_CLASSES: Record<Backdrop, string> = {
  transparent: 'bg-transparent',
  opaque: 'bg-gray-200/50 dark:bg-black/50',
  blur: 'backdrop-blur-sm bg-gray-200/50 dark:bg-black/50'
}

const PLACEMENT_STYLES: Record<Placement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2'
}

const ROUNDED_STYLES: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

const COLOR_STYLES: Record<Color, string> = {
  default: 'bg-neutral-100/80 dark:bg-zinc-800/80 dark:shadow-zinc-700/10',
  primary: 'bg-blue-500/80 dark:bg-blue-600/80',
  secondary: 'bg-indigo-500/80 dark:bg-indigo-600/80',
  success: 'bg-green-500/80 dark:bg-green-600/80',
  warning: 'bg-yellow-500/80 dark:bg-yellow-600/80',
  danger: 'bg-red-500/80 dark:bg-red-600/80'
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      children,
      isOpen,
      backdrop = 'transparent',
      placement = 'bottom',
      color = 'default',
      rounded = 'md',
      ariaLabel = 'Popover content',
      className = '',
      ...props
    },
    ref
  ) => {
    const placementClass = useMemo(
      () => PLACEMENT_STYLES[placement] ?? PLACEMENT_STYLES.bottom,
      [placement]
    )

    const backdropClass = useMemo(
      () => BACKDROP_CLASSES[backdrop] ?? BACKDROP_CLASSES.transparent,
      [backdrop]
    )

    const contentClasses = useMemo(
      () =>
        clsx(
          'border-0 animate-fade-in backdrop-blur-md',
          'shadow-lg p-4 whitespace-nowrap',
          'text-gray-800 dark:text-gray-300',
          COLOR_STYLES[color] ?? COLOR_STYLES.default,
          ROUNDED_STYLES[rounded] ?? ROUNDED_STYLES.md,
          className
        ),
      [color, rounded, className]
    )

    if (!isOpen) return null

    return (
      <>
        <div
          className={clsx('fixed inset-0', backdropClass)}
          aria-hidden='true'
          data-testid='popover-backdrop'
        />

        <div
          ref={ref}
          role='dialog'
          aria-label={ariaLabel}
          className={clsx('absolute z-10 transform', placementClass)}
          {...props}
        >
          <div className={contentClasses}>{children}</div>
        </div>
      </>
    )
  }
)

export default PopoverContent

`

export const PopoverTriggerTs = `import { type ReactNode, type MouseEvent } from 'react'

interface PopoverTriggerProps {
  children: ReactNode
  onClick: (event: MouseEvent<HTMLDivElement>) => void
  ariaLabel: string
}

const PopoverTrigger = ({
  children,
  onClick,
  ariaLabel
}: PopoverTriggerProps) => {
  return (
    <div
      className='cursor-pointer'
      onClick={onClick}
      role='button'
      tabIndex={0}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(e as unknown as MouseEvent<HTMLDivElement>)
        }
      }}
    >
      {children}
    </div>
  )
}

export default PopoverTrigger

`

export const RadioTs = `import React from 'react'
import clsx from 'clsx'

export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export interface RadioProps {
  value: string
  isSelected?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  children: React.ReactNode
  description?: string
  onChange?: (value: string) => void
  color?: Color
  className?: string
}

const COLOR_STYLES: Record<Color, string> = {
  default: 'bg-zinc-700/30 dark:bg-neutral-100/50',
  primary: 'bg-blue-500/50',
  secondary: 'bg-indigo-500/50',
  success: 'bg-green-500/60',
  warning: 'bg-yellow-500/60',
  danger: 'bg-red-500/50'
}

const Radio: React.FC<RadioProps> = ({
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

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
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
      ? \`\${COLOR_STYLES[color]} border-transparent\`
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

`

export const RadioGroupTs = `import {
  memo,
  Children,
  cloneElement,
  type ReactNode,
  isValidElement
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
export type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type Orientation = 'vertical' | 'horizontal'

export interface RadioGroupProps {
  children: ReactNode
  orientation?: Orientation
  label?: string
  description?: string
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  selectedValue?: string
  onChange?: (value: string) => void
  variant?: Variant
  color?: Color
  rounded?: Rounded
  id: string
  className?: string
}

const VARIANTS: Record<Variant, string> = {
  default: 'border-0 backdrop-blur-sm shadow-md',
  bordered: 'border shadow-md',
  light: ''
}

const COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30 dark:shadow-neutral-100/10',
  primary: 'bg-blue-500/20 dark:bg-blue-600/30',
  secondary: 'bg-indigo-500/20 dark:bg-indigo-600/30',
  success: 'bg-green-500/20 dark:bg-green-600/30',
  warning: 'bg-yellow-500/20 dark:bg-yellow-600/30',
  danger: 'bg-red-500/20 dark:bg-red-600/30'
}

const BORDER_COLORS: Record<Color, string> = {
  default: 'border-zinc-700/30 dark:border-neutral-100/20',
  primary: 'border-blue-500 dark:border-blue-400',
  secondary: 'border-indigo-500 dark:border-indigo-400',
  success: 'border-green-500 dark:border-green-400',
  warning: 'border-yellow-500 dark:border-yellow-400',
  danger: 'border-red-500 dark:border-red-400'
}

const TEXT_COLORS: Record<Color, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-600 dark:text-blue-400',
  secondary: 'text-indigo-600 dark:text-indigo-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  danger: 'text-red-600 dark:text-red-400'
}

const ROUNDED: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-xl',
  xl: 'rounded-3xl'
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  orientation = 'vertical',
  label,
  description,
  errorMessage,
  isInvalid = false,
  isDisabled = false,
  selectedValue,
  onChange,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  id,
  className = '',
  ...props
}) => {
  const groupClasses = clsx(
    'flex flex-col gap-3 px-4 py-3',
    VARIANTS[variant],
    {
      [COLORS[color]]: variant === 'default',
      [BORDER_COLORS[color]]: variant === 'bordered'
    },
    ROUNDED[rounded],
    className
  )

  const ariaProps = {
    'aria-labelledby': label ? \`\${id}-label\` : undefined,
    'aria-describedby':
      [
        description ? \`\${id}-description\` : undefined,
        isInvalid ? \`\${id}-error\` : undefined
      ]
        .filter(Boolean)
        .join(' ') || undefined,
    'aria-invalid': isInvalid,
    'aria-disabled': isDisabled
  }

  return (
    <div
      {...props}
      {...ariaProps}
      role='radiogroup'
      className={groupClasses}
      data-orientation={orientation}
      data-testid='radio-group'
    >
      {label && (
        <span
          id={\`\${id}-label\`}
          className='text-sm font-medium text-gray-600 dark:text-gray-400'
        >
          {label}
        </span>
      )}

      <div
        className={clsx(
          'flex',
          orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2',
          TEXT_COLORS[color]
        )}
      >
        {Children.map(children, (child) =>
          isValidElement(child)
            ? cloneElement(child as React.ReactElement<any>, {
                isSelected: (child.props as any).value === selectedValue,
                onChange: onChange,
                color: color,
                isDisabled: isDisabled || (child.props as any).isDisabled,
                name: id
              })
            : child
        )}
      </div>

      {description && (
        <p
          id={\`\${id}-description\`}
          className='text-sm text-gray-500 dark:text-gray-400'
        >
          {description}
        </p>
      )}

      {isInvalid && errorMessage && (
        <p
          id={\`\${id}-error\`}
          className='text-sm text-red-600 dark:text-red-400'
          role='alert'
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default memo(RadioGroup)

`

export const SelectTs = `import {
  isValidElement,
  useState,
  useRef,
  useEffect,
  useCallback,
  Children,
  cloneElement,
  forwardRef,
  memo,
  type ReactNode,
  type RefObject
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
export type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface SelectProps {
  label?: string
  description?: string
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  onChange?: (value: string) => void
  placeholder?: string
  variant?: Variant
  color?: Color
  rounded?: Rounded
  children: ReactNode
}

const VARIANTS: Record<Variant, string> = {
  default: 'border-0 backdrop-blur-sm shadow-md',
  bordered: 'border border-current shadow-md',
  light: 'border-b border-current'
}

const COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS: Record<Color, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-600',
  secondary: 'text-indigo-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600'
}

const ROUNDEDS: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      description,
      errorMessage,
      isInvalid = false,
      isDisabled = false,
      onChange,
      placeholder = 'Selecciona una opción',
      variant = 'default',
      color = 'default',
      rounded = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState<{
      value: string | null
      label: string | null
    }>({ value: null, label: null })
    const containerRef =
      (ref as RefObject<HTMLDivElement>) || useRef<HTMLDivElement>(null)

    const handleOutsideClick = useCallback(
      (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false)
        }
      },
      [containerRef]
    )

    useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick)
      return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [handleOutsideClick])

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false)
        if (e.key === 'Enter' && !isOpen) setIsOpen(true)
      },
      [isOpen]
    )

    useEffect(() => {
      if (!isOpen) return
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, handleKeyDown])

    const handleSelect = useCallback(
      (value: string, label: string) => {
        if (isDisabled) return
        setSelected({ value, label })
        setIsOpen(false)
        onChange?.(value)
      },
      [isDisabled, onChange]
    )

    return (
      <div
        ref={containerRef}
        className='relative w-full space-y-1 text-gray-600 dark:text-gray-400'
        data-invalid={isInvalid}
        {...props}
      >
        {label && (
          <label className='block text-sm font-medium mb-1'>{label}</label>
        )}

        <button
          type='button'
          role='combobox'
          aria-expanded={isOpen}
          aria-disabled={isDisabled}
          className={clsx(
            'flex items-center justify-between p-2 w-full',
            VARIANTS[variant],
            variant === 'default' && COLORS[color],
            TEXT_COLORS[color],
            variant !== 'light' && ROUNDEDS[rounded],
            {
              'opacity-50 cursor-not-allowed': isDisabled,
              'cursor-pointer': !isDisabled
            }
          )}
          onClick={() => !isDisabled && setIsOpen((o) => !o)}
        >
          <span>{selected.value ? selected.label : placeholder}</span>
          <svg
            className={clsx(
              'w-4 h-4 transition-transform',
              isOpen && 'rotate-180'
            )}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </button>

        {isOpen && (
          <ul
            role='listbox'
            aria-labelledby='select-trigger'
            className={clsx(
              'absolute mt-1 animate-fade-in-down w-full rounded-md shadow-lg z-10 max-h-60 overflow-auto',
              COLORS[color]
            )}
          >
            {Children.map(children, (child) => {
              if (!isValidElement(child)) return child
              return cloneElement(child, {
                onSelect: handleSelect,
                selectedValue: selected.value,
                color
              })
            })}
          </ul>
        )}

        {description && <p className='text-sm mt-1'>{description}</p>}
        {isInvalid && errorMessage && (
          <p className='text-sm text-red-500 mt-1' role='alert'>
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

export default memo(Select)

`

export const SelectItemTs = `import { memo, type ReactNode } from 'react'
import clsx from 'clsx'

export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export interface SelectItemProps {
  value: string
  onSelect: (value: string, label: ReactNode) => void
  selectedValue?: string | null
  isDisabled?: boolean
  color?: Color
  children: ReactNode
  className?: string
}

const TEXT_COLORS: Record<Color, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-600',
  secondary: 'text-indigo-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600'
}

const SelectItem: React.FC<SelectItemProps> = ({
  value,
  children,
  onSelect,
  selectedValue,
  isDisabled = false,
  color = 'default',
  className,
  ...props
}) => {
  const isSelected = selectedValue === value
  const handleClick = () => {
    if (!isDisabled) {
      onSelect(value, children)
    }
  }

  return (
    <li
      role='option'
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      className={clsx(
        'p-2 cursor-pointer',
        isSelected
          ? 'bg-zinc-700/30 dark:bg-neutral-100/50 text-gray-200 dark:text-gray-800'
          : clsx(
              'hover:bg-neutral-100/50 dark:hover:bg-zinc-700/50',
              TEXT_COLORS[color]
            ),
        {
          'opacity-50 cursor-not-allowed': isDisabled
        },
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </li>
  )
}

export default memo(SelectItem)

`

export const SkeletonTs = `import { memo, type ReactNode, type FC } from 'react'
import clsx from 'clsx'

export interface SkeletonProps {
  isLoaded?: boolean
  children: ReactNode
  className?: string
}

const Skeleton: FC<SkeletonProps> = ({
  isLoaded = false,
  children,
  className = '',
  ...props
}) => {
  const containerClasses = clsx(
    'relative overflow-hidden',
    !isLoaded && 'backdrop-blur-sm shadow-lg animate-pulse',
    className
  )

  const overlayClasses = clsx(
    'absolute inset-0 transform bg-zinc-700/30 dark:bg-gray-600 animate-pulse'
  )

  const contentClasses = clsx(!isLoaded && 'opacity-0')

  return (
    <div
      className={containerClasses}
      data-loaded={isLoaded}
      role='status'
      aria-busy={!isLoaded}
      aria-live='polite'
      {...props}
    >
      {!isLoaded && <div className={overlayClasses} aria-hidden='true' />}
      <div className={contentClasses}>{children}</div>
    </div>
  )
}

export default memo(Skeleton)

`

export const TabTs = `import { forwardRef, memo, type ReactNode, type MouseEvent } from 'react'
import clsx from 'clsx'

export interface TabProps {
  label: string
  children?: ReactNode
  disabled?: boolean
  isSelected?: boolean
  href?: string
  onClick?: (event: MouseEvent<HTMLElement>) => void
  className?: string
}

const Tab = forwardRef<HTMLElement, TabProps>(
  (
    {
      label,
      children,
      disabled = false,
      isSelected = false,
      href = '',
      onClick = () => {},
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'px-4 py-2 text-sm font-medium focus:outline-none'
    const stateClasses = clsx(
      'cursor-pointer',
      { 'opacity-50 cursor-not-allowed': disabled },
      { 'border-b-2 border-blue-500 text-blue-600': isSelected },
      { 'text-gray-600 hover:text-gray-800': !isSelected && !disabled }
    )

    const commonProps = {
      role: 'tab' as const,
      'aria-selected': isSelected,
      'aria-disabled': disabled,
      'aria-label': label,
      tabIndex: disabled ? -1 : 0,
      className: clsx(baseClasses, stateClasses, className),
      onClick: disabled ? undefined : onClick,
      ...props
    }

    if (href && !disabled) {
      return (
        <a
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...commonProps}
        >
          {children || label}
        </a>
      )
    }

    return (
      <button
        type='button'
        ref={ref as React.Ref<HTMLButtonElement>}
        {...commonProps}
      >
        {children || label}
      </button>
    )
  }
)

export default memo(Tab)

`

export const TabsTs = `import {
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
              aria-controls={\`\${idBase}-panel-\${idx}\`}
              id={\`\${idBase}-tab-\${idx}\`}
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
            id={\`\${idBase}-panel-\${idx}\`}
            aria-labelledby={\`\${idBase}-tab-\${idx}\`}
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

`

export const TableTs = `import { memo, type FC, type ReactNode } from 'react'
import clsx from 'clsx'

export type Variant = 'default' | 'bordered' | 'light'
export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface TableProps {
  children: ReactNode
  variant?: Variant
  color?: Color
  rounded?: Rounded
  className?: string
}

const VARIANTS: Record<Variant, string> = {
  default: 'border-0 backdrop-blur-sm shadow-lg',
  bordered: 'border shadow-md',
  light: ''
}

const COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TEXT_COLORS: Record<Color, string> = {
  default: 'text-gray-800 dark:text-gray-300',
  primary: 'text-blue-800 dark:text-blue-600',
  secondary: 'text-indigo-800 dark:text-indigo-600',
  success: 'text-green-800 dark:text-green-600',
  warning: 'text-yellow-800 dark:text-yellow-600',
  danger: 'text-red-800 dark:text-red-500'
}

const BORDER_COLORS: Record<Color, string> = {
  default: 'border-gray-800 dark:border-gray-300',
  primary: 'border-blue-800 dark:border-blue-500',
  secondary: 'border-indigo-800 dark:border-indigo-500',
  success: 'border-green-800 dark:border-green-500',
  warning: 'border-yellow-800 dark:border-yellow-500',
  danger: 'border-red-800 dark:border-red-500'
}

const ROUNDEDS: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl'
}

const Table: FC<TableProps> = ({
  children,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  className = '',
  ...props
}) => {
  const containerClass = clsx(
    'w-full overflow-auto',
    VARIANTS[variant],
    ROUNDEDS[rounded],
    TEXT_COLORS[color],
    variant === 'bordered' && BORDER_COLORS[color],
    className
  )

  const tableClass = clsx(
    'w-full border-collapse',
    variant === 'default' && COLORS[color]
  )

  return (
    <div
      className={containerClass}
      role='region'
      aria-label='Data Table'
      {...props}
    >
      <table className={tableClass} role='table'>
        {children}
      </table>
    </div>
  )
}

export default memo(Table)

`

export const TableBodyTs = `import { memo, type FC, type ReactNode } from 'react'
import clsx from 'clsx'

export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export interface TableBodyProps {
  isLoading?: boolean
  loadingContent?: ReactNode
  isEmpty?: boolean
  emptyMessage?: string
  divide?: boolean
  color?: Color
  children?: ReactNode
}

const DIVIDE_COLORS: Record<Color, string> = {
  default: 'divide-gray-800 dark:divide-gray-300',
  primary: 'divide-blue-800 dark:divide-blue-500',
  secondary: 'divide-indigo-800 dark:divide-indigo-500',
  success: 'divide-green-800 dark:divide-green-500',
  warning: 'divide-yellow-800 dark:divide-yellow-500',
  danger: 'divide-red-800 dark:divide-red-500'
}

const TableBody: FC<TableBodyProps> = ({
  isLoading = false,
  loadingContent = null,
  isEmpty = false,
  emptyMessage = 'No data available.',
  divide = false,
  color = 'default',
  children,
  ...props
}) => {
  if (isLoading) {
    return (
      <tbody aria-busy='true' {...props}>
        <tr>
          <td colSpan={100} className='py-6 text-center'>
            {loadingContent}
          </td>
        </tr>
      </tbody>
    )
  }

  if (isEmpty) {
    return (
      <tbody {...props}>
        <tr>
          <td
            colSpan={100}
            className='py-6 text-center'
            role='alert'
            aria-live='polite'
          >
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody
      role='rowgroup'
      className={clsx(divide && \`divide-y \${DIVIDE_COLORS[color]}\`)}
      {...props}
    >
      {children}
    </tbody>
  )
}

export default memo(TableBody)

`

export const TableCellTs = `import { memo, type FC, type ReactNode } from 'react'
import clsx from 'clsx'

export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export interface TableCellProps {
  isSelected?: boolean
  isFocusVisible?: boolean
  selectColor?: Color
  role?: 'cell' | 'columnheader' | 'rowheader'
  tabIndex?: number
  ariaSelected?: boolean
  children: ReactNode
  className?: string
}

const SELECTED_COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/70 dark:bg-zinc-700/80',
  primary: 'bg-blue-500/70',
  secondary: 'bg-indigo-500/70',
  success: 'bg-green-500/80',
  warning: 'bg-yellow-500/90 dark:bg-yellow-500/70',
  danger: 'bg-red-500/70'
}

const TableCell: FC<TableCellProps> = ({
  isSelected = false,
  isFocusVisible = false,
  selectColor = 'default',
  children,
  role = 'cell',
  tabIndex = 0,
  ariaSelected,
  className,
  ...props
}) => {
  return (
    <td
      role={role}
      tabIndex={tabIndex}
      aria-selected={ariaSelected}
      className={clsx(
        'px-6 py-4 whitespace-nowrap text-sm',
        isSelected && SELECTED_COLORS[selectColor],
        isFocusVisible && 'ring-2 ring-blue-500',
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}

export default memo(TableCell)

`

export const TableHeaderTs = `import { memo, type FC, type ReactNode } from 'react'
import clsx from 'clsx'

type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export interface TableHeaderProps {
  children: ReactNode
  color?: Color
  className?: string
}

const COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/20 dark:bg-zinc-700/30',
  primary: 'bg-blue-500/20',
  secondary: 'bg-indigo-500/20',
  success: 'bg-green-500/30',
  warning: 'bg-yellow-500/40 dark:bg-yellow-500/20',
  danger: 'bg-red-500/20'
}

const TableHeader: FC<TableHeaderProps> = ({
  children,
  color = 'default',
  className,
  ...props
}) => {
  return (
    <thead
      className={clsx(
        'border-0 backdrop-blur-md shadow-md',
        COLORS[color],
        className
      )}
      role='rowgroup'
      {...props}
    >
      <tr>{children}</tr>
    </thead>
  )
}

export default memo(TableHeader)

`

export const TableRowTs = `import { memo, type FC, type ReactNode } from 'react'
import clsx from 'clsx'

export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export interface TableRowProps {
  isSelected?: boolean
  isDisabled?: boolean
  isHovered?: boolean
  isFocusVisible?: boolean
  isFirst?: boolean
  isLast?: boolean
  isOdd?: boolean
  selectedColor?: Color
  hoverColor?: Color
  oddColor?: Color
  ariaSelected?: boolean
  children: ReactNode
  className?: string
}

const SELECTED_COLORS: Record<Color, string> = {
  default: 'bg-neutral-100/60 dark:bg-zinc-700/70',
  primary: 'bg-blue-500/60',
  secondary: 'bg-indigo-500/60',
  success: 'bg-green-500/70',
  warning: 'bg-yellow-500/80 dark:bg-yellow-500/60',
  danger: 'bg-red-500/60'
}

const HOVER_COLORS: Record<Color, string> = {
  default: 'hover:bg-neutral-100/40 dark:hover:bg-zinc-700/50',
  primary: 'hover:bg-blue-500/40',
  secondary: 'hover:bg-indigo-500/40',
  success: 'hover:bg-green-500/50',
  warning: 'hover:bg-yellow-500/60 dark:hover:bg-yellow-500/40',
  danger: 'hover:bg-red-500/40'
}

const ODD_COLORS: Record<Color, string> = {
  default: 'bg-neutral-200/20 dark:bg-zinc-800/30',
  primary: 'bg-blue-600/20',
  secondary: 'bg-indigo-600/20',
  success: 'bg-green-600/30',
  warning: 'bg-yellow-600/40 dark:bg-yellow-600/20',
  danger: 'bg-red-600/20'
}

const TableRow: FC<TableRowProps> = ({
  isSelected = false,
  isDisabled = false,
  isHovered = false,
  isFocusVisible = false,
  isFirst = false,
  isLast = false,
  isOdd = false,
  selectedColor = 'default',
  hoverColor = 'default',
  oddColor = 'default',
  children,
  ariaSelected,
  className,
  ...props
}) => {
  return (
    <tr
      role='row'
      aria-selected={ariaSelected}
      tabIndex={isDisabled ? -1 : 0}
      className={clsx(
        'transition-colors duration-200',
        isSelected && SELECTED_COLORS[selectedColor],
        isDisabled && 'opacity-50 cursor-not-allowed',
        HOVER_COLORS[hoverColor],
        isFocusVisible && 'ring-2 ring-blue-500',
        isFirst && 'rounded-t-lg',
        isLast && 'rounded-b-lg',
        isOdd && ODD_COLORS[oddColor],
        className
      )}
      {...props}
    >
      {children}
    </tr>
  )
}

export default memo(TableRow)

`

export const TableColumnTs = `import { type ReactNode, type FC } from 'react'

interface TableColumnProps {
  children: ReactNode
}

const TableColumn: FC<TableColumnProps> = ({ children }) => {
  return (
    <th
      className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider'
      scope='col'
      role='columnheader'
    >
      {children}
    </th>
  )
}

export default TableColumn

`
