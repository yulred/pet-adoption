import { useMemo } from "react";
import { Link } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import { Column, CellProps } from "react-table";
import { NavLink } from "react-router-dom";
import DashboardTable from "./DashboardTable";
import { userRoleColor } from "../../utils/globals/helpers";
import { IUsers, IUserColumn } from "../../ts/interfaces/user.interface";

export default function TableDataUsers({ users }: IUsers) {

  const data = useMemo(
    () => users!.map(user => {
      return ({
        name: user.name,
        email: user.email,
        tel: user.tel,
        role: user.role,
        id: user._id,
      }) // eslint-disable-next-line
    }), [],
  )

  const columns: Column<IUserColumn>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: (e: CellProps<IUserColumn>) => <Link as={NavLink} to={`user/${e.row.original.id}`}><LinkIcon mr={2} />{e.value}</Link>
      },
      {
        Header: "E-Mail",
        accessor: "email",
        Cell: (e: CellProps<IUserColumn>) => <Link href={`mailto:${e.value}`}>{e.value}</Link>
      },
      { Header: "Phone No.", accessor: "tel" },
      {
        Header: "Role",
        accessor: "role",
        Cell: (e: CellProps<IUserColumn>) => <span style={userRoleColor(e.value)} className="dashboard-role">{e.value}</span>
      },
    ], [],
  )

  return (
    <DashboardTable data={data} columns={columns as readonly Column<object>[]} />
  )
}