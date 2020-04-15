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
        this.state = {
            lat: 30.621830,
            lng: -96.341600,
            zoom: 20,
            currentDrawing: [[30.6217,-96.3416],[30.6219,-96.3416],[30.6219,-96.3413]],
            lastPoint: [30.6219,-96.3413]
        };
        console.log(this);
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
            <Map center={[this.state.lat,this.state.lng]} zoom={this.state.zoom} onclick={(event)=>{
                this.addPoint(event);
            }}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {this.state.lastPoint &&
                <Marker position={this.state.lastPoint} onclick={(event)=>{
                    this.undoPoint(event)
                }} icon={undoIcon}>
                </Marker>
                }
                {this.state.currentDrawing.length > 0 &&
                <Polyline positions={this.state.currentDrawing} color="maroon" />
                }
            </Map>
        )
    }

}

export default DrawableMap;