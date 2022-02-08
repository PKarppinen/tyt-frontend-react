import { Modal, Button } from 'react-bootstrap';

import removeTrail from '../functions/removeTrail';

export default function RemoveModal({props}) {
    const handleClose = () => props.setShowModal(false);
    
    const handleRemove = async e => {
        console.log("Removing the trail with id " + props.removeId);
        e.preventDefault();

        // Remove the trail
        await removeTrail(props.removeId, props.getToken);

        // Wait 2s before updating trails
        await new Promise(r => setTimeout(r, props.delay)); 

        // Fetch and set new trails
        props.setTrails();
        props.setShowModal(false);
    }

    return (             
        <Modal show={props.showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remove the trail</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove this trail?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Undo</Button>
                <Button variant="primary" onClick={handleRemove}>Remove trail</Button>
            </Modal.Footer>
        </Modal>
    );
  }
  