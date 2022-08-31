import "./DashboardTable.css";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, Column } from "react-table";

export default function DashboardTable({ columns, data }: { columns: readonly Column<object>[], data: object[] }) {

  const caseInsensitiveSort = (row1: string, row2: string) => { 
    let r1 = row1.toLowerCase();
    let r2 = row2.toLowerCase();
    
    if (r1 < r2) return -1;
    if (r1 > r2) return 1;
    return 0;
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { 
      columns,
      data,
      initialState: { sortBy: [{ id: "name", desc: false }]},
      sortTypes: { alphanumeric: (row1, row2, name) => caseInsensitiveSort(row1.values[name], row2.values[name]) },
      disableSortRemove: true,
    }, useSortBy);

  return (
    <Table size="md" variant="simple" colorScheme="blackAlpha" fontSize="1rem" mt={4} {...getTableProps()}>
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps(column.getSortByToggleProps({ title: `Sort by ${column.Header}` }))}>
                <Flex align="center" wrap="nowrap" gap={2} w="6rem">
                  {column.render("Header")}
                  {column.isSorted
                    ? (column.isSortedDesc ? <TriangleDownIcon /> : <TriangleUpIcon />)
                    : null}
                </Flex>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>)}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}