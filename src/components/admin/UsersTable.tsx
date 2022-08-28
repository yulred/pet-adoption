import "./UsersTable.css";
import { useMemo } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Link, Flex } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon, LinkIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, Column, CellProps } from "react-table";
import { NavLink } from "react-router-dom";
import { userRoleColor } from "../../utils/globals/helpers";
import { IUsers, IColumn } from "../../ts/interfaces/user.interface";

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
        Cell: (e: CellProps<IColumn>) => <Link as={NavLink} to={`user/${e.row.original.id}`}><LinkIcon mr={2} />{e.value}</Link>
      },
      {
        Header: "E-Mail",
        accessor: "email",
        Cell: (e: CellProps<IColumn>) => <Link href={`mailto:${e.value}`}>{e.value}</Link>
      },
      { Header: "Phone No.", accessor: "tel" },
      {
        Header: "Role",
        accessor: "role",
        Cell: (e: CellProps<IColumn>) => <span style={userRoleColor(e.value)} className="dashboard-role">{e.value}</span>
      },
    ], [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
      initialState: { sortBy: [{ id: "name", desc: true }]},
      disableSortRemove: true
    }, useSortBy);


  return (
    <Table size="md" variant="simple" colorScheme="blackAlpha" fontSize="1rem" {...getTableProps()}>
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