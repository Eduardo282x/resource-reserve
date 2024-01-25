const userLogin = JSON.parse(localStorage.getItem('userData'));
export const parseJwt = () => {
    try {
        const base64Url = userLogin.split('.')[1];
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