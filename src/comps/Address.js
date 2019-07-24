import React, { Component } from 'react'
import { Alert } from "react-bootstrap";
import glyphs from './glyphs';
import blank from './blank.png'

export class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
          address  : this.props.setAddress,
          c: 0,
          chevrons : [0,1,2,3,4,5,6],
          dialMode : this.props.dialMode
        };
      }

    componentWillMount(){
      this.setState({
          address: this.props.setAddress,
          c: this.props.counter,
          dialMode: this.props.dialMode})
    }

    componentWillReceiveProps(newProps){
        this.setState({
            address: newProps.setAddress,
            dialMode: newProps.dialMode,
            c: newProps.c,
        })
    }



    glyphLookup(g){
        if (this.state.address[g] === 0) {
            return blank
        } else {
            return glyphs()[this.state.address[g]-1].src
        }
    }
    
    render() {
        return (
            <div className="d-flex justify-content-center">
                {this.state.chevrons.map((e) => (
                <Alert variant="dark" key={e}>
                    <img alt='' src  = {this.glyphLookup(e)} width={25} height={25}/>
                </Alert>))}
            </div>
            )
        }

}

export default Address