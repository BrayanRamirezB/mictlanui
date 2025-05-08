import { type ReactNode, type FC } from 'react'

interface TabProps {
  label?: string
  children: ReactNode
  disabled?: boolean
  href?: string
}

const Tab: FC<TabProps> = ({ label, children, disabled = false, href }) => {
  if (disabled) {
    return <div aria-disabled='true'>{children}</div>
  }

  if (href) {
    return (
      <a href={href} aria-label={label}>
        {children}
      </a>
    )
  }

  return (
    <div
      role='tab'
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
    >
      {children}
    </div>
  )
}

export default Tab
