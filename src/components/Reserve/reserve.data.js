export const backdrop = "blur";
export const userLogin = JSON.parse(localStorage.getItem("userData"));

export const col = [
    { columnName: "Name", type: "string" },
    { columnName: "Description", type: "string" },
    { columnName: "Uses", type: "string" },
    { columnName: "HourStart", type: "time" },
    { columnName: "HourEnd", type: "time" },
];

export const add = [true, true];

//update

export const columns = [
    {
        key: "Name",
        label: "Profesor",
    },
    {
        key: "Description",
        label: "Recurso",
    },
    {
        key: "Uses",
        label: "Uso",
    },
    {
        key: "HourStart",
        label: "Hora Inicio",
    },
    {
        key: "HourEnd",
        label: "Hora Fin",
    },
    {
        key: "Edit",
        label: "Editar",
    },
    {
        key: "Delete",
        label: "Eliminar",
    },
];

export const dataFormGenerator = {
    IdProfesor: userLogin ? userLogin.Id : '',
    IdInventario: "",
    Uses: "",
    HourStart: "",
    HourEnd: "",
};


