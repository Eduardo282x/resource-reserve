import { useState, useEffect } from "react";
import { Card } from "../Shared/Card/Card";
import axios from "../../env/axios-instance";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  // Checkbox,
  // Input,
  // Link,
} from "@nextui-org/react";
import Snackbar from "@mui/material/Snackbar";
import { FormGenerator } from "../Shared/Form/FormGenerator";
import Swal from "sweetalert2";

export const Inventory = () => {
  const [rows, setRows] = useState([]);
  const add = [true, true];
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const backdrop = "blur";

  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (dataFilter) => {
      setFilterText(dataFilter);
  };

  const filteredRows = rows.filter((row) =>
    row.Description.toLowerCase().includes(filterText.toLowerCase()) 
  );

  // const [isOpen, setIsOpen] = useState(false)
  const [responseApi, setResponseApi] = useState({ message: "" });
  const dataFormGenerator = { Description: "", Amount: ''};
  const labelData = [
    { label: "Descripción", val: "Description", type:'string' },
    { label: "Cantidad", val: "Amount", type:'string' },
  ];
  const [open, setOpen] = useState(false);

  const col = [
    { columnName: "Description", type: "string" },
    { columnName: "Amount", type: "string" },
    // { columnName: "Professor", type: "string" },
    // { columnName: "Classroom", type: "string" },
    { columnName: "Use", type: "string" },
    // { columnName: "Date", type: "date" },
  ];

  const columns = [
    {
      key: "Description",
      label: "Recurso",
    },
    {
      key: "Amount",
      label: "Cantidad Total",
    },
    {
      key: "Use",
      label: "Cantidad Usada",
    },
    // {
    //   key: "Date",
    //   label: "Fecha ingreso",
    // },
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
      deleteInventory(data.data);
    }

    if (data.name == "edit") {
      console.log(data.data);
    }

    if (data.name == "add") {
      onOpen();
      console.log("Agregar");
    }

    if (data.name == "search") {
      handleFilterChange(data.data)
    }

    if (data.name == "dataApi") {
      onClose();
      axios
        .post("/inventory/add", data.data)
        .then((response) => {
          console.log(response);
          setResponseApi(response.data)
          getInventory();
        })
        .catch((error) => {
          console.log(error);
        });
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

  const deleteInventory = (inventoryId) => {
    Swal.fire({
      // title: 'Error!',
      text: "Estas seguro que deseas eliminar este articulo?",
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
          .delete(`/inventory/delete/${inventoryId}`)
          .then((response) => {
            setResponseApi(response.data);
            setOpen(true);
            getInventory();
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

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div>
      <Card
        title="Inventario"
        dataTable={filteredRows}
        columns={columns}
        colMap={col}
        sendFunc={childData}
        customBtn={add}
      />

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop={backdrop}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex justify-center text-center text-black">
              Agregar articulo
            </ModalHeader>
            <ModalBody>
              <FormGenerator
                sendFunc={childData}
                dataForm={dataFormGenerator}
                labelData={labelData}
              />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>

      <Snackbar
        open={open}
        autoHideDuration={1000}
        className="snack"
        message={responseApi.message}
      /> 
    </div>
  );
};
