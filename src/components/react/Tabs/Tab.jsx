import { memo, forwardRef } from 'react'
import clsx from 'clsx'

const Tab = forwardRef(
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
      role: 'tab',
      'aria-selected': isSelected,
      'aria-disabled': disabled,
      'aria-label': label,
      tabIndex: disabled ? -1 : 0,
      className: clsx(baseClasses, stateClasses, className),
      onClick: disabled ? undefined : onClick,
      ref,
      ...props
    }

    return href && !disabled ? (
      <a href={href} {...commonProps} />
    ) : (
      <button type='button' {...commonProps}>
        {children}
      </button>
    )
  }
)

export default memo(Tab)
