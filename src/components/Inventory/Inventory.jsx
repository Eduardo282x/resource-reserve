import { useState, useEffect } from "react";
import { Card } from "../Shared/Card/Card";
import axios from "../../env/axios-instance";
import {Modal,ModalContent,ModalHeader,ModalBody,useDisclosure,} from "@nextui-org/react";
import {col,labelData,backdrop,add,columns,dataForm} from './inventory.data'
import Snackbar from "@mui/material/Snackbar";
import { FormGenerator } from "../Shared/Form/FormGenerator";
import Swal from "sweetalert2";

export const Inventory = () => {
  const [rows, setRows] = useState([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [filterText, setFilterText] = useState("");
  const [btnAdds, setBtnAdds] = useState(add);
  const [responseApi, setResponseApi] = useState({ message: "" });
  const [open, setOpen] = useState(false);
  const userLogin = JSON.parse(localStorage.getItem("userData"));


  const [dataFormGeneratorState, setDataFormGeneratorState] = useState(dataForm);
  const [labelDataState, setLabelDataState] = useState(labelData);
  const [isEdit, setIsEdit] = useState(false);
  const [actionForm, setActionForm] = useState('dataApi');

  const handleFilterChange = (dataFilter) => {
    setFilterText(dataFilter);
  };

  const filteredRows = rows.filter((row) =>
    row.Description.toLowerCase().includes(filterText.toLowerCase())
  );

  const checkUser = () => {
    if(userLogin.Rol != 1){
      const btnProfesor = [false, true];
      setBtnAdds(btnProfesor);
    }
  }

  const childData = (data) => {
    if (data.name == "delete") {
      deleteInventory(data.data);
    }

    if (data.name == "edit") {
      setIsEdit(true);
      setActionForm("updateApi");
      editInventory(data.data);
    }

    if (data.name == "add") {
      onOpen();
      setIsEdit(false);
      setActionForm("dataApi");
      setDataFormGeneratorState(dataForm);
      setLabelDataState(labelData);
    }

    if (data.name == "search") {
      handleFilterChange(data.data);
    }

    if (data.name == "dataApi") {
      onClose();
      axios
        .post("/inventory/add", data.data)
        .then((response) => {
          console.log(response);
          setResponseApi(response.data);
          getInventory();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (data.name == "updateApi") {
      onClose();
      axios
        .post(`/inventory/update/${data.data.Id}`, data.data)
        .then((response) => {
          console.log(response);
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
  const editInventory = (inventoryDate) => {
    onOpen();
    const dataForm = { 
      Id: inventoryDate.Id,
      Description: inventoryDate.Description, 
      Amount: inventoryDate.Amount, 
    };
    setDataFormGeneratorState(dataForm);
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
    checkUser();
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
              {!isEdit ? 'Agregar articulo' : 'Editar articulo'}
            </ModalHeader>
            <ModalBody>
              <FormGenerator
                sendFunc={childData}
                dataForm={dataFormGeneratorState}
                labelData={labelDataState}
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
