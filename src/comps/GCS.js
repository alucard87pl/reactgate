import React, { Component } from 'react'
import { Alert, Button, ButtonGroup, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import Ring from './Ring'
import glyphs from './glyphs';



export class GCS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gatePos: this.props.gatePos,
            irisState: true,
            dialMode: "DHD"
        };
        
    }
    
    componentWillReceiveProps(newProps){
        this.setState({
            gatePos: newProps.gatePos,
            irisState: newProps.irisState,
            dialModeChange: newProps.dialModeChange
        })
    }

    glyphLookup(v){
            return glyphs[v].src
    }

    glyphNameLookup(v){
        return glyphs[v].description
    }

    render() {
        return (
                <Alert variant="dark">
                    <Alert.Heading>
                        GATE CONTROL SYSTEMS <hr/>
                    </Alert.Heading>
                    Gate Glyph position: {this.state.gatePos}
                    <Ring gatePos = {this.state.gatePos}/>
                    <br/>
                    <div className="d-flex flex-column">
                    <ButtonGroup block="true">
                    <Button variant="warning">⟲A</Button>
                    <Button onClick={this.props.spin} direction="ccw">⟲</Button>
                    <Button variant="danger">HALT</Button>
                    <Button onClick={this.props.spin} direction="cw">⟳</Button>
                    <Button variant="warning">⟳A</Button>
                    </ButtonGroup>
                    <br/>
                    <Button variant="danger" block onClick={this.props.gateReset}>RESET GATE POSITION</Button>
                    <br/>
                    <Button variant="danger" block onClick={this.props.irisToggle}>{(this.state.irisState===true) ? "IRIS OPEN" : "IRIS CLOSED"}</Button>
                    <br/>
                            Dialing Mode
                            <ToggleButtonGroup type="radio" name="dialMode" defaultValue={this.state.dialMode} onChange={this.props.dialModeChange}>
                                <ToggleButton variant="outline-dark" value={"DHD"}>
                                  DHD
                                </ToggleButton>
                                <ToggleButton variant="outline-dark" value={"SGC1"}>
                                  SGC v1
                                </ToggleButton>
                                <ToggleButton variant="outline-dark" value={"SGC2"}>
                                  SGC v2
                                </ToggleButton>
                                </ToggleButtonGroup>
                    </div>
                </Alert>
        )
    }
}

export default GCS
