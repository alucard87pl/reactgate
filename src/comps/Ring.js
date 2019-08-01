import "rc-slider/assets/index.css";

import React, { Component } from "react";
import Slider from "rc-slider";

let ts = { opacity: 0 };

let hs = {
  height: 20,
  width: 20,
  marginLeft: -14,
  marginTop: -7,
  backgroundColor: "grey"
};

export class Ring extends Component {
  componentWillMount() {
    this.setState({ gatePos: this.props.gatePos });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ gatePos: newProps.gatePos });
  }

  render() {
    return (
      <Slider
        trackStyle={ts}
        handleStyle={hs}
        min={-19}
        max={19}
        step={1}
        defaultValue={0}
        value={
          this.state.gatePos > 19 ? this.state.gatePos - 39 : this.state.gatePos
        }
        disabled
      />
    );
  }
}

export default Ring;
