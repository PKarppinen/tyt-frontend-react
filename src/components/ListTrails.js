import { useState, useEffect } from 'react';
import Trails from './Trails';

export default function ListTrails({ token }) {
    const [trails, setTrails] = useState();
    const [isLoading, setLoading] = useState(true);
    
    const fetchTrails = () => fetch(`https://localhost:8443/api/trails/`, {
                        method: 'GET',
                        credentials: 'omit',
                        headers: {
                            'Authorization': 'Basic ' + token
                        }
                    }).then(data => {
                        data.json().then(function(result) {
                            setTrails(result);
                            setLoading(false);
                        });
                    }).catch((error) => {
                        setLoading(false);
                        console.error("Failed to get trails: " + error);
                    });

    useEffect(() => {
        fetchTrails();
    }, []);

    if (!isLoading) {     
        return <Trails trails={trails} />
    } else {
        return <b>Loading trails!</b>
    }
}
