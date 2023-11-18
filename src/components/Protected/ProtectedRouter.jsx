import { useNavigate } from "react-router-dom";

export const ProtectedRouter = ({children}) => {
    const navigate = useNavigate();
    const userLogin = localStorage.getItem('userData');
    if(!userLogin){navigate('/')}
  return children;
}
