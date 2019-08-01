import React, { Component } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";
import Ring from "./Ring";
import glyphs from "./glyphs";

import UIFx from "uifx";
import chevronLock from "../comps/sounds/chev.wav";

const lock = new UIFx({
  asset: chevronLock,
  volume: 0.1
});

export class GCS extends Component {
  constructor(props) {
    super(props);
    this.manualGlyphLock = this.manualGlyphLock.bind(this);
    this.glyphLookup = this.glyphLookup.bind(this);
    this.state = {
      counter: this.props.counter,
      gatePos: this.props.gatePos,
      irisState: true,
      dialMode: "DHD",
      gatetimer: 0,
      address: this.props.address
    };
  }

  msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      //below line is needed as a reassignment, but eslint doesn't like that
      // eslint-disable-next-line
      minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds + "." + milliseconds;
  }

  componentWillMount() {
    this.setState({
      counter: this.props.counter,
      gatePos: this.props.gatePos,
      irisState: true,
      dialMode: "DHD",
      gatetimer: 0,
      address: this.props.address
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      address: newProps.address,
      counter: newProps.counter,
      gatePos: newProps.gatePos,
      irisState: newProps.irisState,
      dialModeChange: newProps.dialModeChange,
      gatetimer: newProps.gatetimer
    });
  }

  manualGlyphLock() {
    let gVal = this.state.gatePos;
    if (this.state.counter < 6) {
      let updArray = [...this.state.address];
      updArray[this.state.counter] = gVal;
      this.setState({ address: updArray, counter: this.state.counter + 1 });
      this.props.addressUpdateHandler(updArray, this.state.counter + 1);
      lock.play();
    }
  }

  glyphLookup(v) {
    return glyphs()[v].src;
  }

  glyphNameLookup(v) {
    return glyphs()[v].description;
  }

  render() {
    return (
      <Alert variant='dark'>
        <Alert.Heading>
          GATE CONTROL SYSTEMS <hr />
        </Alert.Heading>
        <div className='d-flex flex-column'>
          Dialing Mode
          <br />
          <ToggleButtonGroup
            type='radio'
            name='dialMode'
            defaultValue={this.state.dialMode}
            onChange={this.props.dialModeChange}
          >
            <ToggleButton variant='outline-success' value={"DHD"}>
              DHD
            </ToggleButton>
            <ToggleButton variant='outline-dark' value={"SGC"} disabled>
              SGC
            </ToggleButton>
            <ToggleButton variant='outline-dark' value={"MNL"} disabled>
              MANUAL
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className='d-flex justify-content-between'>
          <div>Remaining Gate Time: </div>
          <div>
            <Button variant='outline-danger' size='sm'>
              <b>{this.msToTime(this.state.gatetimer)}</b>
            </Button>
          </div>
        </div>
        <hr />
        Gate Glyph Position: {this.state.gatePos}
        <Ring gatePos={this.state.gatePos} />
        <hr />
        Gate Ring Actuation Servo System (GRASS):
        <div className='d-flex flex-column'>
          <ButtonGroup block='true'>
            <Button variant='outline-warning'>⟲A</Button>
            <Button onClick={this.props.spin} direction='ccw'>
              ⟲
            </Button>
            <Button variant='danger'>HALT</Button>
            <Button onClick={this.props.spin} direction='cw'>
              ⟳
            </Button>
            <Button variant='outline-warning'>⟳A</Button>
          </ButtonGroup>
          <Button
            variant='danger'
            block
            disabled={
              this.state.address.includes(this.state.gatePos) ||
              this.state.counter === 6
            }
            onClick={this.manualGlyphLock}
          >
            <div className='d-flex justify-content-between'>
              <div>
                MANUAL GLYPH LOCK
                <br />
                {this.glyphNameLookup(this.state.gatePos)}
              </div>
              <div>
                <img src={this.glyphLookup(this.state.gatePos)} alt='' />
              </div>
            </div>
          </Button>
          <br />
          <Button variant='danger' block onClick={this.props.gateReset}>
            RESET GATE POSITION
          </Button>
          <Button variant='danger' block onClick={this.props.irisToggle}>
            {this.state.irisState === true ? "IRIS OPEN" : "IRIS CLOSED"}
          </Button>
          <br />
        </div>
      </Alert>
    );
  }
}

export default GCS;
