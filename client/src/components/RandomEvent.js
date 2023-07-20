import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function RandomEventBtn(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} variant="warning">
        Add a custom event
      </Button>

      <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Event description</Form.Label>
              <Form.Control
                value={props.value}
                onChange={props.onChange}
                as="textarea"
                rows={3}
                placeholder="A blazing fireball hits the mountain and creates an avalanche that kills the protagonist"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save the event
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
