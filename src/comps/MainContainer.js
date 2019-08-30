import React from "react";
import Keyboard from "./Keyboard";
import Container from "react-bootstrap/Container";
import Address from "./Address";
import Gate from "./Gate";
import GCS from "./GCS";
import Credits from "./Credits";
import AddressList from "./AddressList";
import { Row, Col, Navbar } from "react-bootstrap";

import UIFx from "uifx";
import iris from "../comps/sounds/open.mp3";
import kawoosh from "../comps/sounds/kawoosh.wav";
import shutGate from "../comps/sounds/close.mp3";

const irisOpening = new UIFx({
  asset: iris,
  volume: 0.1
});

const wormhole = new UIFx({
  asset: kawoosh,
  volume: 0.1
});

const shutdown = new UIFx({
  asset: shutGate,
  volume: 0.1
});

var timing = 100;

const INITIAL_STATE = {
  dialMode: "DHD",
  c: 0,
  address: [0, 0, 0, 0, 0, 0, 1],
  gatePos: 0,
  irisOpen: true,
  gateIsActive: false,
  gatetimer: 0,
  credits: false
};

export class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.addressUpdateHandler = this.addressUpdateHandler.bind(this);
    this.addressResetHandler = this.addressResetHandler.bind(this);
    this.gateActivationHandler = this.gateActivationHandler.bind(this);
    this.countDown = this.countDown.bind(this);
    this.gateReset = this.gateReset.bind(this);
    this.gateSpin = this.gateSpin.bind(this);
    this.irisToggle = this.irisToggle.bind(this);
    this.dialModeChange = this.dialModeChange.bind(this);
    this.setModalShow = this.setModalShow.bind(this);
    this.timer = 0;
  }

  state = {};

  setModalShow(sms) {
    this.setState({ credits: sms });
  }

  componentWillMount() {
    this.setState({ ...INITIAL_STATE });
  }

  irisToggle() {
    this.setState({ irisOpen: !this.state.irisOpen });
    irisOpening.play();
  }

  activateTimer() {
    this.setState({ gatetimer: 2280000 });
    this.timer = setInterval(this.countDown, timing);
  }

  gateActivationHandler() {
    if (!this.state.gateIsActive) {
      this.setState(
        { gateIsActive: !this.state.gateIsActive },
        this.activateTimer()
      );
      wormhole.play();
    } else {
      this.setState({ gateIsActive: !this.state.gateIsActive });
      clearInterval(this.timer);
      shutdown.play();
    }
  }

  countDown() {
    if (this.state.gatetimer === 0) {
      clearInterval(this.timer);
      this.setState({ gateIsActive: !this.state.gateIsActive });
      shutdown.play();
    } else {
      this.setState({ gatetimer: this.state.gatetimer - timing });
    }
  }

  gateReset() {
    this.setState({ gatePos: 0, gatetimer: 0 }, console.log("boo"));
  }

  dialModeChange(e) {
    this.setState({ dialMode: e });
  }

  gateSpin(e) {
    let direction = e.target.getAttribute("direction");
    switch (direction) {
      case "cw":
        if (this.state.gatePos === 0) {
          this.setState({
            gatePos: 38
          });
        } else {
          this.setState({
            gatePos: this.state.gatePos - 1
          });
        }
        break;
      default:
        if (this.state.gatePos === 38) {
          this.setState({
            gatePos: 0
          });
        } else {
          this.setState({
            gatePos: this.state.gatePos + 1
          });
        }
        break;
    }
  }

  addressUpdateHandler(newAddress, newCounter) {
    this.setState({ address: newAddress, c: newCounter });
  }

  addressResetHandler() {
    this.setState({ address: [0, 0, 0, 0, 0, 0, 1], c: 0 });
  }

  render() {
    return (
      <Container fluid>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand href='#home'>ReactGate</Navbar.Brand>
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              Made by{" "}
              <a href='#i' onClick={() => this.setModalShow(true)}>
                alucard87pl & contributors
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <br />
        <Row className='justify-content-md-center'>
          <Col>{/* <AddressList /> */}</Col>
          <Col md={6}>
            <Gate
              gatePos={this.state.gatePos}
              iris={this.state.irisOpen}
              gateIsActive={this.state.gateIsActive}
            />
          </Col>
          <Col>
            <GCS
              gatePos={this.state.gatePos}
              gateReset={this.gateReset}
              spin={this.gateSpin}
              irisToggle={this.irisToggle}
              irisState={this.state.irisOpen}
              dialModeChange={this.dialModeChange}
              dialMode={this.state.dialMode}
              gatetimer={this.state.gatetimer}
              address={this.state.address}
              counter={this.state.c}
              addressUpdateHandler={this.addressUpdateHandler}
            />
          </Col>
        </Row>
        <Address setAddress={this.state.address} />
        <Row className='justify-content-md-center'>
          <Keyboard
            setAddress={this.state.address}
            addressUpdateHandler={this.addressUpdateHandler}
            counter={this.state.c}
            dialMode={this.state.dialMode}
            reset={this.addressResetHandler}
            gateIsActive={this.state.gateIsActive}
            gateActivationHandler={this.gateActivationHandler}
          />
        </Row>
        <Credits
          show={this.state.credits}
          onHide={() => this.setModalShow(false)}
        />
      </Container>
    );
  }
}

export default MainContainer;
