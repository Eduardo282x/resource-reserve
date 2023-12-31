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
import axios from "../../env/axios-instance";
import { useEffect, useState } from "react";
import { Card } from "../Shared/Card/Card";
import Swal from "sweetalert2";
import { FormGenerator } from "../Shared/Form/FormGenerator";
import "./users.css";

export const Users = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [rows, setRows] = useState([]);
  const add = [true, true];

  const backdrop = "blur";
  // const [isOpen, setIsOpen] = useState(false)
  const dataFormGenerator = { UserName: "", Name: "", Lastname: "" };
  const labelData = [
    { label: "Nombre de Usuario", val: "UserName", type:'string' },
    { label: "Nombre", val: "Name", type:'string' },
    { label: "Apellido", val: "Lastname", type:'string' },
  ];

  const [responseApi, setResponseApi] = useState({ message: "" });
  const [open, setOpen] = useState(false);
  
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (dataFilter) => {
    setFilterText(dataFilter);
  };

  const filteredRows = rows.filter((row) =>
    row.Name.toLowerCase().includes(filterText.toLowerCase()) ||
    row.Lastname.toLowerCase().includes(filterText.toLowerCase()) ||
    row.Rol.toLowerCase().includes(filterText.toLowerCase())
  );

  const col = [
    { columnName: "Name", type: "string" },
    { columnName: "Lastname", type: "string" },
    { columnName: "Rol", type: "string" },
  ];

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
      onOpen();
      console.log("Agregar");
    }

    if (data.name == "dataApi") {
      // onOpen();
      console.log(data.data);
      // setIsOpen(false)
      onClose();
      axios
        .post("/users/add", data.data)
        .then((response) => {
          console.log(response);
          getUser();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (data.name == "search") {
        handleFilterChange(data.data)
        console.log(data.data)
    }
  };

  const getUser = () => {
    axios
      .get("/users/show")
      .then((response) => {
        setRows(response.data);
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
            getUser();
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
    getUser();
  }, []);

  return (
    <div>
      <Card
        title="Usuarios"
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
              Agregar usuario
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
