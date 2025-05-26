import { forwardRef, memo, type ReactNode, type MouseEvent } from 'react'
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
