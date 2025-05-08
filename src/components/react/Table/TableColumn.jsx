const TableColumn = ({ children }) => {
  return (
    <th
      className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider'
      scope='col'
      role='columnheader'
    >
      {children}
    </th>
  )
}

export default TableColumn
