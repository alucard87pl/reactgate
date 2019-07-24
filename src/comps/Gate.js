import React, { Component } from 'react'
import { Alert, Container, Row, Col} from "react-bootstrap";
import gate from "./gate.png";
import iris from "./iris.png"
import eventHorizon from "./horizon.png"
import glyphs from './glyphs';


export class Gate extends Component {
    
    glyphLookup(v){
        return glyphs[v].src
}

    glyphNameLookup(v){
        return glyphs[v].description
}

    componentWillReceiveProps(newProps){
        this.setState({gatePos: newProps.gatePos,
            iris: newProps.iris,
            gateIsActive: newProps.gateIsActive
            })
    }

    render() {

        let angle = -((this.props.gatePos / 39) * 360).toFixed(2)
        let gateRotation = 'rotateZ('+angle+'deg)'
        let gateCSS = {
            transform: gateRotation,
            zIndex:'0',
            position: 'absolute',
        }

        let horizonCSS = {
            position: 'sticky', 
            zIndex: '2',
            visibility: (this.props.gateIsActive) ? "initial" : "hidden"
        }
        
        let irisCSS = {
            position: 'absolute', 
            zIndex: '3',
            visibility: (this.props.iris) ? "hidden" : "initial"
        }
        return (
                <Alert variant="dark">
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Alert variant="danger">
                                    <img alt='' src={this.glyphLookup(this.props.gatePos)} />
                                </Alert>
                                </Col>
                                </Row>
                        <Row className="justify-content-md-center">
                        <Col md="auto">
                            <img
                        style={gateCSS}
                        src={gate}
                        alt="Gate"
                        height={500}
                        width={500} />
                        <div>
                        <img
                        style={irisCSS}
                        src={iris}
                        alt="Iris"
                        height={500}
                        width={500} />
                        <img
                        style={horizonCSS}
                        src={eventHorizon}
                        alt="Event Horizon"
                        height={500}
                        width={500} />
                        </div>
                        </Col>
                        </Row>
                    </Container>
                </Alert>
        )
    }
}

export default Gate
