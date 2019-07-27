import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class Credits extends Component {
    render() {
        return (
            <Modal
            {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ReactGate Credits
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Code Contributors:</h4>
        <ul>
            <li><a href='https://github.com/Kuboczoch'  target='#blank'>Kuboczoch</a></li>
        </ul>
        <h4>Acknowledgements</h4>
        <p>Stargate, SG-1 and all affiliated imagery and terminology are property of MGM</p>
        <p>The stargate image and glyphs taken from <a href='http://www.rdanderson.com/stargate/glyphs/index.htm' target='#blank'>rdanderson.com</a></p>
      </Modal.Body>
      <Modal.Footer>
          View source on&nbsp;<a href='https://github.com/alucard87pl/reactgate' target='#blank'>GitHub</a>
      </Modal.Footer>
    </Modal>
        );
    }
}

export default Credits;