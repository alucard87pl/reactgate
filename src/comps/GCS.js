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

export class GCS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gatePos: this.props.gatePos,
      irisState: true,
      dialMode: "DHD",
      gatetimer: 0
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

  componentWillReceiveProps(newProps) {
    this.setState({
      gatePos: newProps.gatePos,
      irisState: newProps.irisState,
      dialModeChange: newProps.dialModeChange,
      gatetimer: newProps.gatetimer
    });
  }

  glyphLookup(v) {
    return glyphs[v].src;
  }

  glyphNameLookup(v) {
    return glyphs[v].description;
  }

  render() {
    return (
      <Alert variant='dark'>
        <Alert.Heading>
          GATE CONTROL SYSTEMS <hr />
        </Alert.Heading>
        Gate Glyph position: {this.state.gatePos}
        <Ring gatePos={this.state.gatePos} />
        <br />
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
          <br />
          <Button variant='danger' block onClick={this.props.gateReset}>
            RESET GATE POSITION
          </Button>
          <Button variant='outline-danger' block>
            MANUAL GLYPH LOCK (NYI)
          </Button>
          <br />
          <Button variant='danger' block onClick={this.props.irisToggle}>
            {this.state.irisState === true ? "IRIS OPEN" : "IRIS CLOSED"}
          </Button>
          <br />
          Dialing Mode
          <ToggleButtonGroup
            type='radio'
            name='dialMode'
            defaultValue={this.state.dialMode}
            onChange={this.props.dialModeChange}
          >
            <ToggleButton variant='outline-success' value={"DHD"}>
              DHD
            </ToggleButton>
            <ToggleButton variant='outline-dark' value={"SGC1"} disabled>
              SGC v1
            </ToggleButton>
            <ToggleButton variant='outline-dark' value={"SGC2"} disabled>
              SGC v2
            </ToggleButton>
          </ToggleButtonGroup>
          <div className='d-flex justify-content-between'>
            <div>Remaining Gate Time: </div>
            <div>
              <b>{this.msToTime(this.state.gatetimer)}</b>
            </div>
          </div>
        </div>
      </Alert>
    );
  }
}

export default GCS;
