import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

import addNewTrail from '../functions/addNewTrail';

export default function AddNewTrailCard({props}) {
    
    // New trail state
    const [title, setTraiTitle] = useState();
    const [iframe, setTrailIframe] = useState();

    const handleAddNew = async e => {
        console.log("Adding a new trail");
        e.preventDefault();

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
        document.getElementById("trailTitleId").value = "";
        document.getElementById("trailIframeId").value = "";
    }

    return (             
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
    );
  }
  