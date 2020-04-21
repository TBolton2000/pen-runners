import React, {Component,useState} from 'react';
import { Map, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import '../../../App.css';
import ToolBar from './ToolBar';

class MainPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            drawings:[
                {
                    name: "My First Drawing",
                    description: "My real First Drawing",
                    segments: [
                        {
                            name: "My first Line",
                            color: "purple",
                            points: [[30.6217,-96.3416],[30.6219,-96.3416],[30.6219,-96.3413]],
                            displayColorPicker: false,
                        },
                        {
                            name: "My second Line",
                            color: "blue",
                            points: [[30.6218,-96.3417],[30.6218,-96.3415],[30.6218,-96.3412]],
                            displayColorPicker: false,
                        }
                    ]
                },
                {
                    name: "My Second Drawing",
                    description: "My fake First Drawing",
                    segments: [
                        {
                            name: "My first line on draw 2",
                            color: "red",
                            points:[[30.6219,-96.3414],[30.6213,-96.3418],[30.6217,-96.3416]],
                            displayColorPicker: false,
                        }
                    ]
                }
            ],
            drawIndex: null,
            segmentIndex: 0,
        };
    }

    mapClickHandler(event,obj) {
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
        })
    }

    segmentUndoHandler(obj,idx1,idx2) {
        obj.setState((prevState)=>{
            const newState = Object.assign({},prevState);
            const newSegment = [...newState.drawings[idx1].segments[idx2].points];
            newSegment.pop();
            newState.drawings[idx1].segments[idx2].points = newSegment;
            return newState;
            // const {segments} = prevState.drawings[prevState.drawIndex]
            // segments[segmentIndex]
            // prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points = [...prevState.drawings[prevState.drawIndex].segments[prevState.segmentIndex].points, [event.latlng.lat,event.latlng.lng]];
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


    render() {
        return (
            <div className="side-by-side">
                <div className="toolbar">
                    <ToolBar state={this.state} drawHandler={(index)=>this.handleDrawingSelect(this,index)} segHandler={(index)=>this.handleSegmentSelect(this,index)}
                    handleColorClick={(idx1,idx2)=>this.handleColorClick(this,idx1,idx2)} handleColorClose={(idx1,idx2)=>this.handleColorClose(this,idx1,idx2)} 
                    handleColorChange={(idx1,idx2,color)=>this.handleColorChange(this,idx1,idx2,color)} handleUndo={(idx1,idx2)=>this.segmentUndoHandler(this,idx1,idx2)}
                    handleNewSeg={(idx)=>this.addNewSegment(this,idx)} >
                    </ToolBar>
                </div>
                <Map center={[30.6217,-96.3416]} zoom={20} onClick={(event)=>this.mapClickHandler(event,this)}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                    { this.state.drawings.map((value,idx)=>
                        value.segments.map((value2,idx2)=>
                            <Polyline key={`drawing${idx}-segment${idx2}`} positions={value2.points} color={value2.color} lineJoin={"round"}/>
                        )
                    )
                    }
                </Map>
            </div>
        )
    }
}

// const MainPage = ()=>{
//     const blankSegement = {name: "New Segment Name", points:[]};
//     const blankDrawing = {
//         name: "New Drawing Name", 
//         description: "New Description", 
//         UID:"",
//         segments: [blankSegement]
//     };
//     const [drawingsState, setDrawingsState] = useState(
//         [{...blankDrawing}],
//     );
//     const [drawingIndexState, setDrawingIndexState] = useState(null);
//     const [currDrawingState, setCurrDrawingState] = useState({
//         UID: "1021234",
//         segments: {}
//     });
//     const createNewDrawing = () => {
//         setDrawingsState([...drawingsState, {...blankDrawing}]);
//         console.log("Creating new Drawing");
//         console.log(drawingsState);
//     };
//     const createNewSegment = () => {
//         const updatedDrawings = {...drawingsState};
//         console.log(this.state);
//     };
//     return(
//         <div>
//             {drawingIndexState != null ? 
//             <div>
//                 <h1>{drawingsState[drawingIndexState].name}</h1>
//                 { 
//                     drawingsState[drawingIndexState].segments.map((val,idx) => {
//                         return (
//                             <div>
//                                 <h2>{val.name}</h2>
//                                 <p>{val.points}</p>
//                                 <button onClick={createNewSegment}></button>
//                                 <button onClick={()=>setDrawingIndexState(null)}>Back</button>
//                             </div>
//                         )
//                     })  
//                 }
//             </div>
//             :
//             <div>
//             { 
//                 drawingsState.map((val,idx) => {
//                     return (
//                         <div>
//                             <h1>{val.name}</h1>
//                             <p>{val.description}</p>
//                             <button onClick={()=>setDrawingIndexState(idx)}>Select</button>
//                             <button onClick={createNewDrawing}>Add New Drawing</button>
//                         </div>
//                     );
//                 })
//             }
//             </div>
//             }
//         </div>
//     )
// }

export default MainPage;