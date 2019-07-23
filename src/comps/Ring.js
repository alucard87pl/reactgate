import React, { Component } from 'react'
import { ProgressBar } from "react-bootstrap";


export class Ring extends Component {
    

    componentWillMount(){
        this.setState({gatePos: this.props.gatePos})
    }

    componentWillReceiveProps(newProps){
        this.setState({gatePos: newProps.gatePos})
    }

    render() {
       return(
           <ProgressBar
           min={-19}
           max={19}
           now = {19}
           />
       ) 
    }
}

export default Ring
