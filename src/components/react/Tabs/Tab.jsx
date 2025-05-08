const Tab = ({ label, children, disabled = false, href }) => {
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
