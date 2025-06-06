import Table from '@/components/react/Table/Table'
import TableHeader from '@/components/react/Table/TableHeader'
import TableBody from '@/components/react/Table/TableBody'
import TableRow from '@/components/react/Table/TableRow'
import TableCell from '@/components/react/Table/TableCell'
import TableColumn from '@/components/react/Table/TableColumn'

const CustomTable = ({
  variant,
  color,
  rounded,
  empty = false,
  emptyMessage,
  loading = false,
  loadingContent,
  divide,
  divideColor,
  rowSelected = false,
  selectedColor,
  disabledRow = false,
  oddRow = false,
  oddColor,
  hover = false,
  hoverColor,
  cellSelected = false,
  selectedCellColor
}) => {
  return (
    <Table variant={variant} color={color} rounded={rounded}>
      <TableHeader>
        <TableColumn>id</TableColumn>
        <TableColumn>name</TableColumn>
        <TableColumn>age</TableColumn>
      </TableHeader>
      {empty ? (
        <TableBody isEmpty emptyMessage={emptyMessage}>
          {[]}
        </TableBody>
      ) : (
        ''
      )}
      {loading ? (
        <TableBody isLoading loadingContent={loadingContent}>
          {[]}
        </TableBody>
      ) : (
        ''
      )}
      {!empty && !loading ? (
        <TableBody divide={divide} color={divideColor}>
          <TableRow
            id='1'
            isSelected={rowSelected}
            selectedColor={selectedColor}
            isOdd={oddRow}
            oddColor={oddColor}
          >
            <TableCell
              isSelected={cellSelected}
              selectColor={selectedCellColor}
            >
              1
            </TableCell>
            <TableCell>Jhon Doe</TableCell>
            <TableCell>28</TableCell>
          </TableRow>
          <TableRow
            id='2'
            isDisabled={disabledRow}
            isHovered={hover}
            hoverColor={hoverColor}
          >
            <TableCell>2</TableCell>
            <TableCell>Jane Smith</TableCell>
            <TableCell>34</TableCell>
          </TableRow>
          <TableRow id='3' isOdd={oddRow} oddColor={oddColor}>
            <TableCell>3</TableCell>
            <TableCell>Sam Green</TableCell>
            <TableCell>45</TableCell>
          </TableRow>
          <TableRow id='4' isHovered={hover} hoverColor={hoverColor}>
            <TableCell>4</TableCell>
            <TableCell>Jackie Chan</TableCell>
            <TableCell>60</TableCell>
          </TableRow>
        </TableBody>
      ) : (
        ''
      )}
    </Table>
  )
}

export default CustomTable
