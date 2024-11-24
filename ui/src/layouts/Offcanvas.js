import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffCanvas({ title, onClose, children }) {
  const [show, setShow] = useState(true);

  const handleClose = () =>  {
    setShow(false);
    onClose(false)
  }

  return (
    <Offcanvas show={show} onHide={handleClose} placement='end' backdrop="static">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {children}
        </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffCanvas