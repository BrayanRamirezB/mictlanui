import { type FC, type MouseEvent } from 'react'

interface BreadcrumbItemProps {
  label: string
  href?: string
  icon?: React.ReactNode
  selected?: boolean
  sizeClass?: string
  roundedClass?: string
  colorClass?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
}

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
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
        className={`inline-flex items-center gap-1 cursor-pointer ${sizeClass} ${roundedClass} ${colorClass}
        ${
          selected ? 'font-bold' : 'font-normal'
        } transition duration-300 hover:text-opacity-50 dark:hover:text-opacity-50`}
        aria-current={selected ? 'page' : undefined}
        aria-label={label}
      >
        {icon && (
          <span className='inline-block' aria-hidden='true'>
            {icon}
          </span>
        )}
        {label}
      </a>
    )
  }

  return (
    <button
      type='button'
      onClick={onClick}
      className={`inline-flex items-center gap-1 cursor-pointer ${sizeClass} ${roundedClass} ${colorClass}
        ${
          selected ? 'font-bold' : 'font-normal'
        } transition duration-300 hover:text-opacity-50 dark:hover:text-opacity-50`}
      aria-current={selected ? 'page' : undefined}
      aria-label={label}
    >
      {icon && (
        <span className='inline-block' aria-hidden='true'>
          {icon}
        </span>
      )}
      {label}
    </button>
  )
}

export default BreadcrumbItem
