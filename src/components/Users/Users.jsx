import {Modal,ModalContent,ModalHeader,ModalBody,useDisclosure} from "@nextui-org/react";
import Snackbar from "@mui/material/Snackbar";
import axios from "../../env/axios-instance";
import { useEffect, useState } from "react";
import { Card } from "../Shared/Card/Card";
import { FormGenerator } from "../Shared/Form/FormGenerator";
import {add,backdrop,dataFormGenerator,labelData,col,columns} from './users.data'
import Swal from "sweetalert2";
import "./users.css";

export const Users = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [rows, setRows] = useState([]);
  const [dataFormGeneratorState, setDataFormGeneratorState] = useState(dataFormGenerator);
  const [labelDataState, setLabelDataState] = useState(labelData);
  const [isEdit, setIsEdit] = useState(false);
  const [actionForm, setActionForm] = useState('dataApi');

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

  const childData = (data) => {
    if (data.name == "delete") {
      deleteUser(data.data);
    }

    if (data.name == "edit") {
      setIsEdit(true);
      setActionForm("updateApi");
      editUser(data.data);
    }

    if (data.name == "add") {
      onOpen();
      setIsEdit(false);
      setActionForm("dataApi");
      setDataFormGeneratorState(dataFormGenerator);
      setLabelDataState(labelData);
    }

    if (data.name == "dataApi") {
      console.log(data.data);
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

    if (data.name == "updateApi") {
      onClose();
      axios
        .post(`/users/update/${data.data.Id}`, data.data)
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
  const editUser = (userData) => {
    onOpen();
    const dataForm = { 
      Id: userData.Id,
      UserName: userData.UserName, 
      Name: userData.Name, 
      Lastname: userData.Lastname
    };
    setDataFormGeneratorState(dataForm);
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
            <ModalHeader className="flex justify-center items-center h-[10rem] text-center text-black">
              {!isEdit ? 'Agregar usuario' : 'Editar usuario'}
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
