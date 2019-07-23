import React, { Component } from 'react'
import { Alert, Button } from "react-bootstrap";
import glyphs from './glyphs';
import blank from './blank.png'
import knownAddresses from './addressBook'

export class AddressList extends Component {

    glyphLookup(v){
        if (v === 0) {
            return blank
        } else { 
            return glyphs[v].src
        }
    }

    render() {
        return (
            <Alert variant="dark">
                <Alert.Heading>ADDRESS LIST<hr/></Alert.Heading>
                {knownAddresses.map(({value, label}) => {
                    return <Alert variant="light" key={label}>
                            <Alert.Heading>
                                {label}
                            </Alert.Heading>
                                <Button variant = 'outline-dark'>
                                    {value.map((e) => 
                                        <img key = {'addr' + e} alt='' src = {this.glyphLookup(value[e-1])} width={25} height={25}/>
                                        )}
                                </Button>                              
                            </Alert>
                })}
            </Alert>)
    }

}

export default AddressList



// { glyphs.map(({id, src, description}) => {
//     return <GlyphButton
//     click={this.handleClick}
//     gVal={id}
//     key={id}
//     imgSrc={src}
//     glyphName={description}
//     disabled={this.state.address.includes(id)}
//     />
// })}