import { memo } from 'react'
import clsx from 'clsx'

const DIVIDE_COLORS = {
  default: 'divide-gray-800 dark:divide-gray-300',
  primary: 'divide-blue-800 dark:divide-blue-500',
  secondary: 'divide-indigo-800 dark:divide-indigo-500',
  success: 'divide-green-800 dark:divide-green-500',
  warning: 'divide-yellow-800 dark:divide-yellow-500',
  danger: 'divide-red-800 dark:divide-red-500'
}

const TableBody = ({
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
      className={clsx({ ['divide-y ' + DIVIDE_COLORS[color]]: divide })}
      {...props}
    >
      {children}
    </tbody>
  )
}

export default memo(TableBody)
