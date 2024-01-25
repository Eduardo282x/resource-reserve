import { parseJwt } from "../jwtGet";

const userDataProfile = parseJwt().payload;

export const labelProfile = [
  {
    label: "Nombre",
    name: "Name",
    readOnly: false,
  },
  {
    label: "Apellido",
    name: "Lastname",
    readOnly: false,
  },
  {
    label: "Nombre de usuario",
    name: "UserName",
    readOnly: false,
  },
  {
    label: "Rol",
    name: "Rol",
    readOnly: true,
  },
  {
    label: "Contraseña",
    name: "UserPassword",
    readOnly: false,
  },
];

export const dataFormProfile = {
    Id: userDataProfile.Id,
    Name: userDataProfile.Name,
    Lastname: userDataProfile.Lastname,
    UserName: userDataProfile.UserName,
    UserPassword: userDataProfile.UserPassword,
    Rol: userDataProfile.RolDes,
};
