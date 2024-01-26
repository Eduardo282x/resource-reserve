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
import {col,columns,dataFormGenerator,add,backdrop,userLogin,
} from './reserve.data'

export const Reserve = () => {
  const [rows, setRows] = useState([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (dataFilter) => {
    setFilterText(dataFilter);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.Description.toLowerCase().includes(filterText.toLowerCase())
  );

  const [responseApi, setResponseApi] = useState({ message: "" });

  const [labelData, setLabelData] = useState([
    { label: "Recurso", val: "IdInventario", type: "select", dataOption: [] },
    { label: "Uso", val: "Uses", type: "string" },
    { label: "Hora Inicio", val: "HourStart", type: "time" },
    { label: "Hora Fin", val: "HourEnd", type: "time" },
  ]);

  const [open, setOpen] = useState(false);

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
    const data = { IdProfesor: userLogin.Id };
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
