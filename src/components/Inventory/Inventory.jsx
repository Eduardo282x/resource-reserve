import { useState } from "react";
import { Card } from "../Shared/Card/Card";

export const Inventory = () => {

    const [rows, setRows] = useState([{description: 'Articulo 1'},{description: 'Articulo 2'}]);
    const add = [true, true];

    const col = ['description'];

    const columns = [
        {
          key: "description",
          label: "Descripción",
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
