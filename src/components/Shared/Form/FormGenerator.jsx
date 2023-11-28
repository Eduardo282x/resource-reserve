import { Button, Input,Select, SelectItem } from "@nextui-org/react";
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

  const inputString = labelData.filter(input => input.type == 'string');
  const inputTime = labelData.filter(input => input.type == 'time');
  const inputSelect = labelData.filter(input => input.type == 'select');

  return (
    <>
      {inputSelect.map((select, index) => (
          <Select 
            label={select.label}
            className="w-full" 
            key={index}
            variant="bordered"
            name={select.val}
            onChange={setData}
          >
            {select.dataOption.map((option) => (
              <SelectItem key={option.value} className="select" value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
      ))}
      {inputString.map((label, index) => (
        <Input
          key={index}
          autoFocus
          label={label.label}
          name={label.val}
          value={dataFormGenerator[label.val]}
          className="input"
          type="string"
          onChange={() => setData(event)}
          variant="bordered"
        />
      ))}
      {inputTime.map((label, index) => (
        <Input
          key={index}
          autoFocus
          label={label.label}
          name={label.val}
          value={dataFormGenerator[label.val]}
          className="input"
          type="time"
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
