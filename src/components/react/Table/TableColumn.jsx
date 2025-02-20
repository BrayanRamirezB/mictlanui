const TableColumn = ({ children }) => {
  return (
    <th className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider'>
      {children}
    </th>
  )
}

export default TableColumn
