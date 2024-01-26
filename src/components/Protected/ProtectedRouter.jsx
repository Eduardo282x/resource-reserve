import { useLocation, useNavigate } from "react-router-dom";

export const ProtectedRouter = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const userLogin = JSON.parse(localStorage.getItem('userData'));

    if(!userLogin ){navigate('/')}
    if(location.pathname == '/users' && userLogin.Rol != 1){navigate('/home')}
  return children;
}