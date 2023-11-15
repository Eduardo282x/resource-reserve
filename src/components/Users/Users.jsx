import axios from "../../env/axios-instance";
import { useEffect, useState, useMemo } from "react";
import "./users.css";
import { Card } from "../Shared/Card/Card";
import Snackbar from "@mui/material/Snackbar";
import Swal from "sweetalert2";
export const Users = () => {
  const [rows, setRows] = useState([]);
  const add = [true, true];

  const [responseApi, setResponseApi] = useState({ message: "" });
  const [open, setOpen] = useState(false);

  //   const [page, setPage] = useState(1);
  //   const rowsPerPage = 5;

  //   const pages = Math.ceil(rows.length / rowsPerPage);

  //   const items = useMemo(() => {
  //     const start = (page - 1) * rowsPerPage;
  //     const end = start + rowsPerPage;

  //     return rows.slice(start, end);
  //   }, [page, rows]);

  // const clearRows = () => {
  //   setRows([]);
  //   console.log(rows);
  // };

  const col = ['Name','Lastname','Rol',];

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

  const childData = (data) => {
    if (data.name == "delete") {
      deleteUser(data.data);
    }

    if (data.name == "edit") {
      console.log(data.data);
    }

    if (data.name == "add") {
      console.log("Agregar");
    }

    if (data.name == "search") {
      const filteredData = rows.filter((item) => {
        if (item) {
          return (
            item.Name.toLowerCase().includes(data.data.toLowerCase()) ||
            item.Lastname.toLowerCase().includes(data.data.toLowerCase()) ||
            item.Rol.toLowerCase().includes(data.data.toLowerCase())
          );
        }
      });

      setTimeout(() => {
        setRows([filteredData]);
        console.log(rows);
      }, 1500);
      console.log(filteredData);
    }
  };

  const getUser = () => {
    axios
      .get("/users/show")
      .then((response) => {
        // clearRows();
        setRows(response.data)
        // const tempRows = [...rows];
        // response.data.forEach((user) => {
        //   tempRows.push(user);
        // });
        // setRows(tempRows);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = (userId) => {
    Swal.fire({
      // title: 'Error!',
      text: "Estas seguro que deseas eliminar este usuario?",
      // icon: 'error',
      showCancelButton: true,
      confirmButtonText: "Si",
      confirmButtonColor: "blue",
      cancelButtonText: "No",
      cancelButtonColor: "red",
      position: "center",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/users/delete/${userId}`)
          .then((response) => {
            setResponseApi(response.data);
            setOpen(true);
            getUser()
            setTimeout(() => {
              setOpen(false);
            }, 1500);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useMemo(() => {
    // getUser();
    console.log("cambie");
  }, [rows]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Card
        title="Usuarios"
        dataTable={rows}
        columns={columns}
        colMap={col}
        sendFunc={childData}
        customBtn={add}
      />

      <Snackbar
        open={open}
        autoHideDuration={1000}
        className="snack"
        message={responseApi.message}
      />
    </div>
  );
};
