const TableRow = ({
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
      className={`
          ${isSelected ? selectedColors[selectedColor] : ''}
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${isHovered ? hoverColors[hoverColor] : ''}
          ${isFocusVisible ? 'ring-2 ring-blue-500' : ''}
          ${isFirst ? 'rounded-t-lg' : ''}
          ${isLast ? 'rounded-b-lg' : ''}
          ${isOdd ? oddColors[oddColor] : ''}
          transition-colors duration-200
        `}
    >
      {children}
    </tr>
  )
}

export default TableRow
