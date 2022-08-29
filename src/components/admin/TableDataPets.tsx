import { useMemo } from "react";
import { Link } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import { Column, CellProps } from "react-table";
import { NavLink } from "react-router-dom";
import DashboardTable from "./DashboardTable";
import { petStatusColor } from "../../utils/globals/helpers";
import { IPet, IPetColumn } from "../../ts/interfaces/pet.interface";

export default function TableDataPets({ pets }: { pets: (IPet[] | undefined) }) {

  const data = useMemo(
    () => pets!.map(pet => {
      return ({
        name: pet.name,
        type: pet.type,
        status: pet.adoptionStatus,
        id: pet._id,
      })
    }), [],
  )

  const columns: Column<IPetColumn>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: (e: CellProps<IPetColumn>) => <Link as={NavLink} to={`pet/${e.row.original.id}`}><LinkIcon mr={2} />{e.value}</Link>
      },
      { Header: "Type", accessor: "type" },
      {
        Header: "Status",
        accessor: "status",
        Cell: (e: CellProps<IPetColumn>) => <span style={petStatusColor(e.value)} className="dashboard-status">{e.value}</span>
      },
    ], [],
  )

  return (
    <DashboardTable data={data} columns={columns as readonly Column<object>[]} />
  )
}