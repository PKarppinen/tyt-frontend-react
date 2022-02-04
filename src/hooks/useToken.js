import { useState } from 'react';

export default function useToken() {
  const getSessionToken = () => {
    return sessionStorage.getItem('authData');  
  };

  const [token, setToken] = useState(getSessionToken());

  const saveToken = userToken => {
    sessionStorage.setItem('authData', userToken);
    setToken(userToken);
  };

  return {
    getToken: getSessionToken,
    setToken: saveToken    
  }
}