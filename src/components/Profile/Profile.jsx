import { useState } from "react";
import { Button, Input, } from "@nextui-org/react";
import {labelProfile, dataFormProfile} from './profile.data'
import axios from "../../env/axios-instance";
import './profile.css'
export const Profile = () => {
  const [dataForm, setDataForm]  = useState(dataFormProfile)

  const onSubmit = () => {
    console.log(dataForm);
    const userApi = {
      Id: dataForm.Id,
      Name: dataForm.Name,
      Lastname: dataForm.Lastname,
      UserName: dataForm.UserName,
      UserPassword: dataForm.UserPassword
    }

    axios
    .post(`/users/profile/${userApi.Id}`, userApi)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const setData = (event) => {
    const { name, value } = event.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center gap-5 fixForm">
      <p className="titleProfile">Profile</p>

      {labelProfile.map((label, index) => (
        <Input
          key={index}
          autoFocus
          label={label.label}
          name={label.name}
          value={dataForm[label.name]}
          className="input"
          isReadOnly={label.readOnly}
          isDisabled={label.readOnly}
          type="string"
          onChange={() => setData(event)}
          variant="bordered"
        />
      ))}

      <Button className="btnSpace" type="submit" color="primary" onClick={onSubmit}>
        Actualizar
      </Button>
    </div>
  )
}
