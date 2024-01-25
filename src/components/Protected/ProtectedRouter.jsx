import { useLocation, useNavigate } from "react-router-dom";

export const ProtectedRouter = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const userLogin = JSON.parse(localStorage.getItem('userData'));
    const tokenUncoded = parseJwt(userLogin);

    if(!tokenUncoded ){navigate('/')}
    if(location.pathname == '/users' && tokenUncoded.payload.Rol != 1){navigate('/home')}
  return children;
}

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const payloadData = JSON.parse(window.atob(base64));

    return {
      payload: payloadData,
      expiresAt: !(payloadData.exp * 1000 > Date.now())
    };
  } catch (error) {
    return null;
  }
}