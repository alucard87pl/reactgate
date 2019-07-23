import React, { Component } from 'react'
import { Container, Row, Col, Alert, Button} from "react-bootstrap";
import glyphs from './glyphs';
import GlyphButton from "./GlyphButton";

import UIFx from "uifx";
import dhdkey from '../comps/sounds/dhdkey.mp3'
import sgckey from '../comps/sounds/sgckey.wav'
import wrong from '../comps/sounds/wrong.wav'
import kawoosh from '../comps/sounds/kawoosh.wav'


const wormhole = new UIFx({
    asset: kawoosh,
    volume: 0.1    
})

const dhdKey = new UIFx({
    asset: dhdkey,
    volume: 0.1    
})

const sgcKey = new UIFx({
    asset: sgckey,
    volume: 0.1    
})

const error = new UIFx({
    asset: wrong,
    volume: 0.1    
})



export class Keyboard extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    componentWillMount(){
        this.setState({
            address: this.props.setAddress,
            c: this.props.counter,
            dialMode: this.props.dialMode,
            reset: this.props.reset})
    }

    componentWillReceiveProps(newProps){
        this.setState({address: newProps.setAddress,
            c: newProps.counter,
            dialMode: newProps.dialMode,
            reset: this.props.reset})
    }

    dialingHandler(){
        wormhole.play()
    }

    handleClick(gVal){
        if (this.state.c<6) {
            let updArray = [...this.state.address];
            updArray[this.state.c] = gVal;
            this.setState({address: updArray, c: this.state.c+1}, );
            this.props.addressUpdateHandler(updArray, this.state.c+1);
            (this.props.dialMode === "DHD")? dhdKey.play() : sgcKey.play();
        } else {
            error.play()
        }
    }


    render() {
        return (
                <Alert variant="dark">
                <Container>
                    <Row>
                    <Col md={10}>
                { glyphs.map(({id, src, description}) => {
                    return <GlyphButton
                    click={this.handleClick}
                    gVal={id}
                    key={id}
                    imgSrc={src}
                    glyphName={description}
                    disabled={this.state.address.includes(id)}
                    />
                })}
                </Col>
                <Col>
                <Alert variant="info">
                <Button block
                    variant={(this.state.address[5]===0)? "outline-success":"success"}
                    disabled = {this.state.address[5]===0}
                    onClick={this.dialingHandler}
                    >{(this.state.dialMode === "DHD")? "DIAL" : "ENCODE"}</Button>
                <Button block
                        variant={(this.state.address[0]===0)? "outline-danger":"danger"}
                        onClick={this.props.reset}
                        disabled = {this.state.address[0]===0}
                        >RESET</Button>
                </Alert>
                </Col>
                </Row>
                </Container>
                </Alert>
        )
    }

}

export default Keyboard
