import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

export default function EditorDialogBox(props) {
    const [open, setOpen] = React.useState(false);
    const {idx, idx2, state, updateState} = props;
    const [name, setName] = React.useState(state.drawings[idx].name);
    const [desc, setDesc] = React.useState(state.drawings[idx].description)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateNameTextField = (event) => {
        setName(event.target.value);
    }

    const updateDescTextField = (event) => {
        setDesc(event.target.value);
    }

    const handleChange = () => {
        console.log(name,desc);
        updateState(idx,idx2,name,desc);
        handleClose();
    }

    return (
        <div>
        <IconButton color="primary" onClick={handleClickOpen}>
            <EditIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} submit={(e)=>console.log(e)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit {idx2 === null ? "Drawing Info" : "Segment Info"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    defaultValue={idx2 === null ? state.drawings[idx].name : state.drawings[idx].segments[idx2].name}
                    onChange={updateNameTextField}
                    fullWidth
                />
                
                <TextField
                    margin="dense"
                    id="desc"
                    label="Description"
                    type="text"
                    defaultValue={idx2 === null ? state.drawings[idx].description : state.drawings[idx].segments[idx2].color}
                    onChange={updateDescTextField}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleChange} color="primary">
                    Change
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}