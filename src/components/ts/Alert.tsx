import { useState, useMemo, useCallback, memo, type FC } from 'react'
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
