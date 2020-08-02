import withRoot from './components/landingPage/withRoot';
import firebase from "firebase";
import { Button } from "@material-ui/core";
import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import { Icon,locate,polyline } from "leaflet";
import './App.css';
import useSwr from "swr";

import DrawableMap from './components/mainPage/components/DrawableMap';
import MainPage from './components/mainPage/components/MainPage';
import AppAppBar from './components/landingPage/views/AppAppBar';
import { Redirect } from 'react-router-dom';
import Landing from './Landing';


// class DrawableMap extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             lat: 30.621830,
//             lng: -96.341600,
//             zoom: 20,
//             currentDrawing: [[30.6217,-96.3416],[30.6219,-96.3416],[30.6219,-96.3413]],
//             lastPoint: [30.6219,-96.3413]
//         }
//         console.log(this);
//     }

//     addPoint (scope,event) {
//         console.log(scope);
//         const {currentDrawing} = scope.state;
//         const newPoint = [event.latlng.lat,event.latlng.lng];
//         console.log(newPoint)
//         scope.setState({
//             currentDrawing: [
//               ...scope.state.currentDrawing,
//               newPoint
//             ],
//             lastPoint: newPoint
//           });    
//         console.log("Adding to drawing");
//         console.log(currentDrawing);
//     }

//     undoPoint (scope,event) {
//         const {currentDrawing} = scope.state;
//         currentDrawing.pop();
//         console.log("Undoing");
//         console.log(currentDrawing);
//         scope.setState({
//             currentDrawing:[
//                 currentDrawing
//             ],
//             lastPoint:[
//                 currentDrawing[currentDrawing.length-1][0],
//                 currentDrawing[currentDrawing.length-1][1]
//             ]
//         });
//         console.log("Undoing");
//     }

//     render() {
//         return(
//             <Map center={[this.state.lat,this.state.lng]} zoom={this.state.zoom} onclick={(event)=>{
//                 this.addPoint(this,event);
//             }}>
//                 <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <Marker position={this.state.lastPoint} onclick={(event)=>{
//                         this.undoPoint(this,event);
//                     }} >
//                 </Marker>
//                 <Polyline positions={this.state.currentDrawing}/>
//             </Map>
//         )
//     }

// }

function App(props) {
    // [30.621830, -96.341600] Texas A&M
    return (
        <div>
        {firebase.auth().currentUser === null ? 
                <Redirect to="/signin" />
            :
            <div>
                {/* <AppAppBar currentUser={firebase.auth().currentUser}/> <!-- THIS IS A DUPLICATE WHEN RENDERING FROM LOGIN -->*/}
                <MainPage currentUser={props.currentUser}/>
                {/* <div className="menu" id="menu">
                    {/* <h1>Welcome to Pen-Runners, {firebase.auth().currentUser.displayName}</h1>
                    <img alt="profileImage" src={firebase.auth().currentUser.photoURL} width="250px"/>
                    <button onClick={console.log(drawing)}>Click me!</button> *}
                    <MainPage/>
                </div>
                <DrawableMap startingLoc={[30.6217,-96.3416]} drawing={drawing}/> */}
            </div>
        }
        </div>
        
    );
}

export default withRoot(App);
