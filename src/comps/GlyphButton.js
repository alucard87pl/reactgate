import React, { Component } from 'react'
import { Button } from "react-bootstrap"

export class GlyphButton extends Component {
    constructor(props) {
        super(props);
        this.glyphClicked = this.glyphClicked.bind(this);
}

    glyphClicked() {
        this.props.click(this.props.gVal)
      }


    render() {
        return (
            <Button
            onClick={this.glyphClicked}
            variant={this.props.disabled ? "dark" : "outline-dark"}
            disabled={this.props.disabled}
            >
            <img 
                 src={this.props.imgSrc}
                 alt={this.props.glyphName}
                 title={this.props.glyphName + " " + this.props.gVal}
                 width={30}
                 height={30}
                 />
            </Button>
        )
    }
}

export default GlyphButton
