import { useState, useEffect } from 'react';

import RemoveModal from './RemoveModal'
import AddNewTrailCard from './AddNewTrailCard'
import DisplayAndEditTrailCard from './DisplayAndEditTrailCard'

import useTrails from '../hooks/useTrails';

export default function ListTrails({ getToken }) {
    const delay = 1000;

    // Existing trails state
    const { getTrails, setTrails, getLoading } = useTrails(getToken);

    // Trail under editing state
    const [underEdit, setUnderEdit] = useState();

    // Show remove modal
    const [showModal, setShowModal] = useState(false);    

    // Trail to be removed
    const [removeId, setRemoveId] = useState();    

    useEffect(() => {
        setTrails();
    }, []);    

    const handleShowModal = async (id, e) => {
        setRemoveId(id);
        setShowModal(true);
    }   
    
    if (!getLoading()) {
        var trails = getTrails();
        if (trails) {        
            return (
                <div className="trails-container">                    
                    <div className="trails-list">
                        
                        {/* Existing trails */}       
                        {trails.map((trail, index) => (                            
                            <div key={index}>
                                <RemoveModal props={{
                                    "removeId": removeId,
                                    "getToken": getToken,
                                    "delay": delay,
                                    "setTrails": setTrails,
                                    "setShowModal": setShowModal,
                                    "showModal": showModal
                                }} />
                                <DisplayAndEditTrailCard props={{
                                    "trail": trail,
                                    "underEdit": underEdit,
                                    "getToken": getToken,
                                    "delay": delay,
                                    "setUnderEdit": setUnderEdit,
                                    "setTrails": setTrails,
                                    "handleShowModal": handleShowModal
                                }} />                                
                            </div>              
                        ))}
                        
                        {/* Add new trail card */}
                        <AddNewTrailCard props={{
                            "getToken": getToken,
                            "delay": delay,
                            "setTrails": setTrails
                        }} />
    
                    </div>
                </div>
            );
        }
    } else {
        return <b>Loading trails!</b>
    }
}
