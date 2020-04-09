import withRoot from './components/landingPage/withRoot';

import React from 'react';
import logo from './logo.svg';
import { Map, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import { Icon,locate,polyline } from "leaflet";
import './App.css';
import useSwr from "swr";

import AppAppBar from './components/landingPage/views/AppAppBar';

const fetcher = (...args) => fetch(...args).then(response => response.json());

class DrawableMap extends React.Component {
    constructor() {
        super()
        this.state = {
            lat: 30.621830,
            lng: -96.341600,
            zoom: 20,
            currentDrawing: [[30.6217,-96.3416],[30.6219,-96.3416],[30.6219,-96.3413]],
            lastPoint: [30.6219,-96.3413]
        }
        console.log(this);
    }

    addPoint (scope,event) {
        console.log(scope);
        const {currentDrawing} = scope.state;
        const newPoint = [event.latlng.lat,event.latlng.lng];
        console.log(newPoint)
        scope.setState({
            currentDrawing: [
              ...scope.state.currentDrawing,
              newPoint
            ],
            lastPoint: newPoint
          });    
        console.log("Adding to drawing");
        console.log(currentDrawing);
    }

    undoPoint (scope,event) {
        const {currentDrawing} = scope.state;
        currentDrawing.pop();
        console.log("Undoing");
        console.log(currentDrawing);
        scope.setState({
            currentDrawing:[
                currentDrawing
            ],
            lastPoint:[
                currentDrawing[currentDrawing.length-1][0],
                currentDrawing[currentDrawing.length-1][1]
            ]
        });
        console.log("Undoing");
    }

    render() {
        return(
            <Map center={[this.state.lat,this.state.lng]} zoom={this.state.zoom} onclick={(event)=>{
                this.addPoint(this,event);
            }}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={this.state.lastPoint} onclick={(event)=>{
                        this.undoPoint(this,event);
                    }} >
                </Marker>
                <Polyline positions={this.state.currentDrawing}/>
            </Map>
        )
    }

}

function App() {
    // const url ="";
    // const { data, error } = useSwr(url, { fetcher });
    // console.log(data);
    var tamu_crd = {
        lat: 30.621830,
        lng: -96.341600
    }
    const [currentLocation, setCurrentLocation] = React.useState(tamu_crd);
    const [currentDrawing, setCurrentDrawing] = React.useState([]);
    navigator.geolocation.getCurrentPosition((pos)=>{
        setCurrentLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
        });
    });

    

    // [30.621830, -96.341600] Texas A&M
    return (
        
        <div className="side-by-side">
            <AppAppBar />
            <div className="menu" id="menu">
                <p>
                    Add Control Menu Here, you can also use this div as a testing area for other HTML elements that you want to test
                </p>
            </div>
            <DrawableMap startingLoc={currentLocation}/>
        </div>
    );
}

export default withRoot(App);
