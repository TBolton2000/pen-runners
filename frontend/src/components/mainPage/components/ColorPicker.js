import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class ColorPicker extends React.Component {
// PROPS NEEDED color: string, displayColorPicker: bool, handleColorClick: func, handleColorClose: func, handleColorChange
  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `${ this.props.color }`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.props.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.props.displayState ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.props.handleClose }/>
          <SketchPicker color={ this.props.color } onChange={(color)=>this.props.handleChange(color) } />
        </div> : null }

      </div>
    )
  }
}

export default ColorPicker;