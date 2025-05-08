const BreadcrumbSeparator = ({ separator, colorClass, ariaLabel }) => (
  <span
    className={`mx-1 ${colorClass}`}
    role='separator'
    aria-label={ariaLabel || 'breadcrumb separator'}
  >
    {separator}
  </span>
)

export default BreadcrumbSeparator
