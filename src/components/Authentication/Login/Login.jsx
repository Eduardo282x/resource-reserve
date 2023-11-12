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
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState({ UserName: "", UserPassword: "" });
  const [responseApi, setResponseApi] = useState({message: '', success: false})
  const [open, setOpen] = useState(false);
  const [btn, setBtn] = useState(true);
  const state = {
    vertical: 'bottom',
    horizontal: 'center',
  };
  const navigate = useNavigate();
  const { vertical, horizontal } = state;

  const btnAble = () => {
    if(data.UserName != '' && data.UserPassword != ''){
      setBtn(false)
    }
  }
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    btnAble()
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
          setTimeout(() => {
            navigate('/home')
          }, 1500);
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
    <div className="bodyLogin">
      <form className="login" onSubmit={handleSubmit}>
            <h1 className="titleForm">Login</h1>

            <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
              <Input 
                type="text" 
                label="Usuario" 
                // isInvalid={data.UserName == ''}
                // errorMessage={data.UserName == '' && "Debe ingresar un nombre de usuario"}
                className="inputWidth"
                name="UserName"
                onChange={handleChange}
              />
              <Input
                label="Contraseña"
                variant="flat"
                // isRequired
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

              <Button color="primary" onClick={handleSubmit} isDisabled={btn}>
                    Iniciar Sesión
              </Button>
            </div>

            <Snackbar
              open={open}
              autoHideDuration={1000}
              onClose={handleClose}
              anchorOrigin={{ vertical, horizontal }}
              className="snack"
              message={[responseApi.message, responseApi.success ? <DoneIcon color="success"/> : <CloseIcon color="error"/>]}
            >

              
              
            </Snackbar>
          </form>
      </div>
  )
}
