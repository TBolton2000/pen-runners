import React from 'react';
import { Map, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import { Icon,locate,polyline,Point,icon } from "leaflet";

var undoIcon = icon({
    iconUrl: 'undo.svg',
    iconRetinaUrl: null,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new Point(20, 20),
    className: 'leaflet-div-icon'
})
var deleteIcon = icon({
    iconUrl: 'x_icon.png',
    iconRetinaUrl: null,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new Point(16, 16),
    className: 'leaflet-div-icon'
})


class DrawableMap extends React.Component {
    constructor(props) {
        super(props); 
        console.log(this);
        this.lines = [];
    }

    addPoint (event) {
        const {currentDrawing} = this.state;
        const newPoint = [event.latlng.lat,event.latlng.lng];
        this.setState({
            currentDrawing: [
              ...this.state.currentDrawing,
              newPoint
            ],
            lastPoint: newPoint
          });    
        console.log("Adding to drawing");
        console.log(currentDrawing);
    }

    undoPoint (event) {
        this.setState({
            currentDrawing: this.state.currentDrawing.filter((_, i)=> i != this.state.currentDrawing.length-1),
        });
        if(this.state.currentDrawing.length > 0){
            this.setState({
                lastPoint: this.state.currentDrawing[this.state.currentDrawing.length-1]
            });
        }
        else {
            this.setState({
                lastPoint: null
            });
        }
        console.log("Undoing");
        console.log(this);
    }

    render() {
        return(
            <Map center={[30.6217,-96.3416]} zoom={20} onclick={(event)=>{
                this.props.drawing.addToSegment(this.props.drawing.selectedSegementIndex,[event.latlng.lat,event.latlng.lng]);
                this.lines.forEach(element => {
                    element && console.log(element.props.leaflet);
                });
                console.log(this);
            }}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {
                <Marker position={this.props.drawing.returnLastPoint(this.props.drawing.selectedSegementIndex)} 
                    onclick={(event)=>{this.props.drawing.undoFromSegment(this.props.drawing.selectedSegmentIndex)}} icon={undoIcon}>
                </Marker>
                }
                { this.props.drawing.segments.map( (value, index) => {
                    console.log(index);
                    return <Polyline positions={value.points} color={value.color} />
                })
                }
            </Map>
        )
    }

}

export default DrawableMap;