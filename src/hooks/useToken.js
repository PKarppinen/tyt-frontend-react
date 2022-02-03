import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    return sessionStorage.getItem('authData');  
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('authData', userToken);
    setToken(userToken);
  };

  return {
    token,
    setToken: saveToken
  }
}