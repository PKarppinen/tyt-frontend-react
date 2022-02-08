import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

import updateTrail from '../functions/updateTrail';

export default function DisplayAndEditCard({props}) {
    
    // Updated trail state
    const [updatedTitle, setUpdatedTrailTitle] = useState();
    const [updatedIframe, setUpdatedTrailIframe] = useState();

    const edit = async (id, titleUnderEdit, iframeUnderEdit, e) => {
        console.log("Editing the trail with id: " + id);
        e.preventDefault();
        id != props.underEdit ? props.setUnderEdit(id) : props.setUnderEdit("");   
        
        setUpdatedTrailTitle(titleUnderEdit);
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
        }, props.getToken);

        // Wait 2s before updating trails
        await new Promise(r => setTimeout(r, props.delay)); 

        // Fetch and set new trails
        props.setUnderEdit("");
        props.setTrails();
    }

    return (
        <div>  
            { props.underEdit != props.trail.id &&
                <Card id="displayCard" className="trail-card">
                    <Card.Body>
                        <Card.Title>
                            <div className='card-title-container'>
                                <div className='card-title'>
                                    {props.trail.title}
                                </div>
                                <div className='card-buttons'>
                                    <Button title="Edit" variant="outline-light" type="submit" className="edit-button" onClick={e => edit(props.trail.id, props.trail.title, props.trail.iframe, e)} />
                                    <Button title="Remove" variant="outline-light" type="submit" className="remove-button" onClick={e => props.handleShowModal(props.trail.id, e)} />
                                </div>
                            </div>
                        </Card.Title>
                        <div dangerouslySetInnerHTML={{__html: props.trail.iframe}}></div>
                    </Card.Body>
                </Card>
            }
            { props.underEdit == props.trail.id &&           
                <Card className="trail-card">
                    <Card.Body>
                        <form onSubmit={e => handleUpdateTrail(props.trail.id, e)} className="login-form">
                            <Form.Group className="mb-3">
                                <Card.Title>
                                    <div className='card-title-container'>
                                        <div className='card-title' />                                                            
                                        <div className='card-buttons'>
                                            <Button title="Edit" variant="outline-light" type="submit" className="edit-button" onClick={e => edit(props.trail.id, e)} />
                                            <Button title="Remove" variant="outline-light" type="submit" className="remove-button" onClick={e => props.handleShowModal(props.trail.id, e)} />
                                        </div>
                                    </div>
                                    <div>
                                        <p>Title</p>
                                        <Form.Control id="updatedTrailTitleId" type="text" onChange={e => setUpdatedTrailTitle(e.target.value)} defaultValue={props.trail.title} />
                                    </div>
                                </Card.Title>
                                <Card.Text>
                                    <p>iframe</p>
                                    <Form.Control id="updatedTrailIframeId" as="textarea" rows={10} onChange={e => setUpdatedTrailIframe(e.target.value)} defaultValue={props.trail.iframe} />
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
    );
  }
  