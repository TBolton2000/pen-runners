import React from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from "@material-ui/core/Divider";
import ColorPicker from './ColorPicker';
import IconButton from '@material-ui/core/IconButton'
import UndoIcon from '@material-ui/icons/Undo';
import AddIcon from '@material-ui/icons/Add';

const ToolBar = ({state,drawHandler,segHandler,handleColorClick,handleColorClose,handleColorChange,handleUndo,handleNewSeg}) => {
    return (
        <List disablePadding dense>
            {
                state.drawings.map((drawing,idx)=>{
                    return(
                        <React.Fragment key={`drawing${idx}`}>
                            <ListItem button onClick={(event)=>drawHandler(idx)}>
                                <ListItemText>{drawing.name}</ListItemText>
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
                                                        <ListItemText>{segment.name}</ListItemText>
                                                        <IconButton onClick={()=>handleUndo(idx,idx2)}>
                                                            <UndoIcon/>
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
            

        </List>
    )
}

export default ToolBar;