import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import "./formgenerator.css";
import PropTypes from "prop-types";

export const FormGenerator = ({ sendFunc, dataForm, labelData }) => {
  const [dataFormGenerator, setDataUser] = useState(dataForm);

  const setData = (event) => {
    const { name, value } = event.target;
    setDataUser({ ...dataFormGenerator, [name]: value });
  };

  const onSubmit = () => {
    sendFunc({ name: "dataApi", data: dataFormGenerator });
    console.log(dataFormGenerator);
  };

  return (
    <>
      {labelData.map((label, index) => (
        <Input
          key={index}
          autoFocus
          label={label.label}
          name={label.val}
          value={dataFormGenerator[label.val]}
          className="input"
          onChange={() => setData(event)}
          variant="bordered"
        />
      ))}
      <Button color="primary" onClick={onSubmit}>
        Agregar
      </Button>
    </>
  );
};

FormGenerator.propTypes = {
  sendFunc: PropTypes.func,
  dataForm: PropTypes.object,
  labelData: PropTypes.array,
};
