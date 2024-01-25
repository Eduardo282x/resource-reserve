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

export const Reserve = () => {
  const [rows, setRows] = useState([]);
  const add = [true, true];
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const backdrop = "blur";

  const userLogin = JSON.parse(localStorage.getItem("userData"));


  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const payloadData = JSON.parse(window.atob(base64));
  
      return {
        payload: payloadData,
        expiresAt: !(payloadData.exp * 1000 > Date.now())
      };
    } catch (error) {
      return null;
    }
  }

  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (dataFilter) => {
    setFilterText(dataFilter);
  };

  const filteredRows = rows.filter(
    (row) =>
      // row.Name.toLowerCase().includes(filterText.toLowerCase()) ||
      row.Description.toLowerCase().includes(filterText.toLowerCase())
  );

  const tokenUncoded = parseJwt(userLogin)
  console.log(tokenUncoded.payload.Id);
  // const [isOpen, setIsOpen] = useState(false)
  const [responseApi, setResponseApi] = useState({ message: "" });
  const dataFormGenerator = {
    IdProfesor: tokenUncoded.payload.Id,
    IdInventario: "",
    Uses: "",
    HourStart: "",
    HourEnd: "",
  };

  const [labelData, setLabelData] = useState([
    { label: "Recurso", val: "IdInventario", type: "select", dataOption: [] },
    { label: "Uso", val: "Uses", type: "string" },
    { label: "Hora Inicio", val: "HourStart", type: "time" },
    { label: "Hora Fin", val: "HourEnd", type: "time" },
  ]);

  const [open, setOpen] = useState(false);

  const col = [
    { columnName: "Name", type: "string" },
    { columnName: "Description", type: "string" },
    { columnName: "Uses", type: "string" },
    { columnName: "HourStart", type: "time" },
    { columnName: "HourEnd", type: "time" },
  ];

  const columns = [
    {
      key: "Name",
      label: "Profesor",
    },
    {
      key: "Description",
      label: "Recurso",
    },
    {
      key: "Uses",
      label: "Uso",
    },
    {
      key: "HourStart",
      label: "Hora Inicio",
    },
    {
      key: "HourEnd",
      label: "Hora Fin",
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
      deleteReserve(data.data);
    }

    if (data.name == "edit") {
      console.log(data.data);
    }

    if (data.name == "add") {
      const selectResource = labelData.find(
        (input) => input.val == "IdInventario"
      );

      axios
        .get("/inventory/show")
        .then((response) => {
            selectResource.dataOption = []

          response.data.map((dataUser) => {
            selectResource.dataOption.push({
              value: dataUser.Id,
              label: dataUser.Description,
            });
          });

          setLabelData((prevLabelData) =>
            prevLabelData.map((input) => {
              if (input.val === "IdInventario") {
                return { ...input, selectResource };
              }
              return input;
            })
          );
          onOpen();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (data.name == "search") {
      handleFilterChange(data.data);
    }

    if (data.name == "dataApi") {
      onClose();
      axios
        .post("/reserve/add", data.data)
        .then((response) => {
          console.log(response);
          setResponseApi(response.data);
          getReserve();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getReserve = () => {
    const data = { IdProfesor: tokenUncoded.payload.Id };
    axios
      .post("/reserve/show", data)
      .then((response) => {
        setRows(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteReserve = (reserveId) => {
    Swal.fire({
      // title: 'Error!',
      text: "Estas seguro que deseas eliminar esta reserva?",
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
          .delete(`/reserve/delete/${reserveId}`)
          .then((response) => {
            setResponseApi(response.data);
            setOpen(true);
            getReserve();
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
    getReserve();
  }, []);

  return (
    <div>
      <Card
        title="Reserva"
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
