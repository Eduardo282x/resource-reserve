import axios from "../../env/axios-instance";
import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import "./users.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

export const Users = () => {
  const [rows, setRows] = useState([]);

//   const [page, setPage] = useState(1);
//   const rowsPerPage = 5;

//   const pages = Math.ceil(rows.length / rowsPerPage);

//   const items = useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     return rows.slice(start, end);
//   }, [page, rows]);

  const clearRows = () => {
    setRows([]);
  };

  const columns = [
    {
      key: "Name",
      label: "Nombre",
    },
    {
      key: "Lastname",
      label: "Apellido",
    },
    {
      key: "Rol",
      label: "Rol",
    },
    {
      key: "Edit",
      label: "Editar",
    },
    {
      key: "Delete",
      label: "Eliminar",
    },
  ];

  const getUser = () => {
    axios
      .get("/users/show")
      .then((response) => {
        clearRows();
        const tempRows = [...rows];
        response.data.forEach((user) => {
          tempRows.push(user);
        });
        setRows(tempRows);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };

    fetchData();
  }, []);

  return (
    <div>
      Users
      <Table
        aria-label="users"
        // selectionMode="single" 
        // defaultSelectedKeys={["2"]} 
        color="primary"
        // bottomContent={
        //   <div className="flex w-full justify-center">
        //     <Pagination
        //       isCompact
        //       showControls
        //       showShadow
        //       color="secondary"
        //       page={page}
        //       total={pages}
        //       onChange={(page) => setPage(page)}
        //     />
        //   </div>
        // }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="headerTable">{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {rows.map((item) => (
            <TableRow key={item.Id} className="textTable">
              <TableCell>{item.Name}</TableCell>
              <TableCell>{item.Lastname}</TableCell>
              <TableCell>{item.Rol}</TableCell>
              <TableCell>
                    <IconButton
                    aria-label="toggle password visibility"
                    color="primary"
                    edge="end"
                    >
                    {<EditIcon />}
                    </IconButton>
                </TableCell>
              <TableCell>
                    <IconButton
                    aria-label="toggle password visibility"
                    color="error"
                    edge="end"
                    >
                    {<DeleteIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
