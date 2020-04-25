import React from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from "@material-ui/core/Divider";
import ColorPicker from './ColorPicker';
import IconButton from '@material-ui/core/IconButton'
import UndoIcon from '@material-ui/icons/Undo';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import EditorDialogBox from "./EditorDialogBox";
import EditIcon from '@material-ui/icons/Edit';

const ToolBar = ({state,drawHandler,segHandler,handleEdit,handleColorClick,handleColorClose,handleColorChange,handleUndo,handleNewSeg,
                    handleSave, handleLoad, handleNewDrawing, handleSegDelete,handleDrawingDelete}) => {
    return (
        <List disablePadding dense>
            {
                state.drawings.map((drawing,idx)=>{
                    return(
                        <React.Fragment key={`drawing${idx}`}>
                            <ListItem button onClick={(event)=>drawHandler(idx)}>
                                <ListItemText primaryTypographyProps={idx === state.drawIndex ? {style:{fontWeight: 'bold'}}:{}}>{drawing.name}</ListItemText>
                                <EditorDialogBox state={state} idx={idx} idx2={null} updateState={(idx,idx2,name,description)=>handleEdit(idx,idx2,name,description)}></EditorDialogBox>
                                <IconButton onClick={()=>handleDrawingDelete(idx)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                            {(state.drawIndex === idx) ? 
                                <div className="segment-item">
                                    <p>{`Description: ${drawing.description}`}</p>
                                    <List disablePadding dense>
                                    {
                                        drawing.segments.map((segment,idx2) =>{
                                            return(
                                                <React.Fragment key={`drawing${idx}segment${idx2}`}>
                                                    <ListItem button onClick={(event)=>segHandler(idx2)}>
                                                        <ColorPicker color={segment.color} displayState={segment.displayColorPicker} 
                                                                     handleClick={()=>handleColorClick(idx,idx2)} 
                                                                     handleClose={()=>handleColorClose(idx,idx2)} 
                                                                     handleChange={(color)=>handleColorChange(idx,idx2,color)} />
                                                        <ListItemText primaryTypographyProps={idx2 === state.segmentIndex ? {style:{fontWeight: 'bold'}}:{}}>{segment.name}</ListItemText>
                                                        <IconButton onClick={()=>handleUndo(idx,idx2)}>
                                                            <UndoIcon/>
                                                        </IconButton>
                                                        <EditorDialogBox state={state} idx={idx} idx2={idx2} updateState={(idx,idx2,name,description)=>handleEdit(idx,idx2,name,description)}></EditorDialogBox>
                                                        <IconButton onClick={()=>handleSegDelete(idx,idx2)}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </ListItem>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                        <ListItem button onClick={()=>handleNewSeg(idx)}>
                                            <AddIcon/>
                                            <ListItemText>Add new line segment</ListItemText>
                                        </ListItem>
                                    </List>
                                </div>
                                :
                                <div key={`drawing${idx}-hide`}/>
                            }
                            <Divider key={`divider${idx}`} style={{ margin: "6px 0" }} />
                        </React.Fragment>
                    )
                })
            }
            <ListItem button onClick={()=>handleNewDrawing()}>
                <AddIcon/>
                <ListItemText>Add new drawing</ListItemText>
            </ListItem>
            <ListItem button onClick={(e)=>handleSave(e)}>
                <SaveIcon />
                <ListItemText>Save Drawings</ListItemText>
            </ListItem>
            <ListItem button onClick={(e)=>handleLoad(e)}>
                <SaveIcon />
                <ListItemText>Download Drawings</ListItemText>
            </ListItem>
        </List>
    )
}

export default ToolBar;