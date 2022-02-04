import { useState } from 'react';

export default function useTrails(getToken) {

    const [trails, setTrails] = useState();
    const [isLoading, setLoading] = useState(true);

    const fetchTrails = () => fetch(`https://localhost:8443/api/trails/`, {
        method: 'GET',
        credentials: 'omit',
        headers: {
            'Authorization': 'Basic ' + getToken()
        }
    }).then(data => {
        data.json().then(function(result) {
            setTrails(result);
            setLoading(false);
            console.log("Set trails to state");
        });
    }).catch((error) => {
        setLoading(false);
        console.error("Failed to get trails: " + error);
    });

   const getTrails = () => {
        return trails;
   }

   const getIsLoading = () => {
        return isLoading;
   }
  
   return {
       getTrails: getTrails,
       setTrails: fetchTrails,
       getLoading: getIsLoading,
       setLoading: setLoading
   }
}