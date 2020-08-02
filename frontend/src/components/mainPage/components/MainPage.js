import React, {Component,useState} from 'react';
import { Map, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import '../../../App.css';
import ToolBar from './ToolBar';
import firebase from "../../../firebase";
import KeyboardEventHandler from "react-keyboard-event-handler";
import EditorDialogKeyBoard from "./EditorDialogKeyBoard";

class MainPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            drawings:[
                {
                    name: "My First Drawing",
                    description: "My real First Drawing",
                    segments: [
                        // {
                        //     name: "My first Line",
                        //     color: "purple",
                        //     points: [[30.6217,-96.3416],[30.6219,-96.3416],[30.6219,-96.3413]],
                        //     displayColorPicker: false,
                        // },
                        // {
                        //     name: "My second Line",
                        //     color: "blue",
                        //     points: [[30.6218,-96.3417],[30.6218,-96.3415],[30.6218,-96.3412]],
                        //     displayColorPicker: false,
                        // }
                    ]
                },
                // {
                //     name: "My Second Drawing",
                //     description: "My fake First Drawing",
                //     segments: [
                //         {
                //             name: "My first line on draw 2",
                //             color: "red",
                //             points:[[30.6219,-96.3414],[30.6213,-96.3418],[30.6217,-96.3416]],
                //             displayColorPicker: false,
                //         }
                //     ]
                // }
            ],
            drawIndex: null,
            segmentIndex: null,
            viewport: {
                center: [30.6217,-96.3416],
                zoom: 18
            },
            open: false
        };
        
    }

    componentDidMount() {
        this.map = this.mapInstance.leafletElement;
        const options = {
            enableHighAccuracy: true, 
            maximumAge: 30000, 
            timeout: 27000
          };
        navigator.geolocation.getCurrentPosition((position)=>{
            this.setState((prevState)=>{
                const newState = Object.assign({},prevState);
                newState.viewport.center[0] = position.coords.latitude;
                newState.viewport.center[1] = position.coords.longitude;
                this.map.flyTo(newState.viewport.center,newState.viewport.zoom);
                return newState;
            })
        },(err)=>console.log("Position not found."), options);
    }

    mapClickHandler(event,obj) {
        if(this.state.drawIndex !== null && this.state.segmentIndex !== null && this.state.drawings.length > 0 && this.state.drawings[this.state.drawIndex].segments.length > 0){
            obj.setState((prevState)=>{
                const newState = Object.assign({},prevState);
                newState.drawings[newState.drawIndex].segments[newState.segmentIndex].points = [...newState.drawings[newState.drawIndex].segments[newState.segmentIndex].points, [event.latlng.lat,event.latlng.lng]];
                return newState;
                // const {segments} = prevState.drawings[prevState.drawIndex]
                // segments[segmentIndex]
                // prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points = [...prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points, [event.latlng.lat,event.latlng.lng]];
            },function(){
                console.log("Callback Function");
                console.log(this.state);
            });
        }
    }

    segmentUndoHandler(obj,idx1,idx2) {
        obj.setState((prevState)=>{
            const newState = Object.assign({},prevState);
            const newSegment = [...newState.drawings[idx1].segments[idx2].points];
            newSegment.pop();
            newState.drawings[idx1].segments[idx2].points = newSegment;
            // if(newState.drawIndex > 0) {
            //     newState.drawIndex -= 1;
            // }
            // else {
            //     newState.drawIndex = null;
            // }
            // newState.segmentIndex = null;
            return newState;
        },function(){
            console.log("Callback Function");
            console.log(this.state);
        });
    }
    segmentDeleteHandler(obj,idx1,idx2) {
        obj.setState((prevState)=>{
            const newState = Object.assign({},prevState);
            const newSegments = [...newState.drawings[idx1].segments];
            newSegments.splice(idx2,1)
            newState.drawings[idx1].segments = newSegments;
            if(newState.segmentIndex > 0) {
                newState.segmentIndex -= 1;
            }
            else {
                newState.segmentIndex = null;
            }
            return newState;
        },function(){
            console.log("Callback Function");
            console.log(this.state);
        });
    }
    segmentRenameHandler(obj,idx1,idx2) {
        obj.setState((prevState)=>{
            const newState = Object.assign({},prevState);
            const newSegment = [...newState.drawings[idx1].segments[idx2].points];
            newSegment.pop();
            newState.drawings[idx1].segments[idx2].points = newSegment;
            return newState;
        },function(){
            console.log("Callback Function");
            console.log(this.state);
        });
    }

    handleDrawingSelect(obj,index) {
        obj.setState({
            drawIndex: index,
            segmentIndex: 0,
        },()=>{
            console.log("Setting drawIndex to: "+index);
        });
    }

    handleSegmentSelect(obj,index) {
        obj.setState({
            segmentIndex: index
        },()=>{
            console.log("Setting segmentIndex to: "+index);
        });
    }

    handleColorClick(obj,idx1,idx2) {
        obj.setState((prevState)=>{
            const newState = Object.assign({},prevState);
            newState.drawings[idx1].segments[idx2].displayColorPicker = !newState.drawings[idx1].segments[idx2].displayColorPicker;
            return newState;
            // const {segments} = prevState.drawings[prevState.drawIndex]
            // segments[segmentIndex]
            // prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points = [...prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points, [event.latlng.lat,event.latlng.lng]];
        },function(){
            console.log("Callback Function");
            console.log(this.state);
        });
    }
    handleColorClose(obj,idx1,idx2) {
        obj.setState((prevState)=>{
            const newState = Object.assign({},prevState);
            newState.drawings[idx1].segments[idx2].displayColorPicker = false;
            return newState;
            // const {segments} = prevState.drawings[prevState.drawIndex]
            // segments[segmentIndex]
            // prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points = [...prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points, [event.latlng.lat,event.latlng.lng]];
        },function(){
            console.log("Callback Function");
            console.log(this.state);
        });
    }
    handleColorChange(obj,idx1,idx2,color) {
        obj.setState((prevState)=>{
            const newState = Object.assign({},prevState);
            newState.drawings[idx1].segments[idx2].color = color.hex;
            return newState;
            // const {segments} = prevState.drawings[prevState.drawIndex]
            // segments[segmentIndex]
            // prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points = [...prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points, [event.latlng.lat,event.latlng.lng]];
        },function(){
            console.log("Callback Function for ColorChange");
            console.log(this.state);
        });
    }
    addNewSegment(obj,idx) {
        obj.setState((prevState)=>{
            const newState = Object.assign({},prevState);
            newState.drawings[idx].segments.push({
                name: "New segment",
                color: "red",
                points:[],
                displayColorPicker: false,
            });
            return newState;
            // const {segments} = prevState.drawings[prevState.drawIndex]
            // segments[segmentIndex]
            // prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points = [...prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points, [event.latlng.lat,event.latlng.lng]];
        },function(){
            console.log("Callback Function for ColorChange");
            console.log(this.state);
        });
    }

    addNewDrawing(obj) {
        obj.setState((prevState)=>{
            const newState = Object.assign({},prevState);
            newState.drawings.push({
                name: "New drawing",
                description: "New Drawing Description",
                segments: []
            });
            return newState;
        })
    }

    uploadDrawings(e,scope) {
        e.preventDefault();
        const db = firebase.firestore();
        let currDrawing = [...this.state.drawings];
        for(var i = 0; i < currDrawing.length; i++) {
            for(var j = 0; j < currDrawing[i].segments.length; j++) {
                for(var k = 0; k < currDrawing[i].segments[j].points.length; k++) {
                    currDrawing[i].segments[j].points[k] = new firebase.firestore.GeoPoint(currDrawing[i].segments[j].points[k][0],currDrawing[i].segments[j].points[k][1]);
                    console.log("Iterating");
                }
            }
        }
        console.log(currDrawing);
        const userDrawingRef = db.collection("users").doc(this.props.currentUser.uid).set({
            drawings: currDrawing
        })
    }

    downloadDrawings(e,obj) {
        e.preventDefault();
        const db = firebase.firestore();
        let userDrawingRef = db.collection('users').doc(this.props.currentUser.uid);
        let getDoc = userDrawingRef.get()
            .then(doc => {
                if (!doc.exists) { // Set state to empty b/c user does not exist
                    console.log('No such document!');
                } else { // Load drawings into state
                    let tempDrawings = doc.data().drawings;
                    for(var i = 0; i < tempDrawings.length; i++) {
                        for(var j = 0; j < tempDrawings[i].segments.length; j++) {
                            for(var k = 0; k < tempDrawings[i].segments[j].points.length; k++) {
                                tempDrawings[i].segments[j].points[k] = [tempDrawings[i].segments[j].points[k].latitude,tempDrawings[i].segments[j].points[k].longitude];
                                console.log("Iterating");
                            }
                        }
                    }
                    console.log(tempDrawings);
                    obj.setState({
                        drawings: tempDrawings
                    })
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    drawingDeleteHandler(obj,idx) {
        obj.setState((prevState)=>{
            const newState = Object.assign({},prevState);
            const newDrawings = [...newState.drawings];
            newDrawings.splice(idx,1);
            newState.drawings = newDrawings;
            console.log(newState);
            if(newState.drawIndex > 0) {
                newState.drawIndex -= 1;
            }
            else {
                newState.drawIndex = null;
            }
            return newState;
            // const {segments} = prevState.drawings[prevState.drawIndex]
            // segments[segmentIndex]
            // prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points = [...prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points, [event.latlng.lat,event.latlng.lng]];
        },function(){
            console.log("Callback Function");
            console.log(obj.state);
        });
    }

    editInfo(idx,idx2,name,description,obj) {
        if(idx2 === null){
            obj.setState((prevState)=>{
                const newState = Object.assign({},prevState);
                const newDrawings = [...newState.drawings];
                newDrawings[idx].name = name;
                newDrawings[idx].description = description;
                newState.drawings = newDrawings;
                return newState;
            });
        }
        else {
            obj.setState((prevState)=>{
                const newState = Object.assign({},prevState);
                const newSegments = [...newState.drawings[idx].segments];
                newSegments[idx2].name = name;
                newSegments[idx2].color = description;
                newState.drawings[idx].segments = newSegments;
                return newState;
            });
        }
    }
    handleMapMovement(direction,obj) {
        obj.setState((prevState)=>{
            const newState = Object.assign({},prevState);
            if(direction == "down"){
                newState.viewport.center[0] = newState.viewport.center[0] - 0.0003;
            }
            else if(direction == "up"){
                newState.viewport.center[0] = newState.viewport.center[0] + 0.0003;
            }
            else if(direction == "right"){
                newState.viewport.center[1] = newState.viewport.center[1] + 0.0003;
            }
            else if(direction == "left"){
                newState.viewport.center[1] = newState.viewport.center[1] - 0.0003;
            }
            console.log("Moving "+direction, newState);
            this.map.flyTo(newState.viewport.center,newState.viewport.zoom);
            return newState;
        });
    }
    handleKeyboardMisc(keypress,obj) {
        if(keypress == "a"){ // Move selection up
            obj.keyboardIndexSelection("up",obj);
        }
        else if(keypress == "z"){ // Move selection down
            obj.keyboardIndexSelection("down",obj);
        }
        else if(keypress == "e"){ // Edit selection
            obj.setState((prevState)=>{
                prevState.open = true;
                return prevState;
            })
        }
        else if(keypress == "d"){ // Delete selection
            if(obj.state.drawIndex != null && obj.state.segmentIndex != null) {
                obj.segmentDeleteHandler(obj,obj.state.drawIndex,obj.state.segmentIndex);
            }
            else if(obj.state.drawIndex != null) {
                obj.drawingDeleteHandler(obj,obj.state.drawIndex);
            }
            console.log("Pressed d")
        }
        else if (keypress == "c") { // New drawing/segment
            if(obj.state.drawIndex == null || obj.state.drawings.length == 0) {
                obj.addNewDrawing(obj);
            }
            else {
                obj.addNewSegment(obj,obj.state.drawIndex);
            }
        }
        else if (keypress == "x") {
            if(obj.state.segmentIndex != null && obj.state.drawIndex != null) {
                obj.segmentUndoHandler(obj,obj.state.drawIndex,obj.state.segmentIndex);
            }
        }
    }
    keyboardIndexSelection (direction, obj) {
        var currDrawIndex = obj.state.drawIndex;
        var currSegIndex = obj.state.segmentIndex;
        if(direction == "up") {
            if(currSegIndex > 0) {
                obj.setState((prevState)=>{
                    const newState = Object.assign({},prevState);
                    newState.segmentIndex -= 1;
                    return newState;
                })
            }
            else if(currSegIndex === 0) {
                obj.setState((prevState)=>{
                    const newState = Object.assign({},prevState);
                    newState.segmentIndex = null;
                    return newState;
                })
            }
            else if(currDrawIndex > 0) {
                obj.setState((prevState)=>{
                    const newState = Object.assign({},prevState);
                    newState.drawIndex -= 1;
                    newState.segmentIndex = newState.drawings[newState.drawIndex].segments.length - 1;
                    return newState;
                })
            }
            else {
                obj.setState((prevState)=>{
                    const newState = Object.assign({},prevState);
                    newState.drawIndex = null;
                    newState.segmentIndex = null;
                    return newState;
                })
            }
        }
        else if(direction == "down") {
            if(currDrawIndex == null && currSegIndex == null && obj.state.drawings.length > 0) {
                obj.setState((prevState)=>{
                    const newState = Object.assign({},prevState);
                    newState.drawIndex = 0;
                    return newState;
                })
            }
            else if (currSegIndex == null && currDrawIndex != null && obj.state.drawings[currDrawIndex].segments.length > 0) {
                obj.setState((prevState)=>{
                    const newState = Object.assign({},prevState);
                    newState.segmentIndex = 0;
                    return newState;
                })
            }
            else if (currDrawIndex != null && currSegIndex != null && currSegIndex < obj.state.drawings[currDrawIndex].segments.length - 1){
                obj.setState((prevState)=>{
                    const newState = Object.assign({},prevState);
                    newState.segmentIndex += 1;
                    return newState;
                })
            }
            else if (currDrawIndex != null && currDrawIndex < obj.state.drawings.length - 1) {
                obj.setState((prevState)=>{
                    const newState = Object.assign({},prevState);
                    newState.drawIndex += 1;
                    newState.segmentIndex = null;
                    return newState;
                })
            }
        }
    }

    render() {
        return (
            <div className="side-by-side">
                {/* <KeyboardEventHandler handleKeys={['up','down','left','right']} handleEventType={"keyup"} onKeyEvent={(key,e)=>console.log("Key up: ", key, "Event: ", e)} /> */}
                <KeyboardEventHandler handleKeys={['up','down','left','right']} onKeyEvent={(key,e)=>this.handleMapMovement(key,this)} ></KeyboardEventHandler>
                <KeyboardEventHandler handleKeys={['z','a','e','d','c','x']} onKeyEvent={(key,e)=>this.handleKeyboardMisc(key,this)} ></KeyboardEventHandler>
                <KeyboardEventHandler handleKeys={['space']} onKeyEvent={(key,e)=>this.mapClickHandler({latlng:{lat:this.state.viewport.center[0],lng:this.state.viewport.center[1]}},this)} ></KeyboardEventHandler>
                <EditorDialogKeyBoard state={this.state} idx={this.state.drawIndex} idx2={this.state.segmentIndex} setOpen={(_open)=>this.setState({open: _open})} 
                    updateState={(idx1,idx2,name,desc)=>this.editInfo(idx1,idx2,name,desc,this)} />
                <div className="toolbar">
                    <ToolBar state={this.state} drawHandler={(index)=>this.handleDrawingSelect(this,index)} segHandler={(index)=>this.handleSegmentSelect(this,index)}
                    handleColorClick={(idx1,idx2)=>this.handleColorClick(this,idx1,idx2)} handleColorClose={(idx1,idx2)=>this.handleColorClose(this,idx1,idx2)} 
                    handleColorChange={(idx1,idx2,color)=>this.handleColorChange(this,idx1,idx2,color)} handleUndo={(idx1,idx2)=>this.segmentUndoHandler(this,idx1,idx2)} handleSegDelete={(idx1,idx2)=>this.segmentDeleteHandler(this,idx1,idx2)}
                    handleNewSeg={(idx)=>this.addNewSegment(this,idx)} handleSave={(e)=>this.uploadDrawings(e,this)} handleLoad={(e)=>this.downloadDrawings(e,this)} handleDrawingDelete={(idx1)=>this.drawingDeleteHandler(this,idx1)}
                    handleNewDrawing={()=>this.addNewDrawing(this)} handleEdit={(idx,idx2,name,description)=>this.editInfo(idx,idx2,name,description,this)} >
                    </ToolBar>
                </div>
                
                <Map ref={e => { this.mapInstance = e }} viewport={this.state.viewport} onClick={(event)=>this.mapClickHandler(event,this)}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                    { this.state.drawIndex === null && this.state.drawIndex < this.state.drawings.length && this.state.drawings.length > 0 && this.state.drawings.map((drawing,idx)=>
                        drawing != null && drawing.segments.map((segment,idx2)=>
                            <Polyline key={`drawing${idx}-segment${idx2}`} positions={segment.points} color={segment.color} lineJoin={"round"}/>
                        )
                    )
                    }
                    { this.state.drawIndex !== null && this.state.drawings.length > 0 && this.state.drawings[this.state.drawIndex].segments.map((value2,idx2)=>
                        <Polyline key={`drawing${this.state.drawIndex}-segment${idx2}`} positions={value2.points} color={value2.color} lineJoin={"round"}/>
                    )
                    }
                </Map>
            </div>
        )
    }
}

export default MainPage;