import { useState } from 'react';
import { Card, Form, Button, InputGroup, Row } from 'react-bootstrap';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

import addNewTrail from '../functions/addNewTrail';

export default function AddNewTrailCard({props}) {
    
    // New trail state
    const [title, setTraiTitle] = useState();
    const [iframe, setTrailIframe] = useState();

    // Form valitation
    const [validated, setValidated] = useState(false);

    const handleAddNew = async e => {
        console.log("Adding a new trail");

        setValidated(true);
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();  
          return;        
        }

        // Add new trail
        await addNewTrail({
            title,
            iframe
        }, props.getToken);

        // Wait 2s before updating trails
        await new Promise(r => setTimeout(r, props.delay)); 

        // Fetch and set new trails
        props.setTrails(); 
        
       // Clean input fields  
       document.getElementById('validationTrailTitle').value = "";
       document.getElementById('validationTrailIframe').value = "";
       setTraiTitle("");
       setTrailIframe("");
    }

    return (             
        <Card className="trail-card">
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleAddNew} >
                    <Row className="mb-3">
                    <Card.Title>
                        <Form.Group controlId="validationTrailTitle">
                            <InputGroup hasValidation>
                                <Form.Control 
                                    type="text" 
                                    onChange={e => setTraiTitle(e.target.value)} 
                                    isInvalid={title != undefined && title == ''} 
                                    placeholder="Title of the trail" />
                                <Form.Control.Feedback type="invalid">Trail title is required!</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Card.Title>
                    </Row>
                    <Card.Text>
                        <Row className="mb-3">
                            <Form.Group controlId="validationTrailIframe">                   
                                <InputGroup hasValidation>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={13}  
                                        onChange={e => setTrailIframe(e.target.value)}                                         
                                        isInvalid={iframe != undefined && !String(iframe).startsWith("<iframe src=")}
                                        placeholder="Full iframe element. Element has to start with: '<iframe src=&quot;https://www.google.com/maps/embed\?' which will be followed by the parameters of your route. The element has to end with '></iframe>'. You can get full iframe element desctiption from Google maps."/>
                                    <Form.Control.Feedback type="invalid">Trail iframe is empty or in wrong format!</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">                        
                            <Button variant="success" type="submit">Add new trail</Button>
                        </Row>
                    </Card.Text>                    
                </Form>
            </Card.Body>
        </Card>
    );
}