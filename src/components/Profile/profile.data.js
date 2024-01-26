
const userDataProfile = JSON.parse(localStorage.getItem('userData'));

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
    Id: userDataProfile ? userDataProfile.Id : '',
    Name: userDataProfile ? userDataProfile.Name : '',
    Lastname: userDataProfile ? userDataProfile.Lastname : '',
    UserName: userDataProfile ? userDataProfile.UserName : '',
    UserPassword: userDataProfile ? userDataProfile.UserPassword : '',
    Rol: userDataProfile ? userDataProfile.RolDes : '',
};
