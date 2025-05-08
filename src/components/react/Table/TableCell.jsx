const TableCell = ({
  isSelected,
  isFocusVisible,
  selectColor = 'default',
  children,
  role = 'cell',
  tabIndex = 0,
  ariaSelected
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
      role={role}
      tabIndex={tabIndex}
      aria-selected={ariaSelected}
      className={`
          px-6 py-4 whitespace-nowrap text-sm
          ${isSelected ? selectedColors[selectColor] : ''}
          ${isFocusVisible ? 'ring-2 ring-blue-500' : ''}
        `}
    >
      {children}
    </td>
  )
}

export default TableCell
