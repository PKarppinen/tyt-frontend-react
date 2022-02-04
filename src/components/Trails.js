import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

import addNewTrail from '../functions/addNewTrail';
import useTrails from '../hooks/useTrails';

export default function Trails({props}) {
    const { getTrails, setTrails, getLoading, setLoading } = useTrails(props.getToken);
    const [title, setTraiTitle] = useState();
    const [iframe, setTrailIframe] = useState();

    const handleAddNew = async e => {
        e.preventDefault();
        await addNewTrail({
            title,
            iframe
        }, props.getToken);    
        setTrails();
      }

    if (props.trails) {        
        return (
            <div className="trails-container">
                <div className="trails-list">
                    
                    {/* Existing trails */}       
                    {props.trails.map((trail, index) => (
                        <div key={index}>
                            <Card className="trail-card">
                                <Card.Body>
                                    <Card.Title>{trail.title}</Card.Title>
                                    <div dangerouslySetInnerHTML={{__html: trail.iframe}}></div>
                                </Card.Body>
                            </Card>
                        </div>              
                    ))}
                    
                    {/* Add new trail card */}
                    <Card className="trail-card">
                        <Card.Body>
                            <form onSubmit={handleAddNew} className="login-form">
                                <Form.Group className="mb-3">
                                    <Card.Title>
                                        <p>Title</p>
                                        <Form.Control type="text" onChange={e => setTraiTitle(e.target.value)} />
                                    </Card.Title>
                                    <Card.Text>
                                        <p>iframe</p>
                                        <Form.Control as="textarea" rows={10}  onChange={e => setTrailIframe(e.target.value)} />
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
}