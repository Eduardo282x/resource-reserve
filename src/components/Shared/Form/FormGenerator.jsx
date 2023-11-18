import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import "./formgenerator.css";
import PropTypes from "prop-types";

export const FormGenerator = ({ sendFunc }) => {
  const [dataUser, setDataUser] = useState({
    Name: "",
    Lastname: "",
    UserName: "",
  });

  const setData = (event) => {
    const { name, value } = event.target;
    setDataUser({ ...dataUser, [name]: value });
  };

  const onSubmit = () => {
    sendFunc({ name: "addUser", data: dataUser });
    console.log(dataUser);
  };

  return (
    <>
      <Input
        autoFocus
        label="Nombre"
        variant="bordered"
        className="input"
        value={dataUser.name}
        onChange={() => setData(event)}
        name="Name"
      />
      <Input
        autoFocus
        label="Apellido"
        variant="bordered"
        className="input"
        value={dataUser.Lastname}
        onChange={() => setData(event)}
        name="Lastname"
      />
      <Input
        autoFocus
        label="Nombre de Usuario"
        name="UserName"
        className="input"
        value={dataUser.UserName}
        onChange={() => setData(event)}
        variant="bordered"
      />
      <Button color="primary" onClick={onSubmit}>
        Agregar
      </Button>
    </>
  );
};

FormGenerator.propTypes = {
  sendFunc: PropTypes.func,
};
