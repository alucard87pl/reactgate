import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";
import glyphs from "./glyphs";
import blank from "./blank.png";
import knownAddresses from "./addressBook";

let scrollbox = {
  overflowY: "scroll",
  height: "500px"
};

const headerCaps = {
  fontVariant: "small-caps"
};

export class AddressList extends Component {
  glyphLookup(v) {
    if (v === 0) {
      return blank;
    } else {
      return glyphs()[v].src;
    }
  }

  glyphNameLookup(v) {
    return glyphs()[v].description;
  }

  render() {
    return (
      <Alert variant='dark'>
        <Alert.Heading>
          <div style={headerCaps}>Address List</div>
          <hr />
        </Alert.Heading>
        <div style={scrollbox}>
          {knownAddresses.map(({ value, label }) => {
            return (
              <Button variant='light' key={label} block>
                <div className='d-flex justify-content-between'>
                  <div>
                    <b>{label}</b>
                  </div>
                  <div>
                    {value.map(e => {
                      return (
                        <img
                          src={this.glyphLookup(e)}
                          alt={e}
                          width={20}
                          height={20}
                        />
                      );
                    })}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </Alert>
    );
  }
}

export default AddressList;

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
