import { useState, useEffect } from "react";
import { Card } from "../Shared/Card/Card";
import axios from "../../env/axios-instance";

export const Inventory = () => {
  const [rows, setRows] = useState([]);
  const add = [true, true];

  const col = [
    { columnName: "Description", type: "string" },
    { columnName: "Amount", type: "string" },
    { columnName: "Professor", type: "string" },
    { columnName: "Classroom", type: "string" },
    { columnName: "Date", type: "date" },
  ];

  const columns = [
    {
      key: "Description",
      label: "Descripción",
    },
    {
      key: "Amount",
      label: "Cantidad",
    },
    {
      key: "Professor",
      label: "Profesor",
    },
    {
      key: "Classroom",
      label: "Aula",
    },
    {
      key: "Date",
      label: "Fecha ingreso",
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
      //   deleteUser(data.data);
    }

    if (data.name == "edit") {
      console.log(data.data);
    }

    if (data.name == "add") {
      console.log("Agregar");
    }

    if (data.name == "search") {
      console.log(data.data);
    }
  };

  const getInventory = () => {
    axios
      .get("/inventory/show")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div>
      <Card
        title="Inventario"
        dataTable={rows}
        columns={columns}
        colMap={col}
        sendFunc={childData}
        customBtn={add}
      />

      {/* <Snackbar
        open={open}
        autoHideDuration={1000}
        className="snack"
        message={responseApi.message}
      /> */}
    </div>
  );
};
