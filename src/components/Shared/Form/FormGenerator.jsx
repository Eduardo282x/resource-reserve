import { Button, Input,Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import "./formgenerator.css";
import PropTypes from "prop-types";

export const FormGenerator = ({ sendFunc, dataForm, labelData,actionForm }) => {

  const [dataFormGenerator, setDataUser] = useState(dataForm);

  const setData = (event) => {
    const { name, value } = event.target;
    setDataUser({ ...dataFormGenerator, [name]: value });
  };

  const onSubmit = () => {
    sendFunc({ name: actionForm, data: dataFormGenerator });
    console.log(dataFormGenerator);
  };

  const inputString = labelData.filter(input => input.type == 'string');
  const inputTime = labelData.filter(input => input.type == 'time');
  const inputSelect = labelData.filter(input => input.type == 'select');

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      {inputSelect.map((select, index) => (
          <Select 
            label={select.label}
            className="w-full my-5" 
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

      <Button className="btnSpace" type="submit" color="primary" onClick={onSubmit}>
        {actionForm == 'dataApi' ? 'Agregar' : 'Actualizar'}
      </Button>
    </div>
  );
};

FormGenerator.propTypes = {
  sendFunc: PropTypes.func,
  dataForm: PropTypes.object,
  labelData: PropTypes.array,
  actionForm: PropTypes.string
};
