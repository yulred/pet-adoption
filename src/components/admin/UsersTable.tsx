import "./UsersTable.css";
import { useMemo } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Link, Flex } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, Column, CellProps } from "react-table";
import { NavLink } from "react-router-dom";
import { IUsers, IColumn } from "../../utils/interfaces/user.interface";

export default function UsersTable({ users }: IUsers) {

  const data = useMemo(
    () => users!.map(user => {
      return ({
        name: user.name,
        email: user.email,
        tel: user.tel,
        role: user.role,
        id: user._id,
      })
    }), [],
  )

  const columns: Column<IColumn>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: (e: CellProps<IColumn>) => <Link as={NavLink} to={`user/${e.row.original.id}`}>{e.value}</Link>
      },
      {
        Header: "E-Mail",
        accessor: "email",
        Cell: (e: CellProps<IColumn>) => <Link href={`mailto:${e.value}`}>{e.value}</Link>
      },
      { Header: "Phone No.", accessor: "tel" },
      { Header: "Role", accessor: "role" },
    ], [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
      initialState: { sortBy: [{ id: "name", desc: true }]},
      disableSortRemove: true
    }, useSortBy);


  return (
    <Table size="sm" mx={-2} variant="striped" colorScheme="teal" {...getTableProps()}>
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps(column.getSortByToggleProps({ title: `Sort by ${column.Header}` }))}>
                <Flex align="center" wrap="nowrap" gap={2} w="6rem">
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? <TriangleDownIcon /> : <TriangleUpIcon />) : null}
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