import React from 'react';
import Keyboard from './Keyboard';
import Container from "react-bootstrap/Container";
import Address from './Address'
import Gate from "./Gate";
import GCS from "./GCS"
// import AddressList from './AddressList';
import { Row, Col, Alert } from 'react-bootstrap';

import UIFx from "uifx";
import iris from '../comps/sounds/open.mp3'
import kawoosh from '../comps/sounds/kawoosh.wav'
import shutGate from '../comps/sounds/close.mp3'

const irisOpening = new UIFx({
    asset: iris,
    volume: 0.1    
})

const wormhole = new UIFx({
  asset: kawoosh,
  volume: 0.1    
})

const shutdown = new UIFx({
  asset: shutGate,
  volume: 0.1    
})



const INITIAL_STATE = {
  dialMode: "DHD",
  c: 0,
  address: [0,0,0,0,0,0,1],
  gatePos: 0,
  irisOpen: true,
  gateIsActive: false
};


export class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.addressUpdateHandler = this.addressUpdateHandler.bind(this)
    this.addressResetHandler = this.addressResetHandler.bind(this)
    this.gateActivationHandler = this.gateActivationHandler.bind(this)
    this.gateReset = this.gateReset.bind(this);
    this.gateSpin = this.gateSpin.bind(this);
    this.irisToggle = this.irisToggle.bind(this)
    this.dialModeChange = this.dialModeChange.bind(this)
  }

  state = {}

  componentWillMount(){
    this.setState({...INITIAL_STATE})
  }

  irisToggle(){
    this.setState({irisOpen: !this.state.irisOpen})
    irisOpening.play();
  }

  gateActivationHandler(){
    this.setState({gateIsActive: !this.state.gateIsActive});
    (!this.state.gateIsActive)? wormhole.play() : shutdown.play()
  }

  gateReset(){
    this.setState({gatePos: 0})
  }

  dialModeChange(e){
    this.setState({dialMode: e})
  }

  gateSpin(e){
    let direction = e.target.getAttribute("direction")
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

  addressUpdateHandler(newAddress, newCounter){
    this.setState({address: newAddress, c : newCounter})    
  }

  addressResetHandler(){
    this.setState({address: [0,0,0,0,0,0,1], c:0})
  }

  render(){
    return(
      <Container>
        <Alert variant="dark">
          <Alert.Heading>
            <span style={{fontVariant: "small-caps"}}>SG-React:</span> A React-Based Stargate simulator.
          </Alert.Heading>
          {this.state.gateIsActive.toString()}
        </Alert>
        <Row>
          <Col md={8}>
            <Gate gatePos={this.state.gatePos}
                  iris={this.state.irisOpen}
                  gateIsActive={this.state.gateIsActive}
            />
          </Col>
          <Col md={4}>
            <GCS gatePos={this.state.gatePos}
                 gateReset = {this.gateReset}
                 spin={this.gateSpin}
                 irisToggle={this.irisToggle}
                 irisState = {this.state.irisOpen}
                 dialModeChange = {this.dialModeChange}/></Col>
          
        </Row>
        <Address
        setAddress={this.state.address}
        />
        <Row>
          <Keyboard
            setAddress = {this.state.address}
            addressUpdateHandler = {this.addressUpdateHandler}
            counter = {this.state.c}
            dialMode = {this.state.dialMode}
            reset = {this.addressResetHandler}
            gateIsActive={this.state.gateIsActive}
            gateActivationHandler={this.gateActivationHandler}
            />
        </Row>
      </Container>
    )
  }
}

export default MainContainer;

