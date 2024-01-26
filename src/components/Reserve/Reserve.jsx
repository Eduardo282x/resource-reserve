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
  const [btnAdds, setBtnAdds] = useState(add);
  const [open, setOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [filterText, setFilterText] = useState("");
  const [actionForm, setActionForm] = useState('dataApi');
  const [responseApi, setResponseApi] = useState({ message: "" });

  const handleFilterChange = (dataFilter) => {
    setFilterText(dataFilter);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.Description.toLowerCase().includes(filterText.toLowerCase())
  );

  const [labelData, setLabelData] = useState([
    { label: "Recurso", val: "IdInventario", type: "select", dataOption: [] },
    { label: "Uso", val: "Uses", type: "string" },
    { label: "Hora Inicio", val: "HourStart", type: "time" },
    { label: "Hora Fin", val: "HourEnd", type: "time" },
  ]);

  const checkUser = () => {
    if(userLogin.Rol != 1){
      const btnProfesor = [false, true];
      setBtnAdds(btnProfesor);
    }
  }

  const childData = (data) => {
    console.log(data);
    if (data.name == "delete") {
      deleteReserve(data.data);
    }

    if (data.name == "edit") {
      console.log(data.data);
    }

    if (data.name == "add") {
      onOpen();
      setActionForm('dataApi');
  }

    if (data.name == "search") {
      handleFilterChange(data.data);
    }

    if (data.name == "dataApi") {
      addReserve(data.data);
    }
  };

  const getInventory = () => {
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
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  const addReserve = (newReserve) => {
    onClose();
    axios
      .post("/reserve/add", newReserve)
      .then((response) => {
        console.log(response);
        setResponseApi(response.data);
        getReserve();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteReserve = (reserveId) => {
    Swal.fire({
      text: "Estas seguro que deseas eliminar esta reserva?",
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
    checkUser();
    getInventory();
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
        customBtn={btnAdds}
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
                actionForm={actionForm}
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
