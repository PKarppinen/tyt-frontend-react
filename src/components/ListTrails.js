import { useEffect } from 'react';
import Trails from './Trails';

import useTrails from '../hooks/useTrails';

export default function ListTrails({ getToken }) {
    const { getTrails, setTrails, getLoading, setLoading } = useTrails(getToken);

    useEffect(() => {
        setTrails();
    }, []);

    if (!getLoading()) {
        return <Trails props={{trails: getTrails(), getToken: getToken}} />
    } else {
        return <b>Loading trails!</b>
    }
}
