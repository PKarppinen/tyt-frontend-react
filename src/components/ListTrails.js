import { ConsoleIcon } from 'evergreen-ui';
import { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

import addNewTrail from '../functions/addNewTrail';
import removeTrail from '../functions/removeTrail';
import updateTrail from '../functions/updateTrail';

import useTrails from '../hooks/useTrails';

export default function ListTrails({ getToken }) {
    const delay = 1000;

    // Existing trails state
    const { getTrails, setTrails, getLoading } = useTrails(getToken);

    // New trail state
    const [title, setTraiTitle] = useState();
    const [iframe, setTrailIframe] = useState();

    // Trail under editing state
    const [underEdit, setUnderEdit] = useState();

    // New trail state
    const [updatedTitle, setUpdatedTraiTitle] = useState();
    const [updatedIframe, setUpdatedTrailIframe] = useState();

    useEffect(() => {
        setTrails();
    }, []);

    const handleAddNew = async e => {
        console.log("Adding a new trail");
        e.preventDefault();

        // Add new trail
        await addNewTrail({
            title,
            iframe
        }, getToken);

        // Wait 2s before updating trails
        await new Promise(r => setTimeout(r, delay)); 

        // Fetch and set new trails
        setTrails();

        // Clean input fields   
        document.getElementById("trailTitleId").value = "";
        document.getElementById("trailIframeId").value = "";
    }

    const remove = async (id, e) => {
        console.log("Removing the trail with id " + id);
        e.preventDefault();

        // Remove the trail
        await removeTrail(id, getToken);

        // Wait 2s before updating trails
        await new Promise(r => setTimeout(r, delay)); 

        // Fetch and set new trails
        setTrails();
    }

    const edit = async (id, titleUnderEdit, iframeUnderEdit, e) => {
        console.log("Editing the trail with id: " + id);
        e.preventDefault();
        id != underEdit ? setUnderEdit(id) : setUnderEdit("");   
        
        setUpdatedTraiTitle(titleUnderEdit);
        setUpdatedTrailIframe(iframeUnderEdit);
    }

    const handleUpdateTrail = async (id, e) => {
        console.log("Updating the trail");
        e.preventDefault();

        // Update trail
        await updateTrail({
            id: id,
            title: updatedTitle,
            iframe: updatedIframe
        }, getToken);

        // Wait 2s before updating trails
        await new Promise(r => setTimeout(r, delay)); 

        // Fetch and set new trails
        setUnderEdit("");
        setTrails();
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
                                { underEdit != trail.id && 
                                    <Card id="displayCard" className="trail-card">
                                        <Card.Body>
                                            <Card.Title>
                                                <div className='card-title-container'>
                                                    <div className='card-title'>
                                                        {trail.title}
                                                    </div>
                                                    <div className='card-buttons'>
                                                        <Button title="Edit" variant="outline-light" type="submit" className="edit-button" onClick={e => edit(trail.id, trail.title, trail.iframe, e)} />
                                                        <Button title="Remove" variant="outline-light" type="submit" className="remove-button" onClick={e => remove(trail.id, e)} />
                                                    </div>
                                                </div>
                                            </Card.Title>
                                            <div dangerouslySetInnerHTML={{__html: trail.iframe}}></div>
                                        </Card.Body>
                                    </Card>  
                                }
                                { underEdit == trail.id &&
                                    <Card className="trail-card">
                                        <Card.Body>
                                            <form onSubmit={e => handleUpdateTrail(trail.id, e)} className="login-form">
                                                <Form.Group className="mb-3">
                                                    <Card.Title>
                                                        <div className='card-title-container'>
                                                            <div className='card-title' />                                                            
                                                            <div className='card-buttons'>
                                                                <Button title="Edit" variant="outline-light" type="submit" className="edit-button" onClick={e => edit(trail.id, e)} />
                                                                <Button title="Remove" variant="outline-light" type="submit" className="remove-button" onClick={e => remove(trail.id, e)} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p>Title</p>
                                                            <Form.Control id="updatedTrailTitleId" type="text" onChange={e => setUpdatedTraiTitle(e.target.value)} defaultValue={trail.title} />
                                                        </div>
                                                    </Card.Title>
                                                    <Card.Text>
                                                        <p>iframe</p>
                                                        <Form.Control id="updatedTrailIframeId" as="textarea" rows={10} onChange={e => setUpdatedTrailIframe(e.target.value)} defaultValue={trail.iframe} />
                                                    </Card.Text>
                                                    <div>
                                                        <Button variant="success" type="submit">Update</Button>
                                                    </div>
                                                </Form.Group>
                                            </form>
                                        </Card.Body>
                                    </Card>
                                }
                            </div>              
                        ))}
                        
                        {/* Add new trail card */}
                        <Card className="trail-card">
                            <Card.Body>
                                <form onSubmit={handleAddNew} className="login-form">
                                    <Form.Group className="mb-3">
                                        <Card.Title>
                                            <p>Title</p>
                                            <Form.Control id="trailTitleId" type="text" onChange={e => setTraiTitle(e.target.value)} />
                                        </Card.Title>
                                        <Card.Text>
                                            <p>iframe</p>
                                            <Form.Control id="trailIframeId" as="textarea" rows={10}  onChange={e => setTrailIframe(e.target.value)} />
                                        </Card.Text>
                                        <div>
                                            <Button variant="success" type="submit">Add new trail</Button>
                                        </div>
                                    </Form.Group>
                                </form>
                            </Card.Body>
                        </Card>
    
                    </div>
                </div>
            );
        }
    } else {
        return <b>Loading trails!</b>
    }
}
