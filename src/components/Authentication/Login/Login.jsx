import {Input,Button} from "@nextui-org/react";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Snackbar from '@mui/material/Snackbar';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import './Login.css'
import axios from '../../../env/axios-instance'

export const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [data, setData] = useState({ UserName: "", UserPassword: "" });
  const [responseApi, setResponseApi] = useState({message: '', success: false})

  const [open, setOpen] = useState(false);

  const [state, setState] = useState({
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/authentication", data)
      .then((response) => {
        console.log(response.data);
        if(response){
          setResponseApi(response.data);
          setOpen(true);
          console.log(open);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Login</h1>

      <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
        <Input 
          type="text" 
          label="Usuario" 
          className="inputWidth"
          name="UserName"
          onChange={handleChange}
        />
        <Input
          label="Contraseña"
          variant="flat"
          name="UserPassword"
          onChange={handleChange}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (<Visibility/>) : (<VisibilityOff/>)}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="inputWidth"
        />

        <Button color="primary" onClick={handleSubmit}>
              Iniciar Sesión
        </Button>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        message={[responseApi.message, responseApi.success ? <DoneIcon color="success"/> : <CloseIcon color="error"/>]}
      /> 
    </form>
  )
}
