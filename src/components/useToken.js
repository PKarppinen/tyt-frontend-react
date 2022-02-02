import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    return sessionStorage.getItem('token');  
  };

  const [token, setToken] = useState(getToken());

  return {
    token,
    saveToken: setToken
  }
}